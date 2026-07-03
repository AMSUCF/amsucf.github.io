# Aesthetic Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consistent, crop-proof hero animations on all six pages, mobile-reachable easter eggs, a shared UI layer ending per-page drift, and a hidden Throne Room celebration page unlocked by finding all 18 eggs.

**Architecture:** Interior heroes become centered fixed-aspect (8/5) "game window" frames so cover scaling is an exact fit (no cropping, eggs always reachable); index keeps its full-viewport hero. Shared `css/adventure-ui.css` + `js/adventure-ui.js` replace six drifted inline copies of the contact cluster, motion toggle, and click prompt. `js/adventure-score.js` gains pure completion/hit-test functions (tested) plus victory dialog + crown-link glue. New `throne.html` gates on completion.

**Tech Stack:** Static HTML/CSS, p5.js 1.7 (instance mode), vanilla JS, `node --test` for pure functions.

## Global Constraints

- EGA palette / Press Start 2P aesthetic everywhere; no new frameworks.
- All motion respects `body.motion-disabled` and `prefers-reduced-motion`.
- Egg manifest unchanged: 18 eggs, `maxScore() === 25`. `throne` is NOT added to `PAGES`.
- Font Awesome pinned to `6.7.2` on every page; fonts trimmed to Press Start 2P.
- Hit padding: 6 buffer px, applied at hit-test time only (rendering unchanged).
- Every page keeps working with JS disabled (static score text, plain content).

---

### Task 1: Pure functions — `isComplete`, `remainingEggs`, `hitTest`

**Files:**
- Modify: `js/adventure-score.js` (pure section, before `Object.freeze`)
- Test: `js/adventure-score.test.mjs`

**Interfaces:**
- Produces: `AdventureScore.isComplete(state) -> boolean`; `AdventureScore.remainingEggs(state) -> number`; `AdventureScore.hitTest(eggs, pt, pad) -> egg|null` where `eggs` is `[{id, rect:[x,y,w,h], message}]`, `pt` is `{x,y}` buffer coords, `pad` ≥ 0.

- [ ] **Step 1: Write failing tests** (append to existing test file, matching its style):

```js
test('isComplete is true only when every manifest egg is found', () => {
  const all = Object.values(AdventureScore.EGGS).flat();
  assert.equal(AdventureScore.isComplete({ score: 1, visited: [], eggs: [] }), false);
  assert.equal(AdventureScore.isComplete({ score: 24, visited: [], eggs: all.slice(1) }), false);
  assert.equal(AdventureScore.isComplete({ score: 25, visited: [], eggs: all }), true);
  assert.equal(AdventureScore.isComplete({ score: 25, visited: [], eggs: all.concat(['bogus']) }), true);
});

test('remainingEggs counts unfound manifest eggs, ignoring unknowns', () => {
  const all = Object.values(AdventureScore.EGGS).flat();
  assert.equal(AdventureScore.remainingEggs({ eggs: [] }), 18);
  assert.equal(AdventureScore.remainingEggs({ eggs: ['castle-flag', 'bogus'] }), 17);
  assert.equal(AdventureScore.remainingEggs({ eggs: all }), 0);
});

test('hitTest honors padding and returns first hit or null', () => {
  const eggs = [{ id: 'a', rect: [10, 10, 5, 5] }, { id: 'b', rect: [30, 10, 5, 5] }];
  assert.equal(AdventureScore.hitTest(eggs, { x: 12, y: 12 }, 0).id, 'a');
  assert.equal(AdventureScore.hitTest(eggs, { x: 8, y: 8 }, 0), null);
  assert.equal(AdventureScore.hitTest(eggs, { x: 8, y: 8 }, 6).id, 'a');
  assert.equal(AdventureScore.hitTest(eggs, { x: 100, y: 100 }, 6), null);
});
```

- [ ] **Step 2:** `node --test js/adventure-score.test.mjs` → new tests FAIL (functions undefined).
- [ ] **Step 3: Implement** in the pure section:

```js
function allEggIds() {
  var out = [];
  for (var k in EGGS) { if (EGGS.hasOwnProperty(k)) { out = out.concat(EGGS[k]); } }
  return out;
}
function remainingEggs(state) {
  var ids = allEggIds(), n = 0;
  for (var i = 0; i < ids.length; i++) {
    if (state.eggs.indexOf(ids[i]) === -1) { n++; }
  }
  return n;
}
function isComplete(state) { return remainingEggs(state) === 0; }
function hitTest(eggs, pt, pad) {
  pad = pad || 0;
  for (var i = 0; i < eggs.length; i++) {
    var r = eggs[i].rect;
    if (pt.x >= r[0] - pad && pt.x <= r[0] + r[2] + pad &&
        pt.y >= r[1] - pad && pt.y <= r[1] + r[3] + pad) { return eggs[i]; }
  }
  return null;
}
```

Export all three on `AdventureScore`.

- [ ] **Step 4:** `node --test js/adventure-score.test.mjs` → all PASS.
- [ ] **Step 5:** Commit `feat: add completion + padded hit-test pure functions`.

### Task 2: Completion UX in adventure-score.js browser glue

**Files:**
- Modify: `js/adventure-score.js` (`findEgg`, `renderScore`, styles in `ensureStyle`)

**Interfaces:**
- Consumes: Task 1's `isComplete`, `remainingEggs`.
- Produces: victory dialog after final egg; crown link (`a.status-bar-crown[href="throne.html"]`, aria-label "Enter the Throne Room") appended next to every `.status-bar-score` when complete.

- [ ] **Step 1:** In `findEgg`, after the successful-save block: if `isComplete(result.state)`, show a victory dialog instead of the plain egg dialog — same `.adv-egg-dialog` box containing the egg message plus a highlighted link `<a href="throne.html">☞ The Throne Room doors swing open… Enter</a>`; do not auto-dismiss this one on timeout.
- [ ] **Step 2:** In `renderScore`, after writing the text: if `isComplete(loadState())`, append the crown link `♛` (skip if already present); add `.status-bar-crown` styles to `ensureStyle` (yellow, blink-free, focus-visible outline).
- [ ] **Step 3:** `node --test` still passes; manual check deferred to Task 12.
- [ ] **Step 4:** Commit `feat: victory dialog and status-bar crown on completion`.

### Task 3: Create `css/adventure-ui.css` (canonical shared UI)

**Files:**
- Create: `css/adventure-ui.css`

**Interfaces:**
- Produces: canonical styles for `.chaos-contact-cluster/-item/-link/-icon/-text`, `.chaos-motion-toggle*`, `.click-prompt`, `.navbar.adventure-verb-bar .container{max-width:93%}`, `.game-frame` (fixed-aspect hero wrapper), `motion-disabled` blanket rules, reduced-motion query.

- [ ] **Step 1:** Extract the contact-cluster and motion-toggle inline CSS blocks from `research.html` (self-sufficient page — no chaos.css) into `css/adventure-ui.css` verbatim as the canonical base.
- [ ] **Step 2:** Normalize breakpoints in the extracted CSS: label hide `@media (min-width:768px) and (max-width:1199px)`; mobile `@media (max-width:767px)` includes `.chaos-contact-link{font-size:.4rem}` and the toggle equivalent. No `clusterFloat` animation anywhere.
- [ ] **Step 3:** Add the game-frame convention:

```css
.game-frame {
  width: min(100%, 800px);
  margin: 0 auto;
  border: 4px solid var(--ega-white, #FFFFFF);
  outline: 4px solid var(--ega-black, #000000);
  background: #000;
}
.game-frame .hero-canvas {
  aspect-ratio: 8 / 5;
  width: 100%;
  position: relative;
}
```

- [ ] **Step 4:** Port from `chaos.css` the load-bearing bits: `.navbar .container{max-width:93%!important}` (scoped to `.adventure-verb-bar`), and the `body.motion-disabled` blanket animation/transition/hover-transform kill rules; add `@media (prefers-reduced-motion: reduce)` equivalent.
- [ ] **Step 5:** Commit `feat: shared adventure-ui stylesheet`.

### Task 4: Create `js/adventure-ui.js` (shared behavior)

**Files:**
- Create: `js/adventure-ui.js`

**Interfaces:**
- Produces: self-initializing motion toggle (localStorage key `motion-preference`, binds `#motionToggle` on DOMContentLoaded, PAUSE/PLAY labels matching current inline behavior); document-level `>` click prompt (from index.html's inline version, skipping clicks inside links/buttons/nav); `window.AdventureUI.watchMotion(p5Instance)` — MutationObserver on `body` class toggling `noLoop()/loop()`.

- [ ] **Step 1:** Write the file by consolidating the current inline implementations (motion toggle from `index.html`, click prompt from `index.html`, observer block from any p5 page) into an IIFE exposing `window.AdventureUI = { watchMotion }`. Idempotent: guard against double-binding.
- [ ] **Step 2:** Commit `feat: shared adventure-ui behavior script`.

### Task 5: Pilot page conversion — about.html

**Files:**
- Modify: `about.html`

Checklist (this exact checklist repeats for Tasks 6–8):

- [ ] Head: normalize meta order (charset, viewport `width=device-width, initial-scale=1.0`, title pattern `<Page> - Anastasia Salter`), add `meta description` + `og:title/description/type/url/image`, add emoji favicon `<link rel="icon" href="data:image/svg+xml,...🏰...">`, upgrade Font Awesome to 6.7.2, remove `css/chaos.css` link (about/elit/index only), add `css/adventure-ui.css` link before the inline `<style>`, add `js/adventure-ui.js` before `</body>`.
- [ ] Hero: wrap status bar + canvas container in the shared frame markup

```html
<section class="game-frame">
  <div class="status-bar">…existing status bar…</div>
  <div class="hero-canvas"><div id="sceneCanvas" class="scene-canvas-container"></div></div>
</section>
```

  Replace `.hero{height:50vh;…}` sizing with the aspect-ratio-driven `.hero-canvas` (delete the 40vh mobile override); keep the p5 code sizing from the container element (unchanged API).
- [ ] Eggs: replace the manual rect loop in `p.mousePressed` with `AdventureScore.hitTest(getEggs(), ptInBuffer, 6)`.
- [ ] Cluster/toggle: delete the inline CSS blocks now living in `adventure-ui.css`; delete the inline motion-toggle and click-prompt `<script>` blocks; replace the MutationObserver block with `AdventureUI.watchMotion(p5Instance)`.
- [ ] Social markup: add `aria-label`s to all four cluster links, `rel="noopener noreferrer"` on CV, `fab fa-bluesky` icon; align `.quest-actions` icons/labels (Bluesky/Instagram/CV, same rel).
- [ ] Page-specific: remove the unused `:root` chaos-remap block; remove the 899px tablet breakpoint override.
- [ ] Verify in browser (desktop + 375px): scene fills frame with zero crop, all 3 eggs tappable, cluster/toggle identical to research.html.
- [ ] Commit `refactor: about.html on shared UI + fixed-aspect hero`.

### Task 6: research.html conversion

Same checklist as Task 5, except: no chaos.css link to remove; add the click prompt (comes free via `adventure-ui.js`); remove the now-shared inline `.navbar … max-width:93%` rule.
- [ ] Commit `refactor: research.html on shared UI + fixed-aspect hero`.

### Task 7: teaching.html conversion

Same checklist as Task 5, except: no chaos.css to remove; remove inline 93% rule; also delete the stray `body{font-size:0.5rem}` base rule (verify no visual dependency first — check headings/cards before+after).
- [ ] Commit `refactor: teaching.html on shared UI + fixed-aspect hero`.

### Task 8: elit.html conversion

Same checklist as Task 5, plus: rewrite head to standard order/format (charset `UTF-8` first, standard viewport, title after), remove `shrink-to-fit=no`; remove elit's bespoke inline click-prompt script (replaced by shared); keep `.well-canvas-container` id/class names.
- [ ] Commit `refactor: elit.html on shared UI + fixed-aspect hero`.

### Task 9: books.html — animation parity + mobile candles

**Files:**
- Modify: `books.html`

- [ ] Head/shared-files/social/meta: same checklist items as Task 5 (no chaos.css to remove; books has no p5 — do not add it).
- [ ] Frame: give `.game-screen` the shared frame conventions (`width:min(100%,800px); margin:0 auto;` + the same border treatment) so it matches the other interiors.
- [ ] Candle animation (CSS only, motion-gated):

```css
.shelf-candle::after {          /* flame */
  content: ''; position: absolute; top: -7px; left: 50%;
  width: 4px; height: 7px; margin-left: -2px;
  background: #FFFF55; box-shadow: 0 -2px 0 #FF5555;
  animation: candle-flicker 1.1s steps(3) infinite;
}
@keyframes candle-flicker {
  0%,100% { transform: scaleY(1); }
  40%     { transform: scaleY(1.35) translateX(1px); }
  70%     { transform: scaleY(.8)  translateX(-1px); }
}
body.motion-disabled .shelf-candle::after { animation: none; }
@media (prefers-reduced-motion: reduce) { .shelf-candle::after { animation: none; } }
```

  Plus 3–4 drifting dust-mote elements inside `.shelf-scene` with a slow CSS float animation, same gating.
- [ ] Mobile candles: in the ≤767px media block replace `display:none` with a scaled-down candle (`width:6px;height:18px`) and give both candles a ≥44px tap area: `position:relative;` + `.shelf-candle::before{content:'';position:absolute;inset:-14px;}`  (apply at all sizes).
- [ ] Verify at 375px: candles visible, flames animate, both candle eggs tappable, plaque egg tappable, spines still scroll to cards.
- [ ] Commit `feat: books shelf animation, mobile-reachable candle eggs`.

### Task 10: index.html — shared UI, chaos removal, trims

**Files:**
- Modify: `index.html`

- [ ] Screenshot index at 1440×900 and 375×667 BEFORE changes (chaos.css regression baseline).
- [ ] Head: remove chaos.css link; trim Google Fonts to Press Start 2P only; FA 6.7.2; add favicon; keep the existing full SEO block; add `adventure-ui.css` / `adventure-ui.js`.
- [ ] Delete inline cluster/toggle/click-prompt/observer duplicates (same as Task 5); switch `p.mousePressed` to `hitTest(…, 6)`; social markup fixes (aria-labels, bluesky icon, CV rel).
- [ ] Hero: UNCHANGED (full-viewport cover, bottom anchor). Verify all 3 eggs tappable at 375×667 and 1440×900.
- [ ] Screenshot AFTER; compare — nav width, cluster, headings must be visually identical (cluster float removal is the one intended difference).
- [ ] Commit `refactor: index.html on shared UI, drop chaos.css`.

### Task 11: throne.html — the reward page

**Files:**
- Create: `throne.html`

**Interfaces:**
- Consumes: `AdventureScore.isComplete/remainingEggs/loadState` pattern via public API (`AdventureScore` global), `AdventureUI.watchMotion`, shared CSS.

- [ ] Build the page with the standard head (title `The Throne Room - Anastasia Salter`, `meta robots noindex`, shared css/js, FA 6.7.2, p5).
- [ ] Same chrome as interiors: status bar (`Score: X of 25` / `The Throne Room`), game-frame hero, verb bar nav (no active item), contact cluster, motion toggle.
- [ ] One p5 sketch with two scenes selected at setup from completion state (read via a tiny helper using the same localStorage keys through `AdventureScore` exports — treat read errors as locked):
  - **Locked:** dark stone hall, two towering closed doors with glowing runes, torch flicker; Sierra dialog box: `The great doors are sealed by ancient magic. ${remaining} secret${s} remain hidden in the kingdom…` and a link "Return to the castle" (index.html).
  - **Celebration:** throne dais + monarch, red carpet, side banners, torches, 6–8 pixel courtiers; the traveler sprite walks the carpet (3s), kneels, sword-tap knighting, then continuous confetti + firework bursts; EGA banner text `CONGRATULATIONS — SCORE 25 OF 25`; dialog box: "Well done, brave scholar! You have uncovered every secret in the kingdom." First tap/click anywhere triggers a short WebAudio fanfare (reuse `blip()`-style oscillator pattern, motion-gated).
  - Both scenes use the standard buffer (320×200/240×150) + `drawCover(p,pg,'center')`; `windowResized` identical to interiors; all animation halts under `motion-disabled` (watchMotion) with a static final frame.
- [ ] Page registers NO visit point and is absent from `PAGES` (assert manually: score unchanged after loading).
- [ ] Verify: with partial eggs → locked scene; after setting all 18 eggs in localStorage → celebration; crown link appears on other pages.
- [ ] Commit `feat: throne room reward page (locked + celebration scenes)`.

### Task 12: Full verification pass + orphan deletion

**Files:**
- Delete: `css/chaos.css`, `js/chaos-effects.js`, `js/trapper-keeper.js`
- Modify: any page fixes found

- [ ] `node --test js/adventure-score.test.mjs` → PASS.
- [ ] `python -m http.server 8123` in repo root; in Chrome test all 7 pages at 1440×900 and 375×667 (device emulation): hero renders un-cropped (interiors) / correctly cropped (index), no console errors, cluster + toggle + nav pixel-identical across pages.
- [ ] Fresh-state egg run at 375px: clear the three localStorage keys, then tap every egg on every page (canvas coordinates = buffer rect center transformed through the exact-fit transform), confirming score climbs to 25 and the victory dialog appears on the 18th egg; follow its link to the celebration.
- [ ] Locked-state check: clear storage, open `throne.html` directly → sealed doors + correct remaining count.
- [ ] `grep -rn "chaos.css\|chaos-effects\|trapper-keeper" *.html` → no hits; then `git rm` the three orphans.
- [ ] Commit `chore: remove orphaned chaos-era files`.
