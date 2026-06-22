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
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-xs text-subtle">{index}</span>
      <h2 className="font-mono text-sm font-medium tracking-tight text-foreground">
        <span className="text-subtle">/</span>
        {title}
      </h2>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      {count ? (
        <span className="font-mono text-xs text-subtle">{count}</span>
      ) : null}
    </div>
  );
}
