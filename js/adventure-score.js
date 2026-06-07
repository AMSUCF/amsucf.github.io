/* adventure-score.js — shared score + easter-egg layer for the Sierra-style site.
   Pure functions are exported for Node tests; browser glue attaches to window. */
(function (root) {
  'use strict';

  var STARTING_SCORE = 1;

  var PAGES = ['index', 'about', 'books', 'teaching', 'research', 'elit'];

  // Egg ids per page. This object alone determines the `of N` denominator.
  var EGGS = {
    index:    ['castle-flag', 'castle-window', 'castle-traveler'],
    about:    ['gallery-armor', 'gallery-banner', 'gallery-portrait'],
    books:    ['library-plaque', 'library-candle', 'library-candle-2'],
    teaching: ['classroom-blackboard', 'classroom-window', 'classroom-banner'],
    research: ['scriptorium-quill', 'scriptorium-shelf', 'scriptorium-scrolls'],
    elit:     ['well-bucket', 'well-roof', 'well-sparkles']
  };

  function totalEggCount(eggs) {
    var n = 0;
    for (var k in eggs) { if (eggs.hasOwnProperty(k)) { n += eggs[k].length; } }
    return n;
  }

  function maxScore() {
    return STARTING_SCORE + PAGES.length + totalEggCount(EGGS);
  }

  function isKnownEgg(eggId) {
    for (var k in EGGS) {
      if (EGGS.hasOwnProperty(k) && EGGS[k].indexOf(eggId) !== -1) { return true; }
    }
    return false;
  }

  // Pure state transition: visiting a page. Returns {state, changed}; never mutates input.
  function applyVisit(state, pageId) {
    if (state.visited.indexOf(pageId) !== -1) {
      return { state: state, changed: false };
    }
    return {
      state: {
        score: state.score + 1,
        visited: state.visited.concat(pageId),
        eggs: state.eggs.slice()
      },
      changed: true
    };
  }

  // Pure state transition: finding an egg. Unknown or already-found eggs award nothing.
  function applyFindEgg(state, eggId) {
    if (!isKnownEgg(eggId) || state.eggs.indexOf(eggId) !== -1) {
      return { state: state, changed: false };
    }
    return {
      state: {
        score: state.score + 1,
        visited: state.visited.slice(),
        eggs: state.eggs.concat(eggId)
      },
      changed: true
    };
  }

  // Aspect-preserving "cover" fit, anchored to the bottom of the viewport.
  // Returns the transform used by both rendering and hit-testing.
  function computeCover(canvasW, canvasH, bufW, bufH) {
    var scale = Math.max(canvasW / bufW, canvasH / bufH);
    var drawW = bufW * scale;
    var drawH = bufH * scale;
    return {
      scale: scale,
      drawW: drawW,
      drawH: drawH,
      offsetX: (canvasW - drawW) / 2, // center horizontally
      offsetY: canvasH - drawH        // pin to bottom (ground stays visible)
    };
  }

  // Convert a screen/canvas point to buffer coordinates using a cover transform.
  function screenToBufferXY(sx, sy, t) {
    return { x: (sx - t.offsetX) / t.scale, y: (sy - t.offsetY) / t.scale };
  }

  // The manifest is the single source of truth for scoring; make it read-only
  // so neither the browser glue nor page code can corrupt it at runtime.
  Object.freeze(PAGES);
  for (var _p in EGGS) { if (EGGS.hasOwnProperty(_p)) { Object.freeze(EGGS[_p]); } }
  Object.freeze(EGGS);

  var AdventureScore = {
    STARTING_SCORE: STARTING_SCORE,
    PAGES: PAGES,
    EGGS: EGGS,
    totalEggCount: totalEggCount,
    maxScore: maxScore,
    isKnownEgg: isKnownEgg,
    applyVisit: applyVisit,
    applyFindEgg: applyFindEgg,
    computeCover: computeCover,
    screenToBufferXY: screenToBufferXY,
    renderScore: renderScore,
    registerPage: registerPage,
    findEgg: findEgg,
    drawCover: drawCover,
    canvasToBuffer: canvasToBuffer
  };

  // ---- Browser-only glue (no-ops are never triggered under Node) ----

  var SCORE_KEY = 'adventure-score';
  var VISITED_KEY = 'adventure-visited';
  var EGGS_KEY = 'adventure-eggs';
  var STYLE_ID = 'adventure-score-style';
  var audioCtx = null;

  function hasDOM() {
    return typeof document !== 'undefined' && typeof localStorage !== 'undefined';
  }

  function readList(key) {
    try {
      var raw = localStorage.getItem(key);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function loadState() {
    var rawScore = parseInt(localStorage.getItem(SCORE_KEY), 10);
    var score = isNaN(rawScore) ? STARTING_SCORE : rawScore;
    return { score: score, visited: readList(VISITED_KEY), eggs: readList(EGGS_KEY) };
  }

  function saveState(state) {
    localStorage.setItem(SCORE_KEY, String(state.score));
    localStorage.setItem(VISITED_KEY, JSON.stringify(state.visited));
    localStorage.setItem(EGGS_KEY, JSON.stringify(state.eggs));
  }

  function motionOff() {
    if (typeof document !== 'undefined' &&
        document.body && document.body.classList.contains('motion-disabled')) {
      return true;
    }
    return typeof window !== 'undefined' && window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function ensureStyle() {
    if (!hasDOM()) { return; }
    if (document.getElementById(STYLE_ID)) { return; }
    var css =
      '.status-bar-score.score-flash{animation:adv-score-flash .5s ease-out;}' +
      '@keyframes adv-score-flash{0%{color:#FFFFFF;transform:scale(1.4);}' +
      '100%{color:#FFFF55;transform:scale(1);}}' +
      '.adv-egg-dialog{position:fixed;left:50%;top:18%;transform:translateX(-50%);' +
      'z-index:10000;max-width:420px;width:86%;background:#0000AA;border:4px solid #FFFFFF;' +
      'outline:4px solid #0000AA;box-shadow:8px 8px 0 rgba(0,0,0,.5);padding:18px 20px;' +
      "font-family:'Press Start 2P',cursive;font-size:.6rem;line-height:1.9;color:#FFFFFF;" +
      'text-align:center;}' +
      '.adv-egg-dialog .adv-egg-dismiss{display:block;margin-top:14px;color:#FFFF55;font-size:.5rem;}' +
      '.adv-spark{position:fixed;width:6px;height:6px;background:#FFFF55;z-index:10001;' +
      'pointer-events:none;image-rendering:pixelated;}';
    var el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }

  function renderScore() {
    if (!hasDOM()) { return; }
    var state = loadState();
    var text = 'Score: ' + state.score + ' of ' + maxScore();
    var nodes = document.querySelectorAll('.status-bar-score');
    for (var i = 0; i < nodes.length; i++) { nodes[i].textContent = text; }
  }

  function flashScore() {
    if (motionOff()) { return; }
    var nodes = document.querySelectorAll('.status-bar-score');
    for (var i = 0; i < nodes.length; i++) {
      (function (node) {
        node.classList.remove('score-flash');
        void node.offsetWidth; // reflow so the animation restarts
        node.classList.add('score-flash');
      })(nodes[i]);
    }
  }

  function blip() {
    if (motionOff()) { return; }
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) { return; }
      if (!audioCtx) { audioCtx = new Ctx(); }
      if (audioCtx.state === 'suspended' && audioCtx.resume) { audioCtx.resume(); }
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(660, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.18);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.18);
    } catch (e) { /* audio not available; ignore */ }
  }

  function sparkBurst(x, y) {
    if (motionOff() || typeof x !== 'number' || typeof y !== 'number') { return; }
    var colors = ['#FFFF55', '#55FFFF', '#FF55FF', '#FFFFFF'];
    for (var i = 0; i < 8; i++) {
      (function (i) {
        var s = document.createElement('div');
        s.className = 'adv-spark';
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        s.style.background = colors[i % colors.length];
        document.body.appendChild(s);
        var ang = (Math.PI * 2 * i) / 8;
        var dist = 26;
        s.animate(
          [
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: 'translate(' + Math.cos(ang) * dist + 'px,' +
                Math.sin(ang) * dist + 'px) scale(0)', opacity: 0 }
          ],
          { duration: 500, easing: 'ease-out' }
        );
        setTimeout(function () { s.remove(); }, 520);
      })(i);
    }
  }

  function showEggDialog(message) {
    if (!hasDOM()) { return; }
    ensureStyle();
    var existing = document.querySelector('.adv-egg-dialog');
    if (existing) { existing.remove(); }
    var box = document.createElement('div');
    box.className = 'adv-egg-dialog';
    box.setAttribute('role', 'status');
    var msg = document.createElement('div');
    msg.textContent = message;
    var dismiss = document.createElement('div');
    dismiss.className = 'adv-egg-dismiss';
    dismiss.textContent = '[ click to close ]';
    box.appendChild(msg);
    box.appendChild(dismiss);
    document.body.appendChild(box);
    var close = function () { if (box.parentNode) { box.remove(); } };
    box.addEventListener('click', close);
    setTimeout(close, 4000);
  }

  // Public: mark the current page visited (awards a point the first time).
  function registerPage(pageId) {
    if (!hasDOM()) { return; }
    ensureStyle();
    var result = applyVisit(loadState(), pageId);
    if (result.changed) {
      saveState(result.state);
      flashScore();
    }
    renderScore();
  }

  // Public: attempt to claim an egg. Always plays the sparkle; awards a point +
  // dialog only on first find. opts = { message, screenX, screenY }.
  function findEgg(eggId, opts) {
    if (!hasDOM()) { return false; }
    opts = opts || {};
    ensureStyle();
    sparkBurst(opts.screenX, opts.screenY);
    var result = applyFindEgg(loadState(), eggId);
    if (result.changed) {
      saveState(result.state);
      renderScore();
      flashScore();
      blip();
      showEggDialog(opts.message || 'You found a secret! +1 point.');
      return true;
    }
    return false;
  }

  // Public p5 helper: draw the offscreen buffer with cover scaling. Returns the transform.
  function drawCover(p, pg) {
    var t = computeCover(p.width, p.height, pg.width, pg.height);
    p.background(0);
    p.image(pg, t.offsetX, t.offsetY, t.drawW, t.drawH);
    return t;
  }

  // Public p5 helper: map a canvas point to buffer coordinates for the current frame.
  function canvasToBuffer(p, pg, sx, sy) {
    var t = computeCover(p.width, p.height, pg.width, pg.height);
    return screenToBufferXY(sx, sy, t);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdventureScore;
  }
  if (root) {
    root.AdventureScore = AdventureScore;
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
