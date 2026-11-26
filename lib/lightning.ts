type Point = { x: number; y: number };
export type LightningStrike = { id: number; originX: number; originY: number; entry: string; channels: { path: string; width: number; branch: boolean }[] };

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
  const w = 1440;
  const h = 900;
  const region = Math.min(7, Math.floor(random() * 8));
  const across = 0.2 + random() * 0.6;
  const target = 0.15 + random() * 0.7;
  // Each edge and corner has the same chance. Channels begin outside the
  // viewport and travel inward; the illumination follows the entry point.
  const entries = [
    { name: "top", start: { x: w * across, y: -30 }, end: { x: w * target, y: h + 60 } },
    { name: "right", start: { x: w + 30, y: h * across }, end: { x: -60, y: h * target } },
    { name: "bottom", start: { x: w * across, y: h + 30 }, end: { x: w * target, y: -60 } },
    { name: "left", start: { x: -30, y: h * across }, end: { x: w + 60, y: h * target } },
    { name: "top-left", start: { x: -30, y: -30 }, end: { x: w * (0.7 + target * 0.3), y: h * (0.7 + across * 0.3) } },
    { name: "top-right", start: { x: w + 30, y: -30 }, end: { x: w * target * 0.3, y: h * (0.7 + across * 0.3) } },
    { name: "bottom-right", start: { x: w + 30, y: h + 30 }, end: { x: w * target * 0.3, y: h * across * 0.3 } },
    { name: "bottom-left", start: { x: -30, y: h + 30 }, end: { x: w * (0.7 + target * 0.3), y: h * across * 0.3 } },
  ];
  const { name: entry, start, end } = entries[region];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  const bendOffset = (random() - 0.5) * 160;
  const bend = { x: (start.x + end.x) / 2 + nx * bendOffset, y: (start.y + end.y) / 2 + ny * bendOffset };
  const trunk = [...fracture(start, bend, 140, 6, random).slice(0, -1), ...fracture(bend, end, 160, 6, random)];
  const channels: LightningStrike["channels"] = [{ path: path(trunk), width: 1.8, branch: false }];
  for (let i = 0; i < 8; i++) {
    const index = 10 + Math.floor((i / 8) * (trunk.length - 26)) + Math.floor(random() * 5);
    const root = trunk[index];
    const reach = 80 + random() * 180;
    const side = random() > 0.5 ? 1 : -1;
    const forward = 90 + random() * 160;
    const tip = { x: root.x + dx / length * forward + nx * reach * side, y: root.y + dy / length * forward + ny * reach * side };
    const fork = fracture(root, tip, 75, 5, random);
    channels.push({ path: path(fork), width: 0.65 + random() * 0.45, branch: true });
    if (i % 2 === 0) {
      const offshoot = fork[12];
      channels.push({ path: path(fracture(offshoot, { x: offshoot.x + dx / length * 80 + nx * side * 60, y: offshoot.y + dy / length * 80 + ny * side * 60 }, 40, 4, random)), width: 0.45, branch: true });
    }
  }
  return { id, originX: Math.max(0, Math.min(w, start.x)), originY: Math.max(0, Math.min(h, start.y)), entry, channels };
}
