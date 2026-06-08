# Easter Eggs & Persistent Score — Design

**Date:** 2026-06-07
**Status:** Approved (design); ready for implementation planning

## Summary

The site (anastasiasalter.net) is a Sierra-style adventure-game–themed academic
portfolio. Six main pages each render a p5.js EGA pixel scene with a status bar
reading `Score: X of 100`, where X is currently a different hardcoded number per
page.

This project replaces those static numbers with **one shared, persistent score**
stored in `localStorage`, adds **hidden clickable easter eggs** to every scene,
and **fixes the landing-page (castle) animation on mobile**, where the scene is
currently stretched and distorted ("too skinny").

## Goals

1. A single score persisted in `localStorage`, starting at **1**, shown
   identically on every page as `Score: X of N`.
2. The score increases by **+1** the first time a visitor sees each page, and by
   **+1** the first time they click each easter egg. Points never double-count.
3. **2-3 hidden easter eggs in every one of the six scenes** (~12-18 total). Each
   gives, on first click: a visual reaction in-world **and** a Sierra-style
   dialog message, plus the score point.
4. The castle landing scene renders **without distortion on mobile** (portrait
   phones), using aspect-preserving "cover" scaling anchored to the ground.

## Non-Goals

- No backend / no cross-device sync. Progress is per-browser via `localStorage`.
- No redesign of the scenes' art beyond adding egg elements and fixing scaling.
- No change to the per-page location names or navigation.
- No leaderboard, achievements page, or social sharing (possible future work).

## Current State

Six pages, each with its own p5 sketch and hardcoded status bar:

| Page          | Scene / sketch        | Location label        | Old score |
|---------------|-----------------------|-----------------------|-----------|
| index.html    | castle/sunset         | Royal Castle of UCF   | 42        |
| about.html    | gallery (`sceneCanvas`)| The Portrait Gallery | 50        |
| books.html    | library               | The Royal Library     | 58        |
| teaching.html | classroom             | The Classroom         | 65        |
| research.html | scriptorium           | The Scriptorium       | 72        |
| elit.html     | wishing well          | The Wishing Well      | 77        |

Each sketch draws to a fixed offscreen buffer (320×200 desktop, 240×150 mobile)
and blits it with `p.image(pg, 0, 0, canvasW, canvasH)` — a non-aspect-preserving
stretch that distorts the scene on portrait viewports. On `index.html` the hero
canvas has `pointer-events: none`, so it currently ignores clicks.

## Architecture

**Chosen approach: shared JS module + p5 hit-testing.**

A new file `js/adventure-score.js` is the single source of truth, included on all
six pages. Each page's existing p5 sketch defines its egg positions (in buffer
coordinates) and calls into the module when an egg is clicked. Hit detection lives
inside p5 so it stays correct under the new scaling.

Rejected alternatives:

- **DOM hotspot overlays** — invisible positioned `<div>`s over eggs. Simpler
  click handling but positions break when the scene is cropped/scaled per device.
- **All-inline per page** — duplicates score logic into each HTML file; six copies
  to keep in sync and an easy way for the `of N` total to drift.

### `js/adventure-score.js` responsibilities

- **localStorage keys:**
  - `adventure-score` — number, default `1`.
  - `adventure-visited` — JSON array of page ids already counted.
  - `adventure-eggs` — JSON array of egg ids already found.
- **Egg manifest:** a central object mapping each page id to its list of egg ids.
  The displayed denominator `N` is computed from it: `N = 1 + (page count) +
  (total egg count)`. This keeps `of N` always correct as eggs are added.
- **On load (`registerPage(pageId)`):** if `pageId` not in `adventure-visited`,
  add it and increment score by 1. Then render the score into every
  `.status-bar-score` element as `Score: X of N`.
- **`findEgg(eggId)`:** if `eggId` not in `adventure-eggs`, add it, increment
  score by 1, re-render, trigger the score-change feedback, and return `true`
  (newly found). If already found, return `false`. Callers play the visual
  reaction regardless; the dialog/point only fire on a `true` return.
- **Feedback:** brief flash/pulse on the status-bar score; optional 8-bit blip,
  gated by the motion toggle and `prefers-reduced-motion`.
- Reuses the existing `motion-disabled` body class / motion-toggle convention.

## Scoring Model

- Starting stored value: **1**.
- **First visit to each of the 6 pages: +1** — including the index landing, so a
  fresh visitor's score reads **2** after first arriving on the castle page.
- **Each easter egg, first click only: +1.**
- Denominator `N = 1 + 6 + (total eggs)` (≈ 19-25 depending on final egg count),
  derived from the manifest.
- All six hardcoded status-bar numbers are removed and replaced by the live
  shared score. Location labels are unchanged.
- Found eggs and visited pages persist; points never double-count; returning
  visitors keep progress.

## Easter Eggs

- **2-3 per scene, in all six scenes.** Each egg is a small in-world clickable
  region drawn as part of the existing pixel art (e.g., castle: the flag, a lit
  window, a fish in the moat; well: a coin, a frog). Exact set is chosen per scene
  during implementation and recorded in the manifest.
- **Fully hidden** — no idle hint markers. Discovery is the reward.
- **On first click:** `findEgg(id)` → +1; a **visual reaction** at the spot
  (sparkle burst and/or the element animates); **and** a **Sierra-style dialog**
  in the existing `.dialog-box` EGA style with flavor text
  (e.g., *"You found the royal cat! +1 point."*).
- **Already-found eggs** still play the visual reaction on click but award no
  point and show no point dialog.

### Hit detection

- Each sketch gets `mousePressed` / `touchStarted` handlers.
- Screen coordinates are converted to buffer coordinates using the **same
  scale/offset** as the render step (see Mobile fix), then tested against each
  egg's buffer-space rectangle.
- The hero canvas on `index.html` must accept pointer events (remove or scope the
  `pointer-events: none` so egg clicks register while not blocking the dialog/CTA
  buttons layered above).

## Mobile Fix — Cover + Anchor Bottom

Replace the distorting blit with aspect-preserving "cover" scaling, anchored to
the bottom of the viewport:

```
scale   = max(canvasW / bufW, canvasH / bufH)
drawW   = bufW * scale
drawH   = bufH * scale
offsetX = (canvasW - drawW) / 2      // center horizontally
offsetY = canvasH - drawH            // pin to bottom (ground stays visible)
p.image(pg, offsetX, offsetY, drawW, drawH)
```

- No vertical stretch; the castle and figures keep correct proportions; the top
  of the sky crops off-screen on tall phones.
- The **same `scale`/`offsetX`/`offsetY` are reused for egg hit-testing** so
  clicks map correctly on every screen size.
- Applied to **all six scenes** (they share the same stretch) so proportions and
  egg accuracy are consistent everywhere.

## Feedback & Accessibility

- **Score change:** status-bar score flashes/pulses; optional 8-bit blip, muted
  when motion is disabled or `prefers-reduced-motion` is set.
- **Sierra dialog:** dismisses on click/tap or after a short timeout; styled with
  the existing `.dialog-box` EGA look.
- **Motion:** all egg reactions and the score blip respect the existing motion
  toggle and `prefers-reduced-motion` — visual-only/no-animation fallback.
- Egg interactions must not block navigation, the CTA buttons, or the contact
  cluster.

## Files Affected

- **New:** `js/adventure-score.js` (shared score + manifest + feedback).
- **Modified:** `index.html`, `about.html`, `books.html`, `teaching.html`,
  `research.html`, `elit.html` — include the shared script, remove hardcoded
  score numbers, add per-scene egg definitions + hit-testing, apply the cover
  scaling, and (index) enable pointer events on the hero canvas.

## Open Questions

None blocking. Final egg identities per scene will be decided during build and
recorded in the manifest.
