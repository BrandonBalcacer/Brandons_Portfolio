"use client";

import { useEffect, useState } from "react";

const paths = [
  "M95 -20 L145 115 L110 172 L179 266 L133 315 L204 442 L167 485 L231 650",
  "M1320 -20 L1244 117 L1282 171 L1218 289 L1254 343 L1184 468 L1215 521 L1150 700",
  "M-30 590 L112 555 L154 592 L286 538 L336 569 L465 509 L511 536 L640 487",
];

export function BackgroundLightning() {
  const [bolt, setBolt] = useState<number | null>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let next: ReturnType<typeof setTimeout>;
    let fade: ReturnType<typeof setTimeout>;
    let sequence = 0;
    function schedule() {
      if (!motion.matches || document.hidden) return;
      next = setTimeout(() => {
        setBolt(sequence++ % paths.length);
        fade = setTimeout(() => { setBolt(null); schedule(); }, 1000);
      }, 10000 + Math.random() * 12000);
    }
    function reset() {
      clearTimeout(next);
      clearTimeout(fade);
      setBolt(null);
      schedule();
    }
    schedule();
    motion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      clearTimeout(next);
      clearTimeout(fade);
      motion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return <div className="background-atmosphere" aria-hidden="true">
    <svg className="background-lightning" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      {bolt !== null ? <g key={bolt} className="lightning-streak"><path d={paths[bolt]} className="lightning-halo" /><path d={paths[bolt]} className="lightning-core" /></g> : null}
    </svg>
  </div>;
}
