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

test('maxScore equals starting + pages + eggs structurally', () => {
  assert.equal(AS.maxScore(), AS.STARTING_SCORE + AS.PAGES.length + AS.totalEggCount(AS.EGGS));
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

test('computeCover (cover) fills a tall viewport and trims the sides', () => {
  // 320x200 buffer into a tall 400x800 portrait viewport.
  const t = AS.computeCover(400, 800, 320, 200);
  // cover => scale is the max of the two ratios: max(400/320, 800/200) = max(1.25, 4) = 4
  assert.equal(t.scale, 4);
  assert.equal(t.drawW, 1280);             // overflows width — sides trimmed
  assert.equal(t.drawH, 800);              // fills height exactly
  assert.equal(t.offsetX, (400 - 1280) / 2); // -440, centered (trim sides evenly)
  assert.equal(t.offsetY, 800 - 800);        // 0, ground pinned to bottom
});

test('computeCover (cover) fills a wide viewport and trims the sky off the top', () => {
  // 320x200 buffer into a wide 1920x1080 desktop viewport.
  const t = AS.computeCover(1920, 1080, 320, 200);
  // cover => max(1920/320, 1080/200) = max(6, 5.4) = 6
  assert.equal(t.scale, 6);
  assert.equal(t.drawW, 1920);             // fills width exactly
  assert.equal(t.drawH, 1200);             // overflows height — top trimmed
  assert.equal(t.offsetX, 0);              // no horizontal trim
  assert.equal(t.offsetY, 1080 - 1200);    // -120, pinned to bottom (sky cropped)
});

test('computeCover bottom anchor is the default when anchorY is omitted', () => {
  // Same wide viewport as above; omitting anchorY must behave like 'bottom'.
  const def = AS.computeCover(1920, 1080, 320, 200);
  const bottom = AS.computeCover(1920, 1080, 320, 200, 'bottom');
  assert.deepEqual(def, bottom);
  assert.equal(def.offsetY, 1080 - 1200); // -120, pinned to bottom
});

test("computeCover 'center' splits vertical overflow for the interior banners", () => {
  // 320x200 scene into a short, wide 1440x450 interior banner.
  const t = AS.computeCover(1440, 450, 320, 200, 'center');
  // cover => max(1440/320, 450/200) = max(4.5, 2.25) = 4.5
  assert.equal(t.scale, 4.5);
  assert.equal(t.drawW, 1440);          // fills width exactly
  assert.equal(t.drawH, 900);           // overflows height by 450
  assert.equal(t.offsetX, 0);           // no horizontal trim
  assert.equal(t.offsetY, (450 - 900) / 2); // -225, half the overflow off each of top/bottom
});

test("computeCover 'center' only changes the vertical anchor, not the scale or x", () => {
  const bottom = AS.computeCover(1440, 450, 320, 200, 'bottom');
  const center = AS.computeCover(1440, 450, 320, 200, 'center');
  assert.equal(center.scale, bottom.scale);
  assert.equal(center.drawW, bottom.drawW);
  assert.equal(center.drawH, bottom.drawH);
  assert.equal(center.offsetX, bottom.offsetX);
  assert.notEqual(center.offsetY, bottom.offsetY);
});

test('screenToBufferXY inverts the cover transform', () => {
  const t = AS.computeCover(400, 800, 320, 200);
  // The bottom-center of the viewport maps to bottom-center of the buffer.
  const p = AS.screenToBufferXY(200, 800, t);
  assert.ok(Math.abs(p.x - 160) < 0.001); // buffer center x
  assert.ok(Math.abs(p.y - 200) < 0.001); // buffer bottom y
});
