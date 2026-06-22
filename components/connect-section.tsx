import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

export function ConnectSection() {
  return (
    <footer className="mt-20">
      <SectionHeader index="05" title="connect" />
      <Reveal>
        <p className="mb-6 max-w-md font-mono text-sm text-muted">
          <span className="text-accent">$</span> reach me anytime —
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {socials.map((social) => {
            const isMail = social.href.startsWith("mailto:");
            return (
              <a
                key={social.label}
                href={social.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className="group flex items-center justify-between rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <span className="font-mono text-xs">{social.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-6 font-mono text-[11px] text-subtle">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js · Deployed on Vercel</span>
      </div>
    </footer>
  );
}
