"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createLightning, type LightningStrike } from "@/lib/lightning";

export function BackgroundLightning() {
  const [bolt, setBolt] = useState<LightningStrike | null>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let next: ReturnType<typeof setTimeout>;
    let fade: ReturnType<typeof setTimeout>;
    let sequence = 0;
    function schedule(first = false) {
      if (!motion.matches || document.hidden) return;
      next = setTimeout(() => {
        setBolt(createLightning(sequence++));
        fade = setTimeout(() => { setBolt(null); schedule(); }, 1600);
      }, first ? 4500 + Math.random() * 3500 : 10000 + Math.random() * 10000);
    }
    function reset() {
      clearTimeout(next);
      clearTimeout(fade);
      setBolt(null);
      schedule(true);
    }
    schedule(true);
    motion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      clearTimeout(next);
      clearTimeout(fade);
      motion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return <>
    <div className="background-atmosphere" aria-hidden="true">
    <svg className="background-lightning" viewBox="0 0 1440 900" preserveAspectRatio="none">
      {bolt ? <g key={bolt.id} className="lightning-streak">
        {bolt.channels.map((channel, index) => <g key={index} className={channel.branch ? "lightning-branch" : "lightning-trunk"}>
          <path d={channel.path} strokeWidth={channel.width * 18} vectorEffect="non-scaling-stroke" className="lightning-bloom" />
          <path d={channel.path} strokeWidth={channel.width * 5} vectorEffect="non-scaling-stroke" className="lightning-halo" />
          <path d={channel.path} strokeWidth={channel.width} vectorEffect="non-scaling-stroke" className="lightning-core" />
        </g>)}
      </g> : null}
    </svg>
    </div>
    {bolt ? <div key={bolt.id} aria-hidden="true" className="lightning-page-flash" style={{ "--strike-x": `${bolt.originX / 14.4}%` } as CSSProperties} /> : null}
  </>;
}
