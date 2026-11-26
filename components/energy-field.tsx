"use client";

import { useEffect, useRef } from "react";
import { CursorFlow } from "@/lib/cursor-flow";
import { EnergyFluid } from "@/lib/energy-fluid";

export function EnergyField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feedbackRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const feedbackCanvas = feedbackRef.current;
    if (!canvas || !feedbackCanvas) return;
    const context = canvas.getContext("2d");
    const feedback = feedbackCanvas.getContext("2d");
    const dyeCanvas = document.createElement("canvas");
    const dyeContext = dyeCanvas.getContext("2d");
    if (!context || !feedback || !dyeContext) return;

    const eligibility = window.matchMedia("(prefers-reduced-motion: no-preference) and (any-pointer: fine)");
    const flow = new CursorFlow();
    const ripples: { x: number; y: number; born: number }[] = [];
    let fluid: EnergyFluid;
    let pixels: ImageData;
    let frame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let lastFrame = 0;

    function clearCanvases() {
      context!.clearRect(0, 0, width, height);
      feedback!.clearRect(0, 0, width, height);
    }

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      flow.clear();
      fluid?.clear();
      ripples.length = 0;
      clearCanvases();
    }

    function resize() {
      reset();
      width = window.innerWidth;
      height = window.innerHeight;
      const columns = Math.max(64, Math.min(144, Math.round(width / 10)));
      const rows = Math.max(48, Math.min(128, Math.round(columns * height / width)));
      fluid = new EnergyFluid(columns, rows);
      dyeCanvas.width = columns;
      dyeCanvas.height = rows;
      pixels = dyeContext!.createImageData(columns, rows);
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      for (const surface of [canvas!, feedbackCanvas!]) {
        surface.width = Math.round(width * scale);
        surface.height = Math.round(height * scale);
        surface.getContext("2d")!.setTransform(scale, 0, 0, scale, 0, 0);
      }
    }

    function draw(now: number) {
      frame = 0;
      if (!eligibility.matches || document.hidden) { reset(); return; }
      const delta = lastFrame ? now - lastFrame : 16.67;
      const alive = flow.advance(now);
      lastFrame = now;
      clearCanvases();
      const opacity = flow.opacity(now);
      if (alive && opacity > 0.005) {
        fluid.step(delta);
        for (let i = 0; i < fluid.dye.length; i++) {
          const density = fluid.dye[i];
          const p = i * 4;
          pixels.data[p] = 42 + density * 40;
          pixels.data[p + 1] = 205 + density * 45;
          pixels.data[p + 2] = 125 + density * 40;
          pixels.data[p + 3] = Math.min(145, Math.pow(density, 0.8) * 145) * opacity;
        }
        dyeContext!.putImageData(pixels, 0, 0);
        context!.save();
        context!.imageSmoothingEnabled = true;
        context!.filter = "blur(10px)";
        context!.drawImage(dyeCanvas, 0, 0, width, height);
        context!.globalAlpha = 0.3;
        context!.filter = "blur(30px)";
        context!.drawImage(dyeCanvas, 0, 0, width, height);
        context!.restore();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const progress = (now - ripples[i].born) / 360;
        if (progress >= 1) { ripples.splice(i, 1); continue; }
        feedback!.beginPath();
        feedback!.arc(ripples[i].x, ripples[i].y, 5 + progress * 30, 0, Math.PI * 2);
        feedback!.strokeStyle = `rgba(74,222,128,${(1 - progress) * 0.6})`;
        feedback!.lineWidth = 1;
        feedback!.stroke();
      }
      if (alive || ripples.length) frame = requestAnimationFrame(draw);
      else { lastFrame = 0; fluid.clear(); }
    }

    function wake() {
      if (!frame && eligibility.matches && !document.hidden) frame = requestAnimationFrame(draw);
    }

    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || !eligibility.matches) return;
      const blocked = event.target instanceof Element && event.target.closest("[data-field-blocker], a, button, input, textarea");
      const coalesced = event.getCoalescedEvents?.() ?? [];
      const samples = coalesced.length ? coalesced : [event];
      for (const sample of samples) {
        const now = performance.now();
        if (flow.points.length && now - flow.lastMovement > 180) { flow.clear(); fluid.clear(); }
        const points = flow.move(sample.clientX, sample.clientY, now, blocked ? 0.06 : 1);
        points.forEach((point, i) => {
          if (i % 3 !== 0 && i !== points.length - 1) return;
          fluid.splat(point.x / width, point.y / height, point.ny * point.speed, -point.nx * point.speed, point.intensity);
        });
      }
      wake();
    }

    function leave() { flow.release(); }
    function click(event: PointerEvent) {
      if (event.button !== 0 || event.pointerType === "touch" || !eligibility.matches) return;
      if (!(event.target instanceof Element) || !event.target.closest("a,button")) return;
      ripples.push({ x: event.clientX, y: event.clientY, born: performance.now() });
      if (ripples.length > 5) ripples.shift();
      wake();
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", reset);
    eligibility.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", reset);
      eligibility.removeEventListener("change", reset);
    };
  }, []);

  return <><canvas ref={canvasRef} aria-hidden="true" className="energy-field" /><canvas ref={feedbackRef} aria-hidden="true" className="click-feedback" /></>;
}
