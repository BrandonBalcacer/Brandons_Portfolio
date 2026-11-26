"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const NAME = "Brandon Balcacer";
const LINES = { wide: [NAME], tall: NAME.split(" ") } as const;
const GREETING = "Welcome to my Domain";

/** How long the formed name stays before the page appears. */
const HOLD_MS = 1600;
/** How long the plain-text version stays when WebGPU is unavailable. */
const FALLBACK_MS = 1800;
/** Upper bound, so a stalled GPU can never trap a visitor. */
const MAX_MS = 8000;
const LEAVE_MS = 500;
/** Past this long after navigation, the visitor is already looking at the page. */
const LATE_MS = 4000;

// Survives client-side navigation, so returning from a case study does not replay it.
let hasPlayed = false;

type Phase = "playing" | "leaving" | "done";

/** Deep links, reduced motion and slow loads go straight to the page. */
function shouldSkip(): boolean {
  return (
    window.location.hash !== "" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    performance.now() > LATE_MS
  );
}

export function IntroScreen() {
  const [phase, setPhase] = useState<Phase>(() => (hasPlayed ? "done" : "playing"));
  const [fallback, setFallback] = useState(false);
  const [formed, setFormed] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const leave = useCallback(() => setPhase((current) => (current === "playing" ? "leaving" : current)), []);
  const visible = phase !== "done";

  useEffect(() => {
    if (!visible) return;
    hasPlayed = true;
    if (shouldSkip()) {
      const now = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(now);
    }
    const onKey = (event: KeyboardEvent) => {
      // Tab dismisses too, so keyboard focus never moves behind the overlay.
      if (event.key === "Escape" || event.key === "Tab") leave();
    };
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const limit = window.setTimeout(leave, MAX_MS);
    return () => {
      window.clearTimeout(limit);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [visible, leave]);

  useEffect(() => {
    const target = canvas.current;
    if (!visible || !target || shouldSkip()) return;
    let cancelled = false;
    let renderer: { dispose: () => void } | undefined;
    const fail = (error: unknown) => {
      console.warn("Intro particles unavailable, showing text.", error);
      setFallback(true);
    };
    const start = async () => {
      if (!("gpu" in navigator)) throw new Error("WebGPU is not supported");
      const { createRenderer } = await import("./renderer");
      if (cancelled) return;
      const small = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      renderer = createRenderer({
        canvas: target,
        lines: LINES,
        fontFamily: getComputedStyle(document.body).fontFamily,
        greeting: {
          text: GREETING,
          fontFamily: `${getComputedStyle(document.body).getPropertyValue("--font-mono").trim() || "monospace"}, monospace`,
        },
        particles: small ? 65_536 : 262_144,
        onFormed: () => setFormed(true),
        onError: fail,
      });
    };
    start().catch(fail);
    return () => {
      cancelled = true;
      renderer?.dispose();
    };
  }, [visible]);

  useEffect(() => {
    if (!formed && !fallback) return;
    const timer = window.setTimeout(leave, fallback ? FALLBACK_MS : HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [formed, fallback, leave]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("done"), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (!visible) return null;

  return (
    <div className="intro" data-phase={phase} data-fallback={fallback || undefined}>
      {fallback ? null : <canvas ref={canvas} aria-hidden="true" className="intro-canvas" />}
      <p className={fallback ? "intro-name" : "sr-only"}>{NAME}</p>
      {/* The particles spell the greeting too; this copy serves screen readers and the fallback. */}
      <p className={fallback ? "intro-greeting" : "sr-only"}>
        {GREETING}
      </p>
      <button type="button" className="intro-skip" onClick={leave}>
        Skip
      </button>
    </div>
  );
}
