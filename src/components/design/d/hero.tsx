"use client";

// ============================================================
// Variant D — Hero
// Asymmetric 60/40 split. Huge editorial serif headline on the
// left over warm cream, abstract SVG composition on the right
// that drifts on pointer parallax + scroll.
// ============================================================

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { heroData } from "@/data/landing";
import { AbstractComposition } from "./abstract-composition";
import { MagneticButton } from "./magnetic-button";
import { SweepReveal } from "./reveal";

export function HeroD() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const parallaxY = useSpring(raw, { damping: 30, stiffness: 80, mass: 0.8 });

  useEffect(() => {
    // noop; spring is driven by scroll
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#F5F2ED] text-[#1A1A1A]"
    >
      {/* Top agency label bar */}
      <div className="border-b border-[#1A1A1A]/10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/70">
            <span className="inline-block h-2 w-2 rounded-full bg-[#C4553D]" />
            <span>qawave</span>
            <span className="text-[#1A1A1A]/30">∙</span>
            <span className="hidden sm:inline">QA Automation Consulting</span>
            <span className="hidden text-[#1A1A1A]/30 sm:inline">∙</span>
            <span className="hidden md:inline">Est. 2026</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/70">
            <span className="hidden md:inline">Prague ⇄ Berlin ⇄ London</span>
            <span className="hidden sm:inline text-[#1A1A1A]/30">∙</span>
            <a
              href="#case-studies-d"
              data-cursor="hover"
              data-cursor-label="Index"
              className="hover:text-[#C4553D]"
            >
              Index (0.4)
            </a>
          </div>
        </div>
      </div>

      {/* Main split */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 pb-24 pt-16 md:gap-8 md:px-10 md:pt-24">
        {/* LEFT 60% */}
        <div className="relative col-span-12 lg:col-span-7">
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/60">
            <span className="inline-block h-px w-10 bg-[#C4553D]" />
            <span>(a) Working Note — {heroData.badge}</span>
          </div>

          <h1 className="mt-8 font-[family-name:var(--font-fraunces)] text-[clamp(3.5rem,8.5vw,9rem)] font-[400] leading-[0.94] tracking-[-0.02em]">
            <SweepReveal as="span" className="block">
              The Edge of
            </SweepReveal>
            <SweepReveal
              as="span"
              delay={120}
              className="block italic text-[#C4553D]"
            >
              QA Automation
            </SweepReveal>
          </h1>

          <div className="mt-12 grid grid-cols-12 gap-6">
            <p className="col-span-12 max-w-[54ch] text-base leading-[1.6] text-[#1A1A1A]/75 md:col-span-10 md:text-lg">
              {heroData.subheadline}
            </p>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-5">
            <MagneticButton href={heroData.primaryCta.href} variant="primary">
              {heroData.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </MagneticButton>

            <a
              href={heroData.secondaryCta.href}
              data-cursor="hover"
              data-cursor-label="Browse"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#1A1A1A] hover:text-[#C4553D]"
            >
              <span className="inline-block h-px w-6 bg-current transition-all group-hover:w-10" />
              {heroData.secondaryCta.label}
            </a>
          </div>

          {/* Credibility row */}
          <div className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-[#1A1A1A]/15 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/60">
            <div>
              <div className="mb-2 text-[#1A1A1A]">30+</div>
              <div>Engagements since 2024</div>
            </div>
            <div>
              <div className="mb-2 text-[#1A1A1A]">74%</div>
              <div>Peak pilot coverage</div>
            </div>
            <div>
              <div className="mb-2 text-[#1A1A1A]">€340K/yr</div>
              <div>Avg. client savings</div>
            </div>
          </div>
        </div>

        {/* RIGHT 40% — abstract composition */}
        <div className="relative col-span-12 flex items-start lg:col-span-5">
          <div className="relative ml-auto aspect-[5/6] w-full max-w-[520px] overflow-hidden">
            <motion.div style={{ y: parallaxY }} className="h-full w-full">
              <AbstractComposition
                variant="hero"
                interactive
                className="h-full w-full"
              />
            </motion.div>
            {/* Technical annotations */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
                Fig. 001 / Composition, hero
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
                v 0.4 · Spring 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="mx-auto flex max-w-[1440px] items-end justify-between border-t border-[#1A1A1A]/15 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/60 md:px-10">
        <span>Scroll — read on</span>
        <span>01 / 07</span>
      </div>
    </section>
  );
}

export default HeroD;
