type Point = { x: number; y: number };
export type LightningStrike = { id: number; originX: number; channels: { path: string; width: number; branch: boolean }[] };

// Midpoint displacement creates a continuous channel with detail at several
// scales. Forks grow from that channel, so they connect instead of floating.
function fracture(start: Point, end: Point, displacement: number, depth: number, random: () => number): Point[] {
  if (depth === 0) return [start, end];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const offset = (random() - 0.5) * displacement;
  const middle = { x: (start.x + end.x) / 2 - dy / length * offset, y: (start.y + end.y) / 2 + dx / length * offset };
  const left = fracture(start, middle, displacement * 0.55, depth - 1, random);
  const right = fracture(middle, end, displacement * 0.55, depth - 1, random);
  return [...left.slice(0, -1), ...right];
}

function path(points: Point[]) {
  return points.map((point, i) => `${i === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
}

export function createLightning(id: number, random: () => number = Math.random): LightningStrike {
  const left = random() < 0.5;
  const originX = left ? 80 + random() * 100 : 1260 + random() * 100;
  const direction = left ? 1 : -1;
  const start = { x: originX, y: -30 };
  const bend = { x: originX + direction * (30 + random() * 90), y: 350 + random() * 120 };
  const end = { x: originX + direction * (50 + random() * 100), y: 960 };
  const trunk = [...fracture(start, bend, 140, 6, random).slice(0, -1), ...fracture(bend, end, 160, 6, random)];
  const channels: LightningStrike["channels"] = [{ path: path(trunk), width: 1.8, branch: false }];
  for (let i = 0; i < 8; i++) {
    const index = 10 + Math.floor((i / 8) * (trunk.length - 26)) + Math.floor(random() * 5);
    const root = trunk[index];
    const reach = 80 + random() * 180;
    const side = random() > 0.22 ? direction : -direction;
    const tip = { x: root.x + reach * side, y: root.y + 90 + random() * 160 };
    const fork = fracture(root, tip, 75, 5, random);
    channels.push({ path: path(fork), width: 0.65 + random() * 0.45, branch: true });
    if (i % 2 === 0) {
      const offshoot = fork[12];
      channels.push({ path: path(fracture(offshoot, { x: offshoot.x + side * 60, y: offshoot.y + 100 }, 40, 4, random)), width: 0.45, branch: true });
    }
  }
  return { id, originX, channels };
}
