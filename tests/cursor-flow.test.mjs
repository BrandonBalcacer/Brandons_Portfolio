import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CursorFlow } from '../lib/cursor-flow.ts';

test('wake follows a curved gesture and preserves its direction', () => {
  const flow = new CursorFlow();
  flow.move(0, 0, 0);
  flow.move(80, 0, 16);
  assert.ok(flow.points.every(p => p.ny > 0 && p.nx === 0));
  flow.move(80, 80, 32);
  assert.ok(flow.points.some(p => p.x === 80 && p.y > 0));
  assert.ok(flow.points.some(p => p.y === 0 && p.x < 80));
  assert.ok(flow.points.at(-1).nx < 0 && flow.points.at(-1).ny === 0);
});

test('stopping immediately fades the wake and leaves no animation running', () => {
  const flow = new CursorFlow();
  flow.move(0, 0, 0);
  flow.move(40, 0, 16);
  assert.ok(flow.opacity(96) < 0.4);
  assert.ok(flow.opacity(256) < 0.02);
  assert.equal(flow.advance(300), false);
  assert.equal(flow.points.length, 0);
});

test('identical pointer coordinates do not refresh or emit the effect', () => {
  const flow = new CursorFlow();
  flow.move(0, 0, 0);
  flow.move(20, 0, 16);
  const count = flow.points.length;
  flow.move(20, 0, 100);
  assert.equal(flow.lastMovement, 16);
  assert.equal(flow.points.length, count);
});

test('resuming after a pause does not draw a bridge from the old cursor position', () => {
  const flow = new CursorFlow();
  flow.move(0, 0, 0);
  flow.move(20, 0, 16);
  flow.advance(400);
  flow.move(500, 500, 410);
  flow.move(520, 500, 426);
  assert.ok(flow.points.every(p => p.x >= 500 && p.y === 500));
});

test('long gestures stay bounded and clearing removes the wake', () => {
  const flow = new CursorFlow();
  for (let i = 0; i < 500; i++) flow.move(i * 10, i, i * 8);
  assert.ok(flow.points.length <= 80);
  flow.clear();
  assert.equal(flow.advance(5000), false);
});
