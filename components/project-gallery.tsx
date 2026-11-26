"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import type { ProjectStory } from "@/lib/project-details";

export function ProjectGallery({ images, name }: { images: ProjectStory["images"]; name: string }) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const image = images[active];
  return <section className="project-gallery mt-8" aria-label={`${name} screenshots`} data-field-blocker>
    <button type="button" onClick={() => dialog.current?.showModal()} className={`gallery-image ${image.portrait ? "gallery-image-portrait" : ""}`} aria-label={`Enlarge screenshot: ${image.alt}`}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-contain" />
      <span className="gallery-expand"><Expand size={14} aria-hidden="true" /> Enlarge</span>
    </button>
    <div className="gallery-controls">
      <div className="flex flex-wrap gap-2" aria-label="Choose a screenshot">
        {images.map((item, i) => <button type="button" key={item.src} onClick={() => setActive(i)} aria-pressed={i === active} className="gallery-choice" aria-label={`Show screenshot ${i + 1}: ${item.alt}`}>{String(i + 1).padStart(2, "0")}</button>)}
      </div>
      <p className="max-w-xl text-xs leading-relaxed text-muted" aria-live="polite">{image.caption}</p>
    </div>
    <dialog ref={dialog} className="screenshot-dialog" aria-labelledby={titleId} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-content">
        <div className="mb-4 flex items-center justify-between gap-4"><h2 id={titleId} className="font-mono text-sm">{name} / {String(active + 1).padStart(2, "0")}</h2><button type="button" onClick={() => dialog.current?.close()} className="dialog-close" aria-label="Close screenshot"><X size={20} aria-hidden="true" /></button></div>
        <div className="dialog-image"><Image src={image.src} alt={image.alt} fill sizes="95vw" className="object-contain" /></div>
        <p className="mt-4 text-sm text-muted">{image.caption}</p>
      </div>
    </dialog>
  </section>;
}
