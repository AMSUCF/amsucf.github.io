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
    screenToBufferXY: screenToBufferXY
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdventureScore;
  }
  if (root) {
    root.AdventureScore = AdventureScore;
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
