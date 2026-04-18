"use client";

// ============================================================
// Variant D — CTA
// Full-bleed warm gradient with a massive centered serif
// headline, a single primary magnetic button, and an email
// text link. Quiet, confident, finisher.
// ============================================================

import { ArrowUpRight } from "lucide-react";
import { ctaData } from "@/data/landing";
import { MagneticButton } from "./magnetic-button";
import { SweepReveal } from "./reveal";

export function CtaD() {
  return (
    <section
      id="cta-d"
      className="relative overflow-hidden bg-gradient-to-br from-[#F5F2ED] via-[#EFE3D1] to-[#E8BFA6] py-40 text-[#1A1A1A]"
    >
      {/* Decorative arch */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
        <svg
          viewBox="0 0 1200 600"
          className="h-[70%] w-full"
          aria-hidden
          preserveAspectRatio="xMidYEnd slice"
        >
          <defs>
            <linearGradient id="cta-arch" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C4553D" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C4553D" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path
            d="M 0 600 L 0 380 A 600 380 0 0 1 1200 380 L 1200 600 Z"
            fill="url(#cta-arch)"
          />
          <circle
            cx="140"
            cy="180"
            r="42"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="0.75"
            opacity="0.3"
          />
          <circle cx="1060" cy="140" r="22" fill="#1A1A1A" opacity="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/60">
            <span className="inline-block h-px w-10 bg-[#C4553D]" />
            <span>Let’s work together · 005</span>
            <span className="inline-block h-px w-10 bg-[#C4553D]" />
          </div>

          <SweepReveal
            as="h2"
            className="mt-10 max-w-[16ch] font-[family-name:var(--font-fraunces)] text-[clamp(3rem,8vw,8rem)] font-[400] leading-[0.95] tracking-[-0.02em]"
          >
            Let’s build{" "}
            <span className="italic text-[#C4553D]">quality</span> together.
          </SweepReveal>

          <p className="mt-10 max-w-[54ch] text-base leading-[1.65] text-[#1A1A1A]/75 md:text-lg">
            {ctaData.subheadline}
          </p>

          <div className="mt-14 flex flex-col items-center gap-8">
            <MagneticButton href={ctaData.primaryCta.href} variant="primary">
              {ctaData.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </MagneticButton>

            <a
              href="mailto:hello@qawave.ai"
              data-cursor="hover"
              data-cursor-label="Email"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A] hover:text-[#C4553D]"
            >
              <span className="inline-block h-px w-6 bg-current transition-all group-hover:w-10" />
              or write · hello@qawave.ai
            </a>
          </div>

          {/* Signature */}
          <div className="mt-24 grid w-full max-w-4xl grid-cols-2 gap-6 border-t border-[#1A1A1A]/20 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/60 md:grid-cols-4">
            <div>
              <div className="text-[#1A1A1A]">qawave studio</div>
              <div className="mt-1">Prague · Est. 2026</div>
            </div>
            <div>
              <div className="text-[#1A1A1A]">Response</div>
              <div className="mt-1">Under 48 hours</div>
            </div>
            <div>
              <div className="text-[#1A1A1A]">Engagement</div>
              <div className="mt-1">Pilot · 4 wk</div>
            </div>
            <div>
              <div className="text-[#1A1A1A]">Minimum</div>
              <div className="mt-1">None for discovery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaD;
