"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { heroData } from "@/data/landing";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Editorial text reveal — blur + clip-path (not just fade/slide)     */
/* ------------------------------------------------------------------ */

const lineReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    clipPath: "inset(0 100% 0 0)",
    y: 8,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    clipPath: "inset(0 0% 0 0)",
    y: 0,
    transition: {
      duration: 1.1,
      delay,
      ease: [0.2, 0.65, 0.3, 1],
    },
  }),
};

const dropCap: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ruleGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { duration: 0.9, delay, ease: "easeOut" },
  }),
};

/* ------------------------------------------------------------------ */
/*  Hero — asymmetric 12-col grid, masthead, drop cap                  */
/* ------------------------------------------------------------------ */

export function EditorialHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Source copy from landing data */
  const headline = heroData.headline;
  const openingLead = heroData.subheadline;
  const dropLetter = openingLead.charAt(0);
  const openingRest = openingLead.slice(1);

  return (
    <section
      id="hero"
      className={cn(
        "relative overflow-hidden pt-14 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40"
      )}
    >
      {/* Masthead top rule */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="h-px w-full origin-left bg-[color:var(--ink-900)]"
          variants={ruleGrow}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          custom={0.1}
        />

        {/* Masthead row: title | date */}
        <div className="mt-4 flex items-start justify-between gap-6 font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink-500)]">
          <motion.div
            variants={lineReveal}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            custom={0.2}
            className="flex items-center gap-3"
          >
            <span className="text-[color:var(--ink-900)]">qawave.ai</span>
            <span aria-hidden>·</span>
            <span>The Edge Review</span>
          </motion.div>

          <motion.div
            variants={lineReveal}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            custom={0.25}
            className="text-right text-[color:var(--ink-500)]"
          >
            <div className="text-[color:var(--ink-900)]">Vol. 01 · 2026</div>
            <div className="mt-0.5">Issue N°01 — Autonomy</div>
          </motion.div>
        </div>

        {/* Top hairline under masthead */}
        <motion.div
          className="mt-3 h-px w-full origin-left bg-[color:var(--ink-200)]"
          variants={ruleGrow}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          custom={0.3}
        />

        {/* Kicker / category line */}
        <motion.p
          variants={lineReveal}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          custom={0.4}
          className="mt-10 font-[family-name:var(--font-editorial-mono)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--accent-red)]"
        >
          § Feature — QA Automation Consulting
        </motion.p>

        {/* Asymmetric grid: headline spans 9/12, subtitle offset right spans 5/12 */}
        <div className="mt-6 grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10">
          {/* Massive serif headline — 9 columns, hanging left */}
          <div className="md:col-span-9">
            <motion.h1
              variants={lineReveal}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              custom={0.55}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)]",
                "text-[clamp(3.25rem,9.5vw,9rem)]",
                "leading-[0.92] tracking-[-0.02em] text-[color:var(--ink-900)]",
                "[font-feature-settings:'liga','dlig','calt','kern']"
              )}
            >
              {headline}
              <span className="text-[color:var(--accent-red)]">.</span>
            </motion.h1>
          </div>

          {/* Right column: italic subtitle, offset, 5 cols, inset from left by 1 col */}
          <div className="md:col-span-5 md:col-start-8 md:-mt-6">
            <motion.p
              variants={lineReveal}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              custom={0.8}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)]",
                "italic",
                "text-[clamp(1.15rem,1.8vw,1.6rem)]",
                "leading-[1.35] text-[color:var(--ink-700)]",
                "border-l border-[color:var(--ink-900)] pl-6"
              )}
            >
              On the discipline of autonomous
              quality — and why the old
              scripts will not save you.
            </motion.p>
          </div>
        </div>

        {/* Thick rule before body */}
        <motion.div
          className="mt-14 h-[2px] w-full origin-left bg-[color:var(--ink-900)]"
          variants={ruleGrow}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          custom={0.9}
        />

        {/* Opening essay block: asymmetric 7+5 */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-12">
          {/* Essay body with drop cap — 7 cols */}
          <div className="md:col-span-7">
            <motion.p
              variants={lineReveal}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              custom={1.0}
              className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.26em] text-[color:var(--ink-500)]"
            >
              Lede · by the qawave editors
            </motion.p>

            <div className="mt-4 flex items-start gap-5">
              <motion.span
                variants={dropCap}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
                className={cn(
                  "font-[family-name:var(--font-editorial-serif)]",
                  "block",
                  "text-[7rem] md:text-[9rem] lg:text-[11rem]",
                  "leading-[0.78]",
                  "-mt-2 -ml-1",
                  "text-[color:var(--accent-red)]",
                  "select-none"
                )}
                aria-hidden
              >
                {dropLetter}
              </motion.span>
              <motion.p
                variants={lineReveal}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
                custom={1.15}
                className={cn(
                  "font-[family-name:var(--font-sans),ui-sans-serif]",
                  "text-[1.05rem] md:text-[1.125rem]",
                  "leading-[1.65] text-[color:var(--ink-800)]"
                )}
              >
                <span className="sr-only">{dropLetter}</span>
                {openingRest}
              </motion.p>
            </div>

            {/* CTA row as newspaper-style inline links */}
            <motion.div
              variants={lineReveal}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              custom={1.35}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <a
                href={heroData.primaryCta.href}
                className={cn(
                  "group inline-flex items-baseline gap-2",
                  "font-[family-name:var(--font-editorial-serif)] italic",
                  "text-[1.25rem] text-[color:var(--ink-900)]",
                  "border-b border-[color:var(--ink-900)] pb-1",
                  "transition-[letter-spacing,color] duration-300",
                  "hover:tracking-[0.01em] hover:text-[color:var(--accent-red)] hover:border-[color:var(--accent-red)]"
                )}
              >
                {heroData.primaryCta.label}
                <span aria-hidden className="translate-y-[-1px] transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={heroData.secondaryCta.href}
                className={cn(
                  "font-[family-name:var(--font-editorial-mono)]",
                  "text-[11px] uppercase tracking-[0.22em]",
                  "text-[color:var(--ink-500)] hover:text-[color:var(--ink-900)]",
                  "transition-colors"
                )}
              >
                {heroData.secondaryCta.label} →
              </a>
            </motion.div>
          </div>

          {/* Right rail — meta data in mono, like a newspaper sidebar */}
          <aside className="md:col-span-4 md:col-start-9">
            <motion.div
              variants={lineReveal}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              custom={1.25}
              className="border-l border-[color:var(--ink-900)] pl-6 font-[family-name:var(--font-editorial-mono)] text-[11px] leading-[1.85] tracking-[0.05em] text-[color:var(--ink-700)]"
            >
              <div className="mb-4 text-[10px] uppercase tracking-[0.26em] text-[color:var(--ink-500)]">
                In this issue
              </div>
              <ul className="space-y-2">
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--accent-red)]">01</span>
                  <span>The quality-tax widening · p. 02</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--accent-red)]">02</span>
                  <span>Three capabilities, one team · p. 03</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--accent-red)]">03</span>
                  <span>Dispatches from the field · p. 04</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="text-[color:var(--accent-red)]">04</span>
                  <span>Correspondence · p. 05</span>
                </li>
              </ul>
              <div className="mt-6 border-t border-[color:var(--ink-200)] pt-4 text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink-500)]">
                Reading time · 7 min
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default EditorialHero;
