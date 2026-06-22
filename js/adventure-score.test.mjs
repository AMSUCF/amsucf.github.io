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

test('computeCover (contain) fits the whole scene and anchors to the bottom', () => {
  // 320x200 buffer into a tall 400x800 portrait viewport.
  const t = AS.computeCover(400, 800, 320, 200);
  // contain => scale is the min of the two ratios: min(400/320, 800/200) = min(1.25, 4) = 1.25
  assert.equal(t.scale, 1.25);
  assert.equal(t.drawW, 400);              // fills width, nothing cropped
  assert.equal(t.drawH, 250);
  assert.equal(t.offsetX, (400 - 400) / 2); // 0, centered horizontally
  assert.equal(t.offsetY, 800 - 250);       // 550, pinned to bottom (letterbox above)
});

test('computeCover (contain) letterboxes the sides on a wide viewport', () => {
  // 320x200 buffer into a wide 1920x1080 desktop viewport.
  const t = AS.computeCover(1920, 1080, 320, 200);
  // contain => min(1920/320, 1080/200) = min(6, 5.4) = 5.4
  assert.equal(t.scale, 5.4);
  assert.equal(t.drawH, 1080);              // fills height, top no longer cropped
  assert.equal(Math.round(t.drawW), 1728);
  assert.equal(t.offsetX, (1920 - t.drawW) / 2); // 96, black bars left/right
  assert.equal(t.offsetY, 0);                    // pinned to bottom
});

test('screenToBufferXY inverts the contain transform', () => {
  const t = AS.computeCover(400, 800, 320, 200);
  // The bottom-center of the viewport maps to bottom-center of the buffer.
  const p = AS.screenToBufferXY(200, 800, t);
  assert.ok(Math.abs(p.x - 160) < 0.001); // buffer center x
  assert.ok(Math.abs(p.y - 200) < 0.001); // buffer bottom y
});
