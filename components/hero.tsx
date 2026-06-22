import { MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <header className="relative">
      <div className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-64 bg-grid bg-grid-fade opacity-60" />

      {/* Terminal window */}
      <div className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-mono text-xs text-subtle">
            {profile.handle}@{profile.host}: ~
          </span>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">$</span> whoami
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
            {profile.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-muted">{profile.role}</p>

          <p className="mt-5 max-w-xl leading-relaxed text-muted text-pretty">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-subtle">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Status line */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-xs text-muted">{profile.status}</span>
      </div>
    </header>
  );
}
