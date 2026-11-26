import { LedStrip } from "@/components/led-strip";

export function SectionHeader({
  index,
  title,
  count,
}: {
  index: string;
  title: string;
  count?: string;
}) {
  return (
    <div data-section-index={index} className="section-heading mb-8 flex items-center gap-3">
      <span className="font-mono text-xs text-subtle">{index}</span>
      <h2 className="font-mono text-sm font-medium tracking-tight text-foreground">
        <span className="text-accent">/</span>
        {title}
      </h2>
      <span className="flex-1" aria-hidden="true" />
      {count ? (
        <span className="font-mono text-xs text-subtle">{count}</span>
      ) : null}
      <LedStrip />
    </div>
  );
}
