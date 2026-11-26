import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EnergyFluid } from '../lib/energy-fluid.ts';

function centerOfMass(fluid) {
  let mass = 0, x = 0, y = 0;
  fluid.dye.forEach((density, i) => {
    mass += density;
    x += (i % fluid.columns) * density;
    y += Math.floor(i / fluid.columns) * density;
  });
  return { x: x / mass, y: y / mass, mass };
}

test('fluid carries the field in the direction of horizontal and vertical gestures', () => {
  for (const [dx, dy] of [[3, 0], [0, 3], [-3, 0], [0, -3]]) {
    const fluid = new EnergyFluid(64, 64);
    fluid.splat(.5, .5, dx, dy);
    const start = centerOfMass(fluid);
    for (let i = 0; i < 8; i++) fluid.step(16.67);
    const end = centerOfMass(fluid);
    assert.ok((end.x - start.x) * dx + (end.y - start.y) * dy > .1);
    assert.ok(end.mass < start.mass);
  }
});

test('stationary input emits no dye and reset removes all retained energy', () => {
  const fluid = new EnergyFluid(64, 48);
  fluid.splat(.5, .5, 0, 0);
  assert.ok(fluid.dye.every(value => value === 0));
  fluid.splat(.5, .5, 2, 1);
  assert.ok(fluid.dye.some(value => value > 0));
  fluid.clear();
  fluid.step(16.67);
  assert.ok(fluid.dye.every(value => value === 0));
});

test('repeated sharp turns and boundary input remain finite and bounded', () => {
  const fluid = new EnergyFluid(64, 48);
  for (let i = 0; i < 180; i++) {
    fluid.splat(i % 2, (i % 3) / 2, Math.sin(i) * 3, Math.cos(i) * 3);
    fluid.step(i % 5 === 0 ? 500 : 16.67);
  }
  assert.ok(fluid.dye.every(value => Number.isFinite(value) && value >= 0 && value <= 1));
});
