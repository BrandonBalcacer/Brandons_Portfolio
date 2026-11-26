"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createLightning, type LightningStrike } from "@/lib/lightning";

type VisibleStrike = LightningStrike & { compact: boolean };

export function BackgroundLightning() {
  const [bolt, setBolt] = useState<VisibleStrike | null>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const compactViewport = window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)");
    let next: ReturnType<typeof setTimeout>;
    let fade: ReturnType<typeof setTimeout>;
    let sequence = 0;
    function schedule(first = false) {
      if (!motion.matches || document.hidden) return;
      const compact = compactViewport.matches;
      const delay = compact
        ? first ? 10000 + Math.random() * 6000 : 18000 + Math.random() * 12000
        : first ? 4500 + Math.random() * 3500 : 8000 + Math.random() * 8000;
      next = setTimeout(() => {
        const strike = createLightning(sequence++);
        setBolt({ ...strike, compact, channels: compact ? strike.channels.filter(channel => !channel.branch || channel.width >= 0.65) : strike.channels });
        fade = setTimeout(() => { setBolt(null); schedule(); }, compact ? 1800 : 1600);
      }, delay);
    }
    function reset() {
      clearTimeout(next);
      clearTimeout(fade);
      setBolt(null);
      schedule(true);
    }
    schedule(true);
    motion.addEventListener("change", reset);
    compactViewport.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      clearTimeout(next);
      clearTimeout(fade);
      motion.removeEventListener("change", reset);
      compactViewport.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return <>
    <div className="background-atmosphere" aria-hidden="true">
    <svg className="background-lightning" viewBox="0 0 1440 900" preserveAspectRatio="none">
      {bolt ? <g key={bolt.id} className="lightning-streak" data-entry={bolt.entry} data-intensity={bolt.compact ? "gentle" : "full"}>
        {bolt.channels.map((channel, index) => <g key={index} className={channel.branch ? "lightning-branch" : "lightning-trunk"}>
          {!bolt.compact ? <path d={channel.path} strokeWidth={channel.width * 18} vectorEffect="non-scaling-stroke" className="lightning-bloom" /> : null}
          <path d={channel.path} strokeWidth={channel.width * 5} vectorEffect="non-scaling-stroke" className="lightning-halo" />
          <path d={channel.path} strokeWidth={channel.width} vectorEffect="non-scaling-stroke" className="lightning-core" />
        </g>)}
      </g> : null}
    </svg>
    </div>
    {bolt ? <div key={bolt.id} aria-hidden="true" className="lightning-page-flash" data-intensity={bolt.compact ? "gentle" : "full"} style={{ "--strike-x": `${bolt.originX / 14.4}%`, "--strike-y": `${bolt.originY / 9}%` } as CSSProperties} /> : null}
  </>;
}
