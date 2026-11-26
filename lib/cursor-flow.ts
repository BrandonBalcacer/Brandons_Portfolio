export type FlowPoint = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  born: number;
  intensity: number;
  speed: number;
};

// Geometry stays in viewport coordinates. Only actual movement emits a wake.
export class CursorFlow {
  points: FlowPoint[] = [];
  lastMovement = -Infinity;
  private previous: { x: number; y: number; at: number } | null = null;

  move(x: number, y: number, now: number, intensity = 1) {
    const previous = this.previous;
    if (!previous || now - previous.at > 180) {
      this.previous = { x, y, at: now };
      return [];
    }
    const dx = x - previous.x;
    const dy = y - previous.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 0.25) return [];
    const elapsed = Math.max(4, now - previous.at);
    const speed = Math.min(distance / elapsed, 3);
    const nx = -dy / distance;
    const ny = dx / distance;
    const count = Math.min(32, Math.ceil(distance / 5));
    this.lastMovement = now;
    const emitted: FlowPoint[] = [];
    for (let i = 1; i <= count; i++) {
      const t = i / count;
      const px = previous.x + dx * t;
      const py = previous.y + dy * t;
      const born = now - (1 - t) * Math.min(elapsed, 16);
      const point = { x: px, y: py, nx, ny, born, intensity, speed };
      this.points.push(point);
      emitted.push(point);
    }
    this.previous = { x, y, at: now };
    if (this.points.length > 80) this.points.splice(0, this.points.length - 80);
    return emitted;
  }

  opacity(now: number) {
    // No idle orbit: start fading within one frame of the final movement.
    return Math.exp(-Math.max(0, now - this.lastMovement - 16) / 55);
  }

  advance(now: number) {
    this.points = this.points.filter((point) => now - point.born < 260);
    return this.points.length > 0;
  }

  release() { this.previous = null; }

  clear() {
    this.points = [];
    this.previous = null;
    this.lastMovement = -Infinity;
  }
}
