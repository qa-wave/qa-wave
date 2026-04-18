import { cn } from "@/lib/utils";
import { fraunces } from "@/components/design/d/fonts";
import { LuxuryCursor } from "@/components/design/d/cursor";
import { HeroD } from "@/components/design/d/hero";
import { ProblemD } from "@/components/design/d/problem";
import { LuxuryMarquee } from "@/components/design/d/marquee";
import { ApproachD } from "@/components/design/d/approach";
import { CaseStudiesD } from "@/components/design/d/case-studies";
import { CtaD } from "@/components/design/d/cta";

/* ------------------------------------------------------------------ */
/*  Variant D — Luxury Studio                                          */
/*  Pentagram / IDEO / Koto / Moniker. Warm cream ground, charcoal     */
/*  ink, single terracotta accent. Mixed typographic system: Fraunces  */
/*  serif for display, Geist Sans/Mono for UI and annotations.         */
/* ------------------------------------------------------------------ */

export default function DesignVariantD() {
  return (
    <div
      className={cn(
        fraunces.variable,
        "luxury-studio",
        "relative min-h-screen w-full overflow-x-hidden",
      )}
    >
      <LuxuryCursor />

      <HeroD />

      <LuxuryMarquee />

      <ProblemD />

      <ApproachD />

      <LuxuryMarquee reverse />

      <CaseStudiesD />

      <CtaD />

      {/* Minimal luxury footer */}
      <footer className="relative border-t border-[#1A1A1A]/15 bg-[#F5F2ED] py-10 text-[#1A1A1A]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/60 md:flex-row md:items-center md:px-10">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-[#C4553D]" />
            <span>qawave · 2026</span>
            <span className="text-[#1A1A1A]/30">∙</span>
            <span className="hidden sm:inline">The Edge of QA Automation</span>
          </div>
          <nav className="flex flex-wrap gap-6">
            <a
              href="/contact"
              data-cursor="hover"
              data-cursor-label="Write"
              className="hover:text-[#C4553D]"
            >
              Contact
            </a>
            <a
              href="/case-studies"
              data-cursor="hover"
              data-cursor-label="Read"
              className="hover:text-[#C4553D]"
            >
              Work
            </a>
            <a
              href="/blog"
              data-cursor="hover"
              data-cursor-label="Read"
              className="hover:text-[#C4553D]"
            >
              Journal
            </a>
            <a
              href="/privacy"
              data-cursor="hover"
              data-cursor-label="Read"
              className="hover:text-[#C4553D]"
            >
              Privacy
            </a>
          </nav>
          <span>qawave.ai / variant-d / 0.4</span>
        </div>
      </footer>
    </div>
  );
}
