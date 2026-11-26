// Adapted from the vgpu "Liquid Layout" example. Framer Motion owns the frame:
// this renderer runs in postRender, after card styles are written. Removed from
// the demo: autoplay and the lil-gui panel. Added: pausing while off screen.

import { cancelFrame, frame as motionFrame, frameData } from "framer-motion";
import { clock, frame, init, surface, type Gpu, type Surface } from "vgpu";

import type { CardRegistry } from "./layout-store";
import { clamp, createDynamics, type CardSample, type Dynamics } from "./liquid-dynamics";
import { createPipeline, type LiquidPipeline } from "./liquid-pipeline";

interface RendererOptions {
  readonly canvas: HTMLCanvasElement;
  /** Receives pointer input for the key light. */
  readonly container: HTMLElement;
  readonly registry: CardRegistry;
  /** Called once, after the first frame is on screen. */
  readonly onReady: () => void;
  /** Called when WebGPU fails; the caller falls back to the plain cards. */
  readonly onError: (error: unknown) => void;
}

// Lower than the demo's 2: this canvas spans tall cards, not one viewport.
const MAX_DPR = 1.5;
const LIGHT_HEIGHT = 380;

function bestEffort(cleanup: () => void): void {
  try {
    cleanup();
  } catch {
    // Teardown must run to completion even when one step throws.
  }
}

function sampleCards(registry: CardRegistry, origin: { left: number; top: number }): CardSample[] {
  const samples: CardSample[] = [];
  for (const handle of registry.handles()) {
    const rect = handle.element?.getBoundingClientRect();
    if (!rect || rect.width < 1 || rect.height < 1) continue;
    samples.push({
      id: handle.id,
      layer: "grid",
      cx: rect.left - origin.left + rect.width / 2,
      cy: rect.top - origin.top + rect.height / 2,
      hw: rect.width / 2,
      hh: rect.height / 2,
      rotation: (handle.rotate.get() * Math.PI) / 180,
      offsetX: handle.x.get(),
      offsetY: handle.y.get(),
      scale: handle.scale.get(),
      hue: handle.hue,
      present: true,
      hovered: handle.hover.get() > 0,
      lifted: false,
    });
  }
  return samples;
}

export function createRenderer({ canvas, container, registry, onReady, onError }: RendererOptions) {
  let disposed = false;
  let ticking = false;
  let announced = false;
  let gpu: Gpu | undefined;
  let output: Surface | undefined;
  let pipeline: LiquidPipeline | undefined;
  let dynamics: Dynamics | undefined;
  let observer: IntersectionObserver | undefined;
  let time = 0;
  let size = { width: 0, height: 0 };
  let pointer: { x: number; y: number } | null = null;
  let pointerIdle = Number.POSITIVE_INFINITY;
  const light = { x: 0, y: 0, placed: false };

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    pointerIdle = 0;
  };
  const onPointerLeave = () => {
    pointer = null;
  };

  const updateLight = (dt: number) => {
    pointerIdle += dt;
    const orbit = time * 0.22;
    let tx = size.width * (0.5 + 0.34 * Math.cos(orbit));
    let ty = size.height * (0.24 + 0.12 * Math.sin(orbit * 1.7));
    if (pointer && pointerIdle < 4) {
      tx = pointer.x;
      ty = pointer.y;
    }
    if (!light.placed) {
      light.x = tx;
      light.y = ty;
      light.placed = true;
    }
    const follow = 1 - Math.exp(-dt / (pointer ? 0.09 : 0.6));
    light.x += (tx - light.x) * follow;
    light.y += (ty - light.y) * follow;
  };

  const render = () => {
    if (disposed || !gpu || !output || !pipeline || !dynamics) return;
    const dt = clamp(frameData.delta, 0, 50) / 1000;
    clock(gpu).advance(dt);
    time += dt;

    const rect = canvas.getBoundingClientRect();
    const resized = rect.width !== size.width || rect.height !== size.height;
    size = { width: rect.width, height: rect.height };
    if (size.width < 1 || size.height < 1) return;

    updateLight(dt);
    const liquid = dynamics.update(sampleCards(registry, rect), dt, [size.width, size.height], resized);
    pipeline.update({ liquid, light: [light.x, light.y, LIGHT_HEIGHT], dim: 0 });
    const target = output;
    const chain = pipeline;
    frame(gpu, (currentFrame) => chain.encode(currentFrame, target));
    if (!announced) {
      announced = true;
      onReady();
    }
  };

  const tick = () => {
    try {
      render();
    } catch (error) {
      // A frame that throws would throw again on every tick: stop once.
      dispose();
      onError(error);
    }
  };

  const setTicking = (next: boolean) => {
    if (disposed || next === ticking) return;
    ticking = next;
    if (next) motionFrame.postRender(tick, true);
    else cancelFrame(tick);
  };

  function dispose() {
    if (disposed) return;
    setTicking(false);
    disposed = true;
    for (const cleanup of [
      () => observer?.disconnect(),
      () => {
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
      },
      () => gpu?.dispose(),
    ]) {
      bestEffort(cleanup);
    }
  }

  const initialize = async () => {
    const nextGpu = await init();
    if (disposed) {
      nextGpu.dispose();
      return;
    }
    gpu = nextGpu;
    output = surface(gpu, canvas, { dpr: [1, MAX_DPR] });
    dynamics = createDynamics({ smoothness: 1, reducedMotion: false });
    pipeline = createPipeline(gpu, output.size, output.dpr);
    await pipeline.prewarm(output);
    if (disposed) return;

    const chain = pipeline;
    output.onResize(({ width, height, dpr }) => chain.resize([width, height], dpr));
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    observer = new IntersectionObserver(([entry]) => setTicking(entry.isIntersecting), { rootMargin: "300px 0px" });
    observer.observe(canvas);
  };

  initialize().catch((error: unknown) => {
    if (disposed) return;
    dispose();
    onError(error);
  });

  return { dispose };
}
