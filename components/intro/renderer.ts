// Adapted from the vgpu "Spring Choreography" example. One morph, no loop: the
// wave field springs into the name and greeting, and holds. The demo's timeline controls,
// GUI and click bursts are removed; the baked springs, stagger, compute
// pipeline and resource cleanup are the example's.

import { cancelFrame, frame as motionFrame, frameData, motionValue, springValue } from "framer-motion";
import { clock, frame, init, surface, type Gpu, type Surface } from "vgpu";

import {
  DEFAULT_SPRING,
  bakeSpring,
  bakeStagger,
  lookAtOrigin,
  morphWindow,
  pullback,
} from "./choreography";
import { GLYPH_POINTS, createPipeline, type Pipeline } from "./pipeline";

interface RendererOptions {
  readonly canvas: HTMLCanvasElement;
  readonly lines: { readonly wide: readonly string[]; readonly tall: readonly string[] };
  readonly fontFamily: string;
  /** Formed in particles beneath the name, in its own face. */
  readonly greeting: { readonly text: string; readonly fontFamily: string };
  readonly particles: number;
  /** Called once, when the name has formed. */
  readonly onFormed: () => void;
  readonly onError: (error: unknown) => void;
}

const MAX_DPR = 1.5;
/** Seconds the wave field shows before the morph starts. */
const LEAD = 0.5;
const SPREAD = 0.8;
const TRAIL_KEEP = 0.6;
const CAMERA_DISTANCE = 4.8;
const HALF_FOV = (19 * Math.PI) / 180;
/** Camera starts above the wave field and swings round to face the name. */
const START_PITCH = 0.5;
const START_YAW = -0.3;

function bestEffort(cleanup: () => void): void {
  try {
    cleanup();
  } catch {
    // Teardown must run to completion even when one step throws.
  }
}

const NAME_SIZE = 200;
/** The greeting's size, gap above it and tracking, relative to the name's font size. */
const GREETING_SIZE = 0.34;
const GREETING_GAP = 0.3;
const GREETING_TRACKING = 0.08;

/** Rasterises the name and greeting on a 2D canvas and samples their lit pixels as world-space points. */
function glyphPoints(
  lines: readonly string[],
  greeting: RendererOptions["greeting"],
  fontFamily: string,
  aspect: number,
) {
  const lineHeight = NAME_SIZE * 1.05;
  const greetingSize = Math.round(NAME_SIZE * GREETING_SIZE);
  const nameFont = `700 ${NAME_SIZE}px ${fontFamily}`;
  const greetingFont = `600 ${greetingSize}px ${greeting.fontFamily}`;
  const tracking = `${Math.round(greetingSize * GREETING_TRACKING)}px`;
  const sheet = document.createElement("canvas");
  const context = sheet.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("2D canvas unavailable");

  context.font = nameFont;
  const nameWidth = Math.max(...lines.map((line) => context.measureText(line).width));
  context.font = greetingFont;
  context.letterSpacing = tracking;
  const greetingWidth = context.measureText(greeting.text).width;
  const greetingTop = lineHeight * lines.length + NAME_SIZE * GREETING_GAP;
  sheet.width = Math.ceil(Math.max(nameWidth, greetingWidth)) + 20;
  sheet.height = Math.ceil(greetingTop + greetingSize * 1.3);

  // Resizing the canvas resets its state, so styles are set after.
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#fff";
  context.font = nameFont;
  lines.forEach((line, i) => context.fillText(line, sheet.width / 2, lineHeight * (i + 0.5)));
  context.font = greetingFont;
  context.letterSpacing = tracking;
  context.fillText(greeting.text, sheet.width / 2, greetingTop + greetingSize * 0.65);

  const { data } = context.getImageData(0, 0, sheet.width, sheet.height);
  const lit: number[] = [];
  for (let y = 0; y < sheet.height; y += 2) {
    for (let x = 0; x < sheet.width; x += 2) {
      if (data[(y * sheet.width + x) * 4 + 3]! > 128) lit.push(x, y);
    }
  }
  if (lit.length === 0) throw new Error("The name produced no points");

  const halfHeight = CAMERA_DISTANCE * pullback(aspect) * Math.tan(HALF_FOV);
  const width = Math.min(halfHeight * aspect * 1.8, 3.8);
  const scale = width / sheet.width;
  const points = new Float32Array(GLYPH_POINTS * 2);
  const available = lit.length / 2;
  for (let i = 0; i < GLYPH_POINTS; i++) {
    const at = Math.floor((i * available) / GLYPH_POINTS) * 2;
    points[i * 2] = (lit[at]! - sheet.width / 2) * scale;
    points[i * 2 + 1] = (sheet.height / 2 - lit[at + 1]!) * scale;
  }
  return points;
}

export function createRenderer(options: RendererOptions) {
  const { canvas, lines, fontFamily, greeting, particles, onFormed, onError } = options;
  let disposed = false;
  let ticking = false;
  let formed = false;
  let gpu: Gpu | undefined;
  let output: Surface | undefined;
  let pipeline: Pipeline | undefined;
  let size: readonly [number, number] = [1, 1];
  let time = 0;
  let window_ = 0;

  const pointerX = motionValue(0);
  const pointerY = motionValue(0);
  const pushTarget = motionValue(0);
  const sprungX = springValue(pointerX, { stiffness: 260, damping: 24 });
  const sprungY = springValue(pointerY, { stiffness: 260, damping: 24 });
  const push = springValue(pushTarget, { stiffness: 170, damping: 9 });

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1);
    pointerY.set(1 - ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2);
    pushTarget.set(1);
  };
  const onPointerLeave = () => pushTarget.set(0);

  const layoutName = () => {
    const aspect = size[0] / Math.max(1, size[1]);
    pipeline?.setGlyphs(glyphPoints(aspect < 1 ? lines.tall : lines.wide, greeting, fontFamily, aspect));
    // Thin letters stack far more sparks per pixel than the demo's shapes, most
    // of all on wide screens, where the demo's exposure blows out to white.
    pipeline?.setLook({ exposure: aspect < 1 ? 0.85 : 0.22, streak: 0.006 });
  };

  const render = () => {
    if (disposed || !gpu || !output || !pipeline) return;
    const dt = Math.min(Math.max(frameData.delta, 0), 50) / 1000;
    clock(gpu).advance(dt);
    time += dt;

    const aspect = size[0] / Math.max(1, size[1]);
    const elapsed = time - LEAD;
    const morphing = elapsed >= 0 && elapsed < window_;
    const progress = Math.min(Math.max(elapsed / 2.2, 0), 1);
    const eased = progress * progress * (3 - 2 * progress);
    const pitch = START_PITCH * (1 - eased);
    const yaw = START_YAW * (1 - eased);
    const distance = CAMERA_DISTANCE * pullback(aspect);
    const viewProjection = lookAtOrigin(
      [Math.sin(yaw) * Math.cos(pitch) * distance, Math.sin(pitch) * distance, Math.cos(yaw) * Math.cos(pitch) * distance],
      aspect,
    );

    const target = output;
    const chain = pipeline;
    frame(gpu, (currentFrame) =>
      chain.encode(currentFrame, target, {
        time,
        viewProjection,
        baseShape: elapsed >= window_ ? 1 : 0,
        segments: morphing ? [{ index: 0, source: 0, target: 1, elapsed }] : [],
        pattern: "center",
        bursts: [],
        pointer: {
          position: [sprungX.get(), sprungY.get()],
          velocity: [sprungX.getVelocity() * aspect, sprungY.getVelocity()],
          strength: push.get(),
          radius: Math.min(Math.max(Math.min(canvas.clientWidth, canvas.clientHeight) * 0.12, 40), 110),
        },
        keep: Math.pow(TRAIL_KEEP, dt * 60),
      }),
    );
    if (!formed && elapsed > SPREAD + 1.1) {
      formed = true;
      onFormed();
    }
  };

  const tick = () => {
    try {
      render();
    } catch (error) {
      dispose();
      onError(error);
    }
  };

  function dispose() {
    if (disposed) return;
    disposed = true;
    for (const cleanup of [
      () => {
        if (ticking) cancelFrame(tick);
      },
      () => {
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
      },
      () => {
        for (const value of [sprungX, sprungY, push, pointerX, pointerY, pushTarget]) value.destroy();
      },
      () => gpu?.dispose(),
    ]) {
      bestEffort(cleanup);
    }
  }

  const initialize = async () => {
    // Browsers that predate this limit name reject the request, so retry without it.
    const nextGpu = await init({ requiredLimits: { maxStorageBuffersInVertexStage: 1 } }).catch(() => init());
    if (disposed) {
      nextGpu.dispose();
      return;
    }
    gpu = nextGpu;
    await document.fonts.ready;
    if (disposed) return;
    output = surface(gpu, canvas, { dpr: [1, MAX_DPR] });
    size = output.size;
    pipeline = createPipeline(gpu, { count: particles });
    const spring = bakeSpring(DEFAULT_SPRING);
    pipeline.setSpring(spring, bakeStagger(SPREAD, "easeInOut"), SPREAD);
    window_ = morphWindow(SPREAD, spring.duration);
    pipeline.resize(output.size, output.dpr);
    layoutName();
    await pipeline.prewarm(output);
    if (disposed) return;

    output.onResize(({ width, height, dpr }) => {
      size = [width, height];
      pipeline?.resize(size, dpr);
      layoutName();
    });
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    motionFrame.render(tick, true);
    ticking = true;
  };

  initialize().catch((error: unknown) => {
    if (disposed) return;
    dispose();
    onError(error);
  });

  return { dispose };
}
