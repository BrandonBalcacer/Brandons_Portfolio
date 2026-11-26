"use client";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";

export function ProjectWorkflow({ steps }: { steps: { title: string; description: string }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className="workflow" data-field-blocker>
      <div className="mb-6 flex items-center justify-between gap-4 font-mono text-xs text-muted"><span>WORKFLOW EXPLORER</span><span className="text-accent">0{active + 1} / 0{steps.length}</span></div>
      <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Project workflow" onKeyDown={(event) => {
        let next = active;
        if (event.key === "ArrowRight") next = (active + 1) % steps.length;
        else if (event.key === "ArrowLeft") next = (active - 1 + steps.length) % steps.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = steps.length - 1;
        else return;
        event.preventDefault(); setActive(next); document.getElementById(`${id}-tab-${next}`)?.focus();
      }}>
        {steps.map((step, index) => <button key={step.title} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={index === active} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} className="workflow-step"><span className="font-mono text-xs text-accent">0{index + 1}</span><span>{step.title}</span><ArrowRight size={15} aria-hidden="true" /></button>)}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="mt-6 min-h-40 border-t border-line pt-6"><h3 className="text-xl font-medium">{steps[active].title}</h3><p className="mt-3 max-w-prose leading-relaxed text-muted">{steps[active].description}</p></div>
      <p className="mt-4 font-mono text-xs text-subtle">An interactive walkthrough of the architecture.</p>
    </div>
  );
}
