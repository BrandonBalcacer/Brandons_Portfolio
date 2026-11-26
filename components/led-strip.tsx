"use client";

import { useEffect, useRef } from "react";

/**
 * An LED strip under a section header, after the triangle-LED hero: lit
 * segments spill grainy light onto the page in the section's color and shift
 * to red, green and blue on hover. The pointer brightens the LEDs nearest it.
 * Everything visual lives in globals.css; this only tracks the pointer.
 */
export function LedStrip() {
  const strip = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = strip.current?.parentElement;
    if (!host) return;
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    let frame = 0;
    let x = 0;
    const apply = () => {
      frame = 0;
      host.style.setProperty("--led-x", `${x}px`);
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX - host.getBoundingClientRect().left;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={strip} className="led" aria-hidden="true">
      <span className="led-spill" />
      <span className="led-spill led-rgb" />
      <span className="led-glow" />
      <span className="led-glow led-rgb" />
      <span className="led-hot" />
      <span className="led-bar" />
      <span className="led-bar led-rgb" />
    </span>
  );
}
