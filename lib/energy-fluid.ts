// A small, incompressible velocity field. Dye is carried by the gesture's
// momentum rather than drawing a fixed shape around the current pointer.
export class EnergyFluid {
  readonly columns: number;
  readonly rows: number;
  readonly dye: Float32Array;
  private vx: Float32Array;
  private vy: Float32Array;
  private nextX: Float32Array;
  private nextY: Float32Array;
  private nextDye: Float32Array;
  private pressure: Float32Array;
  private nextPressure: Float32Array;
  private divergence: Float32Array;
  private curl: Float32Array;

  constructor(columns = 128, rows = 80) {
    this.columns = columns;
    this.rows = rows;
    const size = columns * rows;
    this.dye = new Float32Array(size);
    this.vx = new Float32Array(size);
    this.vy = new Float32Array(size);
    this.nextX = new Float32Array(size);
    this.nextY = new Float32Array(size);
    this.nextDye = new Float32Array(size);
    this.pressure = new Float32Array(size);
    this.nextPressure = new Float32Array(size);
    this.divergence = new Float32Array(size);
    this.curl = new Float32Array(size);
  }

  splat(x: number, y: number, dx: number, dy: number, intensity = 1) {
    const cx = x * (this.columns - 1);
    const cy = y * (this.rows - 1);
    const speed = Math.min(Math.hypot(dx, dy), 5);
    if (speed < 0.001 || intensity <= 0) return;
    const radius = 4.5 + speed * 0.5;
    for (let row = Math.max(1, Math.floor(cy - radius * 2)); row < Math.min(this.rows - 1, cy + radius * 2); row++) {
      for (let col = Math.max(1, Math.floor(cx - radius * 2)); col < Math.min(this.columns - 1, cx + radius * 2); col++) {
        const ox = col - cx;
        const oy = row - cy;
        const weight = Math.exp(-(ox * ox + oy * oy) / (radius * radius));
        const i = row * this.columns + col;
        this.dye[i] = Math.min(1, this.dye[i] + weight * intensity * 0.18);
        // Opposing eddies along the wake roll its edges into the surrounding air.
        const swirl = Math.sin((ox * dy - oy * dx) * 0.18) * speed * 0.12;
        this.vx[i] += (dx * 0.32 - oy * swirl) * weight * intensity;
        this.vy[i] += (dy * 0.32 + ox * swirl) * weight * intensity;
      }
    }
  }

  private sample(field: Float32Array, x: number, y: number) {
    x = Math.max(0.5, Math.min(this.columns - 1.5, x));
    y = Math.max(0.5, Math.min(this.rows - 1.5, y));
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const i = iy * this.columns + ix;
    return (field[i] * (1 - fx) + field[i + 1] * fx) * (1 - fy)
      + (field[i + this.columns] * (1 - fx) + field[i + this.columns + 1] * fx) * fy;
  }

  step(delta: number) {
    const dt = Math.min(2, Math.max(0, delta / 16.67));
    const w = this.columns;
    const h = this.rows;
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      this.curl[i] = (this.vy[i + 1] - this.vy[i - 1] - this.vx[i + w] + this.vx[i - w]) * 0.5;
    }
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const gx = Math.abs(this.curl[i + 1]) - Math.abs(this.curl[i - 1]);
      const gy = Math.abs(this.curl[i + w]) - Math.abs(this.curl[i - w]);
      const length = Math.hypot(gx, gy) + 0.001;
      this.vx[i] += gy / length * this.curl[i] * 0.12 * dt;
      this.vy[i] -= gx / length * this.curl[i] * 0.12 * dt;
      this.nextX[i] = this.sample(this.vx, x - this.vx[i] * dt, y - this.vy[i] * dt) * Math.pow(0.96, dt);
      this.nextY[i] = this.sample(this.vy, x - this.vx[i] * dt, y - this.vy[i] * dt) * Math.pow(0.96, dt);
    }
    [this.vx, this.nextX] = [this.nextX, this.vx];
    [this.vy, this.nextY] = [this.nextY, this.vy];
    this.pressure.fill(0);
    this.nextPressure.fill(0);
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      this.divergence[i] = (this.vx[i + 1] - this.vx[i - 1] + this.vy[i + w] - this.vy[i - w]) * 0.5;
    }
    for (let pass = 0; pass < 8; pass++) {
      for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        this.nextPressure[i] = (this.pressure[i - 1] + this.pressure[i + 1] + this.pressure[i - w] + this.pressure[i + w] - this.divergence[i]) * 0.25;
      }
      [this.pressure, this.nextPressure] = [this.nextPressure, this.pressure];
    }
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      this.vx[i] -= (this.pressure[i + 1] - this.pressure[i - 1]) * 0.5;
      this.vy[i] -= (this.pressure[i + w] - this.pressure[i - w]) * 0.5;
      this.nextDye[i] = this.sample(this.dye, x - this.vx[i] * dt, y - this.vy[i] * dt) * Math.pow(0.955, dt);
    }
    this.dye.set(this.nextDye);
  }

  clear() {
    for (const field of [this.vx, this.vy, this.nextX, this.nextY, this.dye, this.nextDye, this.pressure, this.nextPressure, this.divergence, this.curl]) field.fill(0);
  }
}
