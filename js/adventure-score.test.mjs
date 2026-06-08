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
