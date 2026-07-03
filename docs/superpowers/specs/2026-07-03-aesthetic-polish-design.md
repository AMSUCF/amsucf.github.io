# Aesthetic Polish: Consistent Heroes, Mobile Eggs, Throne Room Reward — Design

**Date:** 2026-07-03
**Status:** Approved for implementation (autonomous session; user will review results)

## Summary

The Sierra-style portfolio (anastasiasalter.net) has six main pages. A detailed
audit found three families of problems:

1. **Hero animations are structurally inconsistent and crop unpredictably.**
   Five pages use p5.js cover-scaled scenes; `books.html` has no animation at
   all (a static CSS shelf). Cover-cropping means several easter eggs are
   **unreachable depending on screen shape**: top-of-scene eggs (gallery
   banner, blackboard, classroom banner) crop off on wide desktop windows, and
   the two library candle eggs are `display:none` on mobile — 25/25 is
   currently impossible on a phone.
2. **The persistent contact cluster ("inventory panel") renders differently
   per page.** The HTML is identical, but `css/chaos.css` is loaded on only
   3 of 6 pages (adding a float animation and different sizing there), the
   mobile shrink rule is missing on about/elit, and about's tablet breakpoint
   hides labels at 899px instead of 1199px. Motion-toggle, click-prompt, nav
   width, fonts, and head metadata have similar per-page drift.
3. **Nothing happens when all 18 eggs are found.** Max score (25) is silent.

This design fixes all three: a shared "game window" hero convention, a shared
UI stylesheet/script that ends the per-page drift, guaranteed-reachable
tap-friendly eggs, and a hidden **Throne Room** celebration page that unlocks
when all eggs are found.

## Goals

1. Every page's top animation renders correctly — no lost content — at every
   viewport size from 320px phones to wide desktops, and every easter egg is
   reachable and comfortably tappable on mobile.
2. `books.html` gains real ambient animation so all six pages feel alike.
3. A secret reward page (`throne.html`) plays a celebration animation when the
   visitor has found all 18 eggs; it is locked (with an in-fiction message)
   before that. Completion is discoverable: the final egg's dialog links to
   it, and the status bar gains a crown link on every page once complete.
4. The contact cluster, motion toggle, nav bar, and click-prompt look and
   behave identically on every page; shared CSS/JS replaces six drifted
   inline copies.
5. Cleanups: orphaned files removed, one Font Awesome version with a real
   Bluesky icon, unused fonts/vars dropped, head metadata normalized, favicon.

## Non-Goals

- No redesign of the scenes' art beyond what reachability requires.
- No new easter eggs (denominator stays 25); no backend/sync.
- No changes to subsites (SpinningYarns, ReimaginingTheHumanities, etc.).
- `throne.html` awards no points and is not in the PAGES manifest (otherwise
  completion would be circular).

## Design

### 1. Hero convention: "game window" interiors, immersive index

- **index.html (unchanged concept, verified):** keeps the full-viewport
  cover-scaled, bottom-anchored castle hero (deliberate per recent commits).
  Egg positions were verified to sit in the safe zone for portrait phones and
  16:9 desktops. Known limit: on >1.9:1 ultrawide fullscreen the flag egg
  crops; documented, not fixed (rare, and the other two index eggs remain).
- **about / research / teaching / elit:** the hero becomes a **centered,
  fixed-aspect (1.6:1) framed game screen** — like the Sierra 320×200 window —
  instead of a full-bleed 50vh strip. `width: min(100%, 800px)`,
  `aspect-ratio: 8/5`, EGA border matching books' existing `.game-screen`,
  status bar on top. Because canvas aspect now equals buffer aspect, cover
  scaling becomes an exact fit: **nothing ever crops, all eggs are always
  visible**, and hit-testing continues to use the same `drawCover`/
  `canvasToBuffer` code paths (zero math changes).
- **books.html:** keep the DOM shelf (it is functional navigation — spines
  scroll to book cards — and its titles must stay readable), but bring it to
  parity: same centered frame conventions and max-width, **CSS candle-flame
  flicker animation** (plus subtle dust-mote drift), candles **visible on
  mobile** (smaller, not `display:none`), all gated by `motion-disabled` /
  `prefers-reduced-motion`.
- Sketch wiring is standardized on all p5 pages: sketch defined and
  instantiated inside a single `DOMContentLoaded`, canvas sized from the hero
  element, single `windowResized` pattern, shared motion-pause helper.

### 2. Easter eggs: reachable and tap-friendly everywhere

- Interior-egg reachability is solved structurally by the fixed-aspect frame.
- **Hit-target padding:** `AdventureScore` gains `hitTest(eggs, pt, pad)`
  (pure, tested). All five canvas pages use it with `pad = 6` buffer px, so
  the smallest targets (classroom banner 16px, gallery banner 16px tall,
  well bucket 12px) reach ≥ 40 screen px on a 375px phone. Padding must not
  make adjacent eggs overlap (verified per scene).
- **books.html candles:** visible at all sizes; tap area enlarged to ≥ 44px
  via padding/pseudo-element while the drawn candle stays small.
- Touch: p5's touch→mouse fallback and DOM `click` already fire on tap; no
  `touchstart` handlers are added (adding them would break scrolling over the
  hero). Verified by device-width browser testing.

### 3. The Throne Room (`throne.html`)

- **Locked state** (any eggs missing): dark hall, massive sealed EGA doors,
  Sierra dialog: "The great doors are sealed by ancient magic. N secrets
  remain hidden in the kingdom…" with a link back to the castle. No score
  changes.
- **Unlocked state** (all 18 eggs in localStorage): a celebration scene in the
  same p5 EGA style — throne room with banners and torches, the traveler
  character walks the red carpet and is knighted by the monarch, confetti
  and fireworks loop, "CONGRATULATIONS — SCORE 25 OF 25" banner, optional
  chiptune fanfare on first tap (WebAudio, motion-gated). Full game-window
  frame like the interiors; verb bar, contact cluster, motion toggle present
  and consistent.
- **Discovery paths** (both implemented in `adventure-score.js`, so they work
  on every page automatically):
  - `findEgg` detects completion after a successful find and shows a special
    victory dialog with an "Enter the Throne Room" link instead of the normal
    egg dialog.
  - `renderScore` appends a small crown link (♛ → `throne.html`,
    aria-labelled) to the status-bar score whenever state is complete, giving
    persistent access on all pages.
- **New pure functions + tests:** `isComplete(state)`, `remainingEggs(state)`,
  `hitTest` — covered in `js/adventure-score.test.mjs`.

### 4. Shared UI: `css/adventure-ui.css` + `js/adventure-ui.js`

New canonical files linked on all seven pages (six + throne):

- **CSS:** contact cluster (one set of styles + breakpoints: label-hide at
  768–1199px, 0.4rem shrink ≤767px — the current majority behavior; **no**
  float animation, ending the 3-page wiggle inconsistency), motion toggle,
  verb-bar container width (93%), click-prompt, game-window frame,
  `motion-disabled` blanket rules, reduced-motion media query.
- **JS:** motion-toggle wiring (single `motion-preference` key), the `>`
  click-prompt (currently on only 3 pages), and a
  `watchMotion(p5Instance)` helper replacing five copies of the
  MutationObserver block.
- Pages delete their inline duplicates of these blocks. Page-specific scene
  CSS stays inline.
- **`css/chaos.css` is unlinked and deleted**, along with orphaned
  `js/chaos-effects.js` and empty `js/trapper-keeper.js`. Anything
  load-bearing (container width, motion-disabled rules) is ported into
  `adventure-ui.css` first; before/after screenshots on the three pages that
  loaded it confirm no visual regressions.

### 5. Consistency cleanups

- **Social links:** Font Awesome upgraded 6.0.0 → 6.7.2 everywhere; Bluesky
  gets the real `fa-brands fa-bluesky` icon (replacing the generic cloud);
  every cluster link gets an `aria-label`; CV links get
  `rel="noopener noreferrer"`; about's `.quest-actions` buttons keep their
  place but align icon size/labels with the cluster.
- **Head normalization:** identical charset/viewport/meta order (fixing
  elit's outlier head), interior pages get `meta description` + basic
  Open Graph tags, a shared pixel-castle emoji favicon on all pages, index's
  font link trimmed to Press Start 2P only (the other four families are
  unused post-chaos).
- **Nav:** identical container width via shared CSS; interior pages keep
  their existing active states (index, as the home page, has no nav item for
  itself — the brand link is its marker, unchanged).
- Unused `:root` chaos-remap variable blocks removed from all pages (after a
  grep confirms nothing references them).

## Error handling

- All localStorage access already goes through try/catch helpers; the throne
  gate treats unreadable state as locked.
- If JS fails, pages still show the static `Score: 1 of 25` bar and plain
  content; throne shows the locked scene (safe default).

## Testing & verification

1. `node --test js/adventure-score.test.mjs` — existing + new pure-function
   tests (completion, hit padding, cover math unchanged).
2. Local server + Chrome: each of the seven pages screenshotted at 375×667
   and 1440×900; every egg tapped once at 375px (canvas coordinates computed
   from the exact-fit transform) confirming score increments to 25; throne
   locked state, victory dialog, crown link, and unlocked celebration all
   exercised by manipulating localStorage.
3. Before/after screenshots for index/about/elit to confirm chaos.css removal
   changes nothing visible.
