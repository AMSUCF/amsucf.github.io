# Easter Eggs & Persistent Score Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the six pages' hardcoded `Score: X of 100` numbers with one persistent localStorage score that starts at 1 and rises on first page visits and easter-egg clicks, add 3 hidden clickable eggs to every scene, and fix the mobile distortion on the p5 scenes with aspect-preserving "cover" scaling.

**Architecture:** A single shared script `js/adventure-score.js` owns the score, the visited-pages set, the found-eggs set (all in `localStorage`), the egg manifest (which drives the `of N` denominator), and reusable p5 helpers (`drawCover`, `screenToBuffer`) plus the click reactions (Sierra dialog + sparkle + score flash). Each page includes the script, removes its hardcoded score, calls `AdventureScore.registerPage(id)` on load, and (for p5 pages) swaps its blit line for `AdventureScore.drawCover` and adds a small `mousePressed` that hit-tests egg rectangles and calls `AdventureScore.findEgg(id, {...})`. `books.html` is a DOM/CSS scene, so its eggs are DOM elements with click listeners — no scaling change.

**Tech Stack:** Vanilla JavaScript (ES5-compatible to match existing inline sketches), p5.js 1.7.0 (already loaded via CDN), `localStorage`, Node.js built-in test runner (`node --test`) for the pure logic. No new runtime dependencies, no build step.

---

## File Structure

- **Create:** `js/adventure-score.js` — the entire shared system: manifest, pure score logic, storage wrappers, p5 cover/hit-test helpers, and click reactions (dialog/sparkle/flash). One file, one responsibility (the "adventure score game layer").
- **Create:** `js/adventure-score.test.mjs` — Node `--test` unit tests for the pure functions only (no DOM).
- **Modify:** `index.html` — castle scene (p5). Include script, remove hardcoded score, cover-scaling, pointer-events fix, eggs + `mousePressed`, `registerPage('index')`.
- **Modify:** `about.html` — gallery scene (p5). Same shape as index.
- **Modify:** `teaching.html` — classroom scene (p5). Same shape.
- **Modify:** `research.html` — scriptorium scene (p5). Same shape.
- **Modify:** `elit.html` — wishing-well scene (p5). Same shape.
- **Modify:** `books.html` — library scene (DOM). Include script, remove hardcoded score, `registerPage('books')`, DOM eggs with click listeners. No scaling change.

The egg **ids** are the contract between the manifest (Task 1) and the per-page geometry (Tasks 5-10). They must match exactly. The full id list:

```
index:    castle-flag, castle-window, castle-traveler
about:    gallery-armor, gallery-banner, gallery-portrait
teaching: classroom-blackboard, classroom-window, classroom-banner
research: scriptorium-quill, scriptorium-shelf, scriptorium-scrolls
elit:     well-bucket, well-roof, well-sparkles
books:    library-plaque, library-candle, library-candle-2
```

---

## Task 1: Shared module — manifest + pure score logic + tests

**Files:**
- Create: `js/adventure-score.js`
- Test: `js/adventure-score.test.mjs`

- [ ] **Step 1: Write the failing test**

Create `js/adventure-score.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const AS = require('./adventure-score.js');

test('manifest has 6 pages and 18 eggs', () => {
  assert.equal(AS.PAGES.length, 6);
  assert.equal(AS.totalEggCount(AS.EGGS), 18);
});

test('maxScore = 1 + pages + eggs = 25', () => {
  assert.equal(AS.maxScore(), 25);
});

test('applyVisit adds a point only the first time', () => {
  const s0 = { score: 1, visited: [], eggs: [] };
  const r1 = AS.applyVisit(s0, 'index');
  assert.equal(r1.changed, true);
  assert.equal(r1.state.score, 2);
  assert.deepEqual(r1.state.visited, ['index']);
  const r2 = AS.applyVisit(r1.state, 'index');
  assert.equal(r2.changed, false);
  assert.equal(r2.state.score, 2);
});

test('applyFindEgg awards once for a valid egg, ignores unknown', () => {
  const s0 = { score: 2, visited: ['index'], eggs: [] };
  const r1 = AS.applyFindEgg(s0, 'castle-flag');
  assert.equal(r1.changed, true);
  assert.equal(r1.state.score, 3);
  const r2 = AS.applyFindEgg(r1.state, 'castle-flag');
  assert.equal(r2.changed, false);
  assert.equal(r2.state.score, 3);
  const r3 = AS.applyFindEgg(r1.state, 'not-a-real-egg');
  assert.equal(r3.changed, false);
  assert.equal(r3.state.score, 3);
});

test('applyVisit/applyFindEgg do not mutate the input state', () => {
  const s0 = { score: 1, visited: [], eggs: [] };
  AS.applyVisit(s0, 'index');
  AS.applyFindEgg(s0, 'castle-flag');
  assert.deepEqual(s0, { score: 1, visited: [], eggs: [] });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test js/adventure-score.test.mjs`
Expected: FAIL — `Cannot find module './adventure-score.js'`.

- [ ] **Step 3: Write minimal implementation**

Create `js/adventure-score.js` with the manifest + pure core. (Browser glue is added in Tasks 2-4; this file grows across those tasks.)

```js
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

  var AdventureScore = {
    STARTING_SCORE: STARTING_SCORE,
    PAGES: PAGES,
    EGGS: EGGS,
    totalEggCount: totalEggCount,
    maxScore: maxScore,
    isKnownEgg: isKnownEgg,
    applyVisit: applyVisit,
    applyFindEgg: applyFindEgg
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdventureScore;
  }
  if (root) {
    root.AdventureScore = AdventureScore;
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null));
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test js/adventure-score.test.mjs`
Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
git add js/adventure-score.js js/adventure-score.test.mjs
git commit -m "feat: add adventure-score manifest and pure scoring core with tests"
```

---

## Task 2: Shared module — cover transform + screen→buffer mapping + tests

**Files:**
- Modify: `js/adventure-score.js`
- Test: `js/adventure-score.test.mjs`

- [ ] **Step 1: Write the failing test**

Append to `js/adventure-score.test.mjs`:

```js
test('computeCover scales to fill and anchors to the bottom', () => {
  // 320x200 buffer into a tall 400x800 portrait viewport.
  const t = AS.computeCover(400, 800, 320, 200);
  // cover => scale is the max of the two ratios: max(400/320, 800/200) = max(1.25, 4) = 4
  assert.equal(t.scale, 4);
  assert.equal(t.drawW, 1280);
  assert.equal(t.drawH, 800);
  assert.equal(t.offsetX, (400 - 1280) / 2); // -440, centered horizontally
  assert.equal(t.offsetY, 800 - 800);        // 0, pinned to bottom
});

test('screenToBufferXY inverts the cover transform', () => {
  const t = AS.computeCover(400, 800, 320, 200);
  // The bottom-center of the viewport maps to bottom-center of the buffer.
  const p = AS.screenToBufferXY(200, 800, t);
  assert.ok(Math.abs(p.x - 160) < 0.001); // buffer center x
  assert.ok(Math.abs(p.y - 200) < 0.001); // buffer bottom y
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test js/adventure-score.test.mjs`
Expected: FAIL — `AS.computeCover is not a function`.

- [ ] **Step 3: Write minimal implementation**

In `js/adventure-score.js`, add these two pure functions immediately **before** the `var AdventureScore = {` line:

```js
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
```

Then add both to the `AdventureScore` object literal (alongside the existing keys):

```js
    computeCover: computeCover,
    screenToBufferXY: screenToBufferXY,
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test js/adventure-score.test.mjs`
Expected: PASS — 7 tests passing.

- [ ] **Step 5: Commit**

```bash
git add js/adventure-score.js js/adventure-score.test.mjs
git commit -m "feat: add cover-scaling transform and screen-to-buffer mapping with tests"
```

---

## Task 3: Shared module — browser glue (storage, render, reactions, p5 helpers)

This adds the browser-only API. It references `window`/`document`/`localStorage`, but only inside functions that pages call at runtime — requiring the file in Node still only defines functions, so the Task 1-2 tests keep passing.

**Files:**
- Modify: `js/adventure-score.js`

- [ ] **Step 1: Add the browser glue**

In `js/adventure-score.js`, insert the following block immediately **before** the `if (typeof module !== 'undefined'` line (i.e., after the `AdventureScore` object is defined but before exports):

```js
  // ---- Browser-only glue (no-ops are never triggered under Node) ----

  var SCORE_KEY = 'adventure-score';
  var VISITED_KEY = 'adventure-visited';
  var EGGS_KEY = 'adventure-eggs';
  var STYLE_ID = 'adventure-score-style';

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
      var ctx = new Ctx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.18);
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
```

Then add these to the `AdventureScore` object literal (alongside the existing keys):

```js
    renderScore: renderScore,
    registerPage: registerPage,
    findEgg: findEgg,
    drawCover: drawCover,
    canvasToBuffer: canvasToBuffer,
```

- [ ] **Step 2: Re-run the unit tests to confirm the glue didn't break the pure core**

Run: `node --test js/adventure-score.test.mjs`
Expected: PASS — still 7 tests passing (the new code defines but never calls browser APIs under Node).

- [ ] **Step 3: Commit**

```bash
git add js/adventure-score.js
git commit -m "feat: add browser glue (storage, render, reactions, p5 helpers) to adventure-score"
```

---

## Task 4: Wire the castle landing page (index.html)

**Files:**
- Modify: `index.html` (CSS ~line 239 `pointer-events`, blit ~line 1045, script include ~line 683, status bar ~line 662)

- [ ] **Step 1: Include the shared script**

In `index.html`, find the Bootstrap JS include (around line 683):

```html
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

Add the shared script immediately after it:

```html
    <script src="js/adventure-score.js"></script>
```

- [ ] **Step 2: Remove the hardcoded score**

Find (around line 662):

```html
                            <span class="status-bar-score">Score: 42 of 100</span>
```

Replace with:

```html
                            <span class="status-bar-score">Score: 1 of 25</span>
```

(The text is overwritten live by `renderScore()`; this is just the no-JS fallback.)

- [ ] **Step 3: Fix pointer-events so egg clicks reach the canvas but buttons still work**

Find the canvas rule (around line 238-240):

```css
        .sunset-container canvas {
            pointer-events: none;
        }
```

Replace with:

```css
        .sunset-container canvas {
            pointer-events: auto;
        }
        .hero-overlay {
            pointer-events: none;
        }
        .hero-overlay a,
        .hero-overlay button,
        .hero-overlay .nav-link,
        .hero-overlay .btn-verb {
            pointer-events: auto;
        }
```

- [ ] **Step 4: Swap the blit line for cover scaling**

Find (around line 1045, inside `p.draw`):

```js
                // === Scale up to fill viewport ===
                p.background(0);
                p.image(pg, 0, 0, canvasW, canvasH);
```

Replace with:

```js
                // === Scale up to fill viewport (aspect-preserving cover) ===
                AdventureScore.drawCover(p, pg);
```

- [ ] **Step 5: Add the egg definitions, hit-testing, and page registration**

Find the end of the sketch where the p5 instance is created (around line 1067):

```js
        let p5Instance = new p5(adventureSketch);
```

Immediately **before** that line, still inside the `adventureSketch` function body is not possible (it's already closed at 1065). Instead, add the egg geometry + `mousePressed` **inside** the sketch by inserting this just **before** the `p.windowResized = function() {` line (around line 1048):

```js
            // === EASTER EGGS (buffer-space rectangles: [x, y, w, h]) ===
            function getEggs() {
                var castleBase = Math.floor(bufH * 0.38);
                var castleX = Math.floor(bufW * 0.35);
                var castleW = Math.floor(bufW * 0.30);
                var turretH = 20;
                return [
                    { id: 'castle-flag',
                      rect: [castleX + castleW / 2 - 2, castleBase - turretH - 24, 14, 12],
                      message: 'A crimson banner snaps over the keep. The Royal Castle of UCF welcomes you. +1 point.' },
                    { id: 'castle-window',
                      rect: [castleX + 4, castleBase + 4, 12, 12],
                      message: 'A candle still burns in the tower window. Someone is up late grading. +1 point.' },
                    { id: 'castle-traveler',
                      rect: [bufW / 2 - 5, bufH - 56, 12, 20],
                      message: 'The crowned traveler tips a hat to you. Your quest begins! +1 point.' }
                ];
            }

            p.mousePressed = function() {
                if (!pg || typeof AdventureScore === 'undefined') { return; }
                var b = AdventureScore.canvasToBuffer(p, pg, p.mouseX, p.mouseY);
                var eggs = getEggs();
                for (var i = 0; i < eggs.length; i++) {
                    var r = eggs[i].rect;
                    if (b.x >= r[0] && b.x <= r[0] + r[2] && b.y >= r[1] && b.y <= r[1] + r[3]) {
                        AdventureScore.findEgg(eggs[i].id,
                            { message: eggs[i].message, screenX: p.mouseX, screenY: p.mouseY });
                        break;
                    }
                }
            };

```

Then, immediately **after** `let p5Instance = new p5(adventureSketch);` (line ~1067), add:

```js
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof AdventureScore !== 'undefined') { AdventureScore.registerPage('index'); }
        });
```

- [ ] **Step 6: Manual verification in the browser**

Run: open `index.html` in a browser (e.g. `start index.html` on Windows, or use the project's preview). Then:
1. Clear storage first: in DevTools console run `localStorage.clear()` and reload.
2. Expected: status bar shows `Score: 2 of 25` (started at 1, +1 for first index visit), with a brief flash.
3. Click the flag on the tower, the lit window, and the little crowned figure on the path. Each shows a blue Sierra dialog, a sparkle burst, and increments the score (→ 3, 4, 5). Re-clicking a found egg sparkles but does not increment.
4. Click the READ/PLAY/TALK buttons and a nav link — they still navigate (pointer-events fix preserved).
5. Resize the window narrow/tall (portrait phone in device toolbar): the castle stays correctly proportioned (no vertical stretch), anchored to the bottom; eggs still register where drawn.
6. Reload the page: score stays at 5 (persisted), and no new points are awarded for the index visit.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: wire score + eggs + cover scaling into castle landing page"
```

---

## Task 5: Wire the gallery page (about.html)

**Files:**
- Modify: `about.html` (canvas `pointer-events` ~613, blit ~1265, `windowResized` ~1268, script include ~928, status bar ~764)

- [ ] **Step 1: Include the shared script**

After the Bootstrap JS include (around line 928), add:

```html
    <script src="js/adventure-score.js"></script>
```

- [ ] **Step 2: Remove the hardcoded score**

Find (around line 764):

```html
                <span class="status-bar-score">Score: 50 of 100</span>
```

Replace with:

```html
                <span class="status-bar-score">Score: 1 of 25</span>
```

- [ ] **Step 3: Ensure the scene canvas receives clicks**

Find the scene canvas pointer-events rule. The container is `#sceneCanvas` / `.scene-canvas-container`. Search the `<style>` block for `pointer-events: none;` rules that target the canvas or a transparent overlay sitting above it (around lines 198, 216, 613). For the rule that applies to the **scene canvas or its container**, change `pointer-events: none;` to `pointer-events: auto;`. If a separate text-overlay element sits above the canvas and intercepts clicks, add a rule making that overlay `pointer-events: none;` while re-enabling its links/buttons with `pointer-events: auto;` (mirror the index.html pattern). Verify in Step 7 that egg clicks register and existing links still work.

- [ ] **Step 4: Swap the blit line for cover scaling**

Find (around line 1264-1265):

```js
                    // === Scale up ===
                    p.background(0);
                    p.image(pg, 0, 0, canvasW, canvasH);
```

Replace with:

```js
                    // === Scale up (aspect-preserving cover) ===
                    AdventureScore.drawCover(p, pg);
```

- [ ] **Step 5: Add eggs, hit-testing, and page registration**

Inside the sketch function (`gallerySketch`), immediately before its `p.windowResized = function() {` line (around line 1268), insert:

```js
                // === EASTER EGGS (buffer-space rectangles: [x, y, w, h]) ===
                function getEggs() {
                    var floorY = Math.floor(bufH * 0.7);
                    var bannerW = 80;
                    var bannerX = Math.floor(bufW / 2 - bannerW / 2);
                    return [
                        { id: 'gallery-armor',
                          rect: [Math.floor(bufW / 2) - 14, floorY - 48, 30, 48],
                          message: 'The empty suit of armor creaks. Was that a wink behind the visor? +1 point.' },
                        { id: 'gallery-banner',
                          rect: [bannerX - 4, 2, bannerW + 8, 16],
                          message: 'The heraldic banner unfurls your name in gold thread. +1 point.' },
                        { id: 'gallery-portrait',
                          rect: [8, 18, 36, 48],
                          message: 'A painted ancestor’s eyes follow you across the gallery. +1 point.' }
                    ];
                }

                p.mousePressed = function() {
                    if (!pg || typeof AdventureScore === 'undefined') { return; }
                    var b = AdventureScore.canvasToBuffer(p, pg, p.mouseX, p.mouseY);
                    var eggs = getEggs();
                    for (var i = 0; i < eggs.length; i++) {
                        var r = eggs[i].rect;
                        if (b.x >= r[0] && b.x <= r[0] + r[2] && b.y >= r[1] && b.y <= r[1] + r[3]) {
                            AdventureScore.findEgg(eggs[i].id,
                                { message: eggs[i].message, screenX: p.mouseX, screenY: p.mouseY });
                            break;
                        }
                    }
                };

```

Then find where the p5 instance is created (around line 1283, `var p5GalleryInstance = new p5(gallerySketch);`) and add immediately after it:

```js
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof AdventureScore !== 'undefined') { AdventureScore.registerPage('about'); }
            });
```

- [ ] **Step 6: Manual verification**

Open `about.html` with `localStorage.clear()` first.
1. Status bar reads `Score: 2 of 25` (or higher if you visited index first in the same browser — the score is shared and persistent).
2. Click the suit of armor, the name banner at the top, and the first left-wall portrait. Each: dialog + sparkle + +1.
3. Existing portrait/links still work; narrow portrait view keeps proportions and bottom anchor.
4. Reload: score persists; no extra point for the about visit.

- [ ] **Step 7: Commit**

```bash
git add about.html
git commit -m "feat: wire score + eggs + cover scaling into gallery page"
```

---

## Task 6: Wire the classroom page (teaching.html)

**Files:**
- Modify: `teaching.html` (canvas `pointer-events` ~206, blit ~1026, `windowResized` ~1029, script include ~770, status bar ~573)

- [ ] **Step 1: Include the shared script**

After the Bootstrap JS include (around line 770), add:

```html
    <script src="js/adventure-score.js"></script>
```

- [ ] **Step 2: Remove the hardcoded score**

Find (around line 573):

```html
                <span class="status-bar-score">Score: 65 of 100</span>
```

Replace with:

```html
                <span class="status-bar-score">Score: 1 of 25</span>
```

- [ ] **Step 3: Ensure the scene canvas receives clicks**

In the `<style>` block, find the rule targeting the scene canvas / its container (search for `pointer-events: none;` near lines 206, 224). Change the canvas/container rule to `pointer-events: auto;`. If a text overlay sits above the canvas, make that overlay `pointer-events: none;` and re-enable its links/buttons with `pointer-events: auto;` (mirror index.html). Confirm in Step 7.

- [ ] **Step 4: Swap the blit line for cover scaling**

Find (around line 1025-1026):

```js
                    // Scale up
                    p.background(0);
                    p.image(pg, 0, 0, canvasW, canvasH);
```

Replace with:

```js
                    // Scale up (aspect-preserving cover)
                    AdventureScore.drawCover(p, pg);
```

- [ ] **Step 5: Add eggs, hit-testing, and page registration**

Inside `classroomSketch`, immediately before its `p.windowResized = function() {` line (around line 1029), insert:

```js
                // === EASTER EGGS (buffer-space rectangles: [x, y, w, h]) ===
                function getEggs() {
                    return [
                        { id: 'classroom-blackboard',
                          rect: [Math.floor(bufW * 0.45), 16, 100, 60],
                          message: 'The chalk diagram rearranges itself into a tiny smiley. Lesson learned. +1 point.' },
                        { id: 'classroom-window',
                          rect: [Math.floor(bufW * 0.15) - 2, 8, 44, 78],
                          message: 'Through the arched window, a dragon drifts past. Probably just a cloud. +1 point.' },
                        { id: 'classroom-banner',
                          rect: [Math.floor(bufW * 0.34), 10, 16, 56],
                          message: 'The house banner ripples with stubborn school pride. +1 point.' }
                    ];
                }

                p.mousePressed = function() {
                    if (!pg || typeof AdventureScore === 'undefined') { return; }
                    var b = AdventureScore.canvasToBuffer(p, pg, p.mouseX, p.mouseY);
                    var eggs = getEggs();
                    for (var i = 0; i < eggs.length; i++) {
                        var r = eggs[i].rect;
                        if (b.x >= r[0] && b.x <= r[0] + r[2] && b.y >= r[1] && b.y <= r[1] + r[3]) {
                            AdventureScore.findEgg(eggs[i].id,
                                { message: eggs[i].message, screenX: p.mouseX, screenY: p.mouseY });
                            break;
                        }
                    }
                };

```

Then find where the p5 instance is created (around line 1044, `var p5ClassroomInstance = new p5(classroomSketch);`) and add immediately after it:

```js
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof AdventureScore !== 'undefined') { AdventureScore.registerPage('teaching'); }
            });
```

- [ ] **Step 6: Manual verification**

Open `teaching.html` with `localStorage.clear()` first. Confirm: visit awards a point; clicking the blackboard, the arched window, and the wall banner each gives dialog + sparkle + +1; portrait view stays proportioned; reload persists.

- [ ] **Step 7: Commit**

```bash
git add teaching.html
git commit -m "feat: wire score + eggs + cover scaling into classroom page"
```

---

## Task 7: Wire the scriptorium page (research.html)

**Files:**
- Modify: `research.html` (canvas `pointer-events` ~188, blit ~1088, `windowResized` ~1091, script include ~799, status bar ~631)

- [ ] **Step 1: Include the shared script**

After the Bootstrap JS include (around line 799), add:

```html
    <script src="js/adventure-score.js"></script>
```

- [ ] **Step 2: Remove the hardcoded score**

Find (around line 631):

```html
            <span class="status-bar-score">Score: 72 of 100</span>
```

Replace with:

```html
            <span class="status-bar-score">Score: 1 of 25</span>
```

- [ ] **Step 3: Ensure the scene canvas receives clicks**

In the `<style>` block, find the scene canvas / container rule (search `pointer-events: none;` near lines 188, 206). Change the canvas/container rule to `pointer-events: auto;`; if a text overlay intercepts clicks, set it `pointer-events: none;` with links/buttons re-enabled. Confirm in Step 7.

- [ ] **Step 4: Swap the blit line for cover scaling**

Find (around line 1087-1088):

```js
                    // Scale up
                    p.background(0);
                    p.image(pg, 0, 0, canvasW, canvasH);
```

Replace with:

```js
                    // Scale up (aspect-preserving cover)
                    AdventureScore.drawCover(p, pg);
```

- [ ] **Step 5: Add eggs, hit-testing, and page registration**

Inside `scriptoriumSketch`, immediately before its `p.windowResized = function() {` line (around line 1091), insert:

```js
                // === EASTER EGGS (buffer-space rectangles: [x, y, w, h]) ===
                function getEggs() {
                    var floorY = Math.floor(bufH * 0.68);
                    var deskX = Math.floor(bufW / 2) - 40;
                    return [
                        { id: 'scriptorium-quill',
                          rect: [deskX + 58, floorY - 46, 16, 18],
                          message: 'The quill dips itself and scrawls a note in the margin. +1 point.' },
                        { id: 'scriptorium-shelf',
                          rect: [8, 10, 70, floorY - 10],
                          message: 'You tug a loose spine; the shelf swings open an inch, then shut. +1 point.' },
                        { id: 'scriptorium-scrolls',
                          rect: [bufW - 80, 10, 70, floorY - 10],
                          message: 'A scroll unrolls to reveal a map marked with a single red X. +1 point.' }
                    ];
                }

                p.mousePressed = function() {
                    if (!pg || typeof AdventureScore === 'undefined') { return; }
                    var b = AdventureScore.canvasToBuffer(p, pg, p.mouseX, p.mouseY);
                    var eggs = getEggs();
                    for (var i = 0; i < eggs.length; i++) {
                        var r = eggs[i].rect;
                        if (b.x >= r[0] && b.x <= r[0] + r[2] && b.y >= r[1] && b.y <= r[1] + r[3]) {
                            AdventureScore.findEgg(eggs[i].id,
                                { message: eggs[i].message, screenX: p.mouseX, screenY: p.mouseY });
                            break;
                        }
                    }
                };

```

Note: the quill hotspot sits over the center desk, between the two side shelves — the shelf and scroll-rack hotspots do not overlap it. Then find where the p5 instance is created (around line 1106, `var p5ScriptoriumInstance = new p5(scriptoriumSketch);`) and add immediately after it:

```js
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof AdventureScore !== 'undefined') { AdventureScore.registerPage('research'); }
            });
```

- [ ] **Step 6: Manual verification**

Open `research.html` with `localStorage.clear()` first. Confirm: visit awards a point; clicking the quill on the desk, the left bookshelf, and the right scroll rack each gives dialog + sparkle + +1; portrait view stays proportioned; reload persists.

- [ ] **Step 7: Commit**

```bash
git add research.html
git commit -m "feat: wire score + eggs + cover scaling into scriptorium page"
```

---

## Task 8: Wire the wishing-well page (elit.html)

**Files:**
- Modify: `elit.html` (canvas `pointer-events` ~184, blit ~1211, `windowResized` ~1214, script include ~864, status bar ~575)

- [ ] **Step 1: Include the shared script**

After the Bootstrap JS include (around line 864), add:

```html
    <script src="js/adventure-score.js"></script>
```

- [ ] **Step 2: Remove the hardcoded score**

Find (around line 575):

```html
          <span class="status-bar-score">Score: 77 of 100</span>
```

Replace with:

```html
          <span class="status-bar-score">Score: 1 of 25</span>
```

- [ ] **Step 3: Ensure the scene canvas receives clicks**

The container is `#wellCanvas` / `.well-canvas-container`. In the `<style>` block, find the rule targeting the well canvas / container (search `pointer-events: none;` near lines 184, 202). Change the canvas/container rule to `pointer-events: auto;`; if a text overlay intercepts clicks, set it `pointer-events: none;` with links/buttons re-enabled. Confirm in Step 7.

- [ ] **Step 4: Swap the blit line for cover scaling**

Find (around line 1210-1211):

```js
                // === Scale up to fill container ===
                p.background(0);
                p.image(pg, 0, 0, canvasW, canvasH);
```

Replace with:

```js
                // === Scale up to fill container (aspect-preserving cover) ===
                AdventureScore.drawCover(p, pg);
```

- [ ] **Step 5: Add eggs, hit-testing, and page registration**

Inside `wellSketch`, immediately before its `p.windowResized = function() {` line (around line 1214), insert:

```js
            // === EASTER EGGS (buffer-space rectangles: [x, y, w, h]) ===
            function getEggs() {
                var groundY = Math.floor(bufH * 0.5);
                return [
                    { id: 'well-bucket',
                      rect: [bufW / 2 - 6, groundY + 4, 12, 12],
                      message: 'You drop a coin into the well. Plink… make a wish. +1 point.' },
                    { id: 'well-roof',
                      rect: [bufW / 2 - 24, groundY - 37, 48, 16],
                      message: 'A startled bird flutters off the well’s little red roof. +1 point.' },
                    { id: 'well-sparkles',
                      rect: [bufW / 2 - 12, groundY - 30, 24, 30],
                      message: 'You catch a fistful of well-magic. It tingles all the way up your arm. +1 point.' }
                ];
            }

            p.mousePressed = function() {
                if (!pg || typeof AdventureScore === 'undefined') { return; }
                var b = AdventureScore.canvasToBuffer(p, pg, p.mouseX, p.mouseY);
                var eggs = getEggs();
                for (var i = 0; i < eggs.length; i++) {
                    var r = eggs[i].rect;
                    if (b.x >= r[0] && b.x <= r[0] + r[2] && b.y >= r[1] && b.y <= r[1] + r[3]) {
                        AdventureScore.findEgg(eggs[i].id,
                            { message: eggs[i].message, screenX: p.mouseX, screenY: p.mouseY });
                        break;
                    }
                }
            };

```

Note: the `well-sparkles` hotspot sits just above the well opening; `well-bucket` is at the opening and `well-roof` is higher up — the three stack vertically without overlap. Then find where the p5 instance is created (around line 1237, `var p5WellInstance = new p5(wellSketch);`) and add immediately after it:

```js
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof AdventureScore !== 'undefined') { AdventureScore.registerPage('elit'); }
            });
```

- [ ] **Step 6: Manual verification**

Open `elit.html` with `localStorage.clear()` first. Confirm: visit awards a point; clicking the bucket at the well mouth, the red roof, and the rising sparkles each gives dialog + sparkle + +1; portrait view stays proportioned; reload persists.

- [ ] **Step 7: Commit**

```bash
git add elit.html
git commit -m "feat: wire score + eggs + cover scaling into wishing-well page"
```

---

## Task 9: Wire the library page (books.html) — DOM eggs

`books.html` has no p5 canvas; the scene is HTML/CSS. Eggs are real DOM elements with click listeners. No cover-scaling is needed (CSS is already responsive).

**Files:**
- Modify: `books.html` (script include ~1015, status bar ~739, scene markup ~744-783)

- [ ] **Step 1: Include the shared script**

After the Bootstrap JS include (around line 1015), add:

```html
    <script src="js/adventure-score.js"></script>
```

- [ ] **Step 2: Remove the hardcoded score**

Find (around line 739):

```html
            <span class="status-bar-score">Score: 58 of 100</span>
```

Replace with:

```html
            <span class="status-bar-score">Score: 1 of 25</span>
```

- [ ] **Step 3: Tag the egg elements**

In the shelf scene markup, tag three existing elements as eggs with a `data-egg` id. Find the plaque (around line 745):

```html
            <div class="shelf-plaque"><h1>Books</h1></div>
```

Replace with:

```html
            <div class="shelf-plaque" data-egg="library-plaque"
                 data-egg-message="Behind the brass plaque, a tiny iron key glints. +1 point.">
                <h1>Books</h1></div>
```

Find the first candle (around line 748):

```html
                <div class="shelf-candle"></div>
```

Replace with:

```html
                <div class="shelf-candle" data-egg="library-candle"
                     data-egg-message="The candle gutters, then flares a sudden emerald green. +1 point."></div>
```

Find the second candle (around line 779 — the one just before `</div>` closing `.book-collection`):

```html
                <div class="shelf-candle"></div>
```

Replace with:

```html
                <div class="shelf-candle" data-egg="library-candle-2"
                     data-egg-message="This candle's flame spells a word, then melts away. +1 point."></div>
```

- [ ] **Step 4: Add the DOM egg click handler and page registration**

At the very end of `books.html`, immediately before `</body>`, add a script block:

```html
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof AdventureScore === 'undefined') { return; }
            AdventureScore.registerPage('books');
            var eggEls = document.querySelectorAll('[data-egg]');
            for (var i = 0; i < eggEls.length; i++) {
                eggEls[i].style.cursor = 'pointer';
                eggEls[i].addEventListener('click', function(e) {
                    var id = this.getAttribute('data-egg');
                    var msg = this.getAttribute('data-egg-message');
                    AdventureScore.findEgg(id, { message: msg, screenX: e.clientX, screenY: e.clientY });
                });
            }
        });
    </script>
```

- [ ] **Step 5: Manual verification**

Open `books.html` with `localStorage.clear()` first.
1. Status bar shows `Score: 2 of 25` for a fresh visit.
2. Click the "Books" plaque and each of the two candles flanking the shelf — each gives a Sierra dialog + sparkle + +1.
3. Clicking a book spine still triggers its existing behavior (the eggs are separate elements; confirm no regression).
4. Reload: score persists; no extra point for the books visit.

- [ ] **Step 6: Commit**

```bash
git add books.html
git commit -m "feat: wire score + DOM eggs into library page"
```

---

## Task 10: Cross-page integration verification

**Files:** none (verification only)

- [ ] **Step 1: Re-run the unit tests**

Run: `node --test js/adventure-score.test.mjs`
Expected: PASS — 7 tests.

- [ ] **Step 2: Full playthrough in a browser**

With a cleared store (`localStorage.clear()` in DevTools), starting from `index.html`:
1. Confirm the score reads `Score: 2 of 25` on first landing.
2. Visit all six pages once via the nav. The score should climb by exactly 1 per newly-visited page (ending at `Score: 7 of 25` with no eggs found yet).
3. Find all 18 eggs across the six scenes. Final score must read `Score: 25 of 25`.
4. Revisit pages and re-click found eggs: the score never exceeds 25, and never decreases.
5. Confirm the same number shows identically on every page (it is read from the shared store on load).

- [ ] **Step 3: Reduced-motion / motion-toggle check**

1. Toggle the on-page motion control to "PAUSE" (sets `motion-disabled`), or enable OS "reduce motion". Reload.
2. Clicking an egg still awards the point and shows the Sierra dialog (static), but no sparkle burst, no score-flash animation, and no audio blip.
3. Confirm navigation and buttons are unaffected.

- [ ] **Step 4: Mobile layout check**

In the browser device toolbar (e.g. iPhone portrait), load `index.html` and the other p5 pages. Confirm each scene fills the screen, is anchored to the bottom, and shows **no vertical stretching/skinniness**. Confirm eggs are still clickable at their drawn locations on the small viewport.

- [ ] **Step 5: Final commit (if any verification fixes were needed)**

If Steps 2-4 surfaced small fixes, commit them:

```bash
git add -A
git commit -m "fix: address cross-page verification findings for score/eggs"
```

---

## Self-Review Notes

- **Spec coverage:** localStorage score starting at 1 (Task 1 + Task 3 `loadState` default) ✓; +1 per first page visit (Task 3 `registerPage`, wired in Tasks 4-9) ✓; +1 per egg first click (Task 3 `findEgg`) ✓; `of N` total computed from manifest = 25 (Task 1 `maxScore`) ✓; hardcoded numbers removed on all six pages (Tasks 4-9) ✓; 3 eggs per scene, all six scenes (Tasks 4-9) ✓; visual reaction + Sierra dialog (Task 3 `sparkBurst`/`showEggDialog`) ✓; cover-scaling mobile fix on the five p5 scenes (Tasks 4-8) ✓; books DOM-eggs without scaling (Task 9, a deliberate correction to the spec's "all six scenes share the stretch") ✓; motion/reduced-motion respected (Task 3 `motionOff`, verified Task 10) ✓.
- **Egg id consistency:** the ids in the Task 1 manifest exactly match the per-page `getEggs()`/`data-egg` ids in Tasks 4-9 (cross-checked against the File Structure id list).
- **No placeholders:** every code step contains complete code; per-page Step 3 (pointer-events) is a guided inspection because each page's overlay markup differs, but it states the exact pattern and the verification that proves it correct.
