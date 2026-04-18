"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { caseStudiesData } from "@/data/landing";
import type { CaseStudy } from "@/data/landing";
import { cn } from "@/lib/utils";

const blurReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(6px)",
    clipPath: "inset(0 100% 0 0)",
    y: 10,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    clipPath: "inset(0 0% 0 0)",
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.2, 0.65, 0.3, 1],
    },
  }),
};

const ruleGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const statFigure: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Single case study — full-width masthead, 2-col body, pull-stats    */
/* ------------------------------------------------------------------ */

function CaseArticle({
  study,
  index,
  isLast,
}: {
  study: CaseStudy;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted && inView ? "visible" : "hidden";

  return (
    <article
      ref={ref}
      className={cn(
        "relative py-20 md:py-24",
        !isLast && "border-b border-[color:var(--ink-200)]"
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Case masthead — industry tag + case number */}
        <div className="flex items-end justify-between">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0}
            className={cn(
              "font-[family-name:var(--font-editorial-mono)]",
              "text-[10px] uppercase tracking-[0.28em]",
              "text-[color:var(--accent-red)]"
            )}
          >
            Case {String(index + 1).padStart(2, "0")} — {study.industry}
          </motion.div>
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.05}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.22em] text-[color:var(--ink-500)]"
          >
            Dispatch from the field
          </motion.div>
        </div>
        <motion.div
          className="mt-3 h-[2px] w-full origin-left bg-[color:var(--ink-900)]"
          variants={ruleGrow}
          initial="hidden"
          animate={active}
          custom={0.1}
        />

        {/* Full-width headline = company description as editorial dek */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-12">
          <div className="md:col-span-11">
            <motion.h3
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.2}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)]",
                "text-[clamp(2rem,4.5vw,4rem)]",
                "leading-[1.05] tracking-[-0.015em]",
                "text-[color:var(--ink-900)]"
              )}
            >
              {study.companyDescription}
            </motion.h3>
          </div>
        </div>

        {/* Two-column body: challenge | approach */}
        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <motion.div
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.3}
              className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
            >
              The Challenge
            </motion.div>
            <motion.div
              className="mt-3 h-px w-12 origin-left bg-[color:var(--accent-red)]"
              variants={ruleGrow}
              initial="hidden"
              animate={active}
              custom={0.35}
            />
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.45}
              className={cn(
                "mt-6",
                "font-[family-name:var(--font-editorial-serif)]",
                "text-[1.125rem] md:text-[1.25rem]",
                "leading-[1.55] text-[color:var(--ink-800)]"
              )}
            >
              {study.challenge}
            </motion.p>
          </div>
          <div className="md:col-span-6">
            <motion.div
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.35}
              className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
            >
              The Approach
            </motion.div>
            <motion.div
              className="mt-3 h-px w-12 origin-left bg-[color:var(--ink-900)]"
              variants={ruleGrow}
              initial="hidden"
              animate={active}
              custom={0.4}
            />
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.5}
              className={cn(
                "mt-6",
                "text-[1.05rem] leading-[1.7] text-[color:var(--ink-800)]"
              )}
            >
              {study.approach}
            </motion.p>
          </div>
        </div>

        {/* Results — editorial pull-stats row */}
        <div className="mt-14">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.55}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            Outcomes — in figures
          </motion.div>
          <motion.div
            className="mt-3 h-px w-full origin-left bg-[color:var(--ink-900)]"
            variants={ruleGrow}
            initial="hidden"
            animate={active}
            custom={0.6}
          />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {study.results.map((result, rIdx) => (
              <div
                key={result.label}
                className={cn(
                  "px-2 py-8 md:px-6 md:py-10",
                  rIdx !== 0 && "md:border-l md:border-[color:var(--ink-200)]",
                  rIdx !== study.results.length - 1 &&
                    "border-b border-[color:var(--ink-200)] md:border-b-0"
                )}
              >
                <motion.div
                  variants={statFigure}
                  initial="hidden"
                  animate={active}
                  custom={0.7 + rIdx * 0.08}
                  className={cn(
                    "font-[family-name:var(--font-editorial-serif)]",
                    "text-[clamp(2.75rem,6vw,5rem)]",
                    "leading-[0.9] tracking-[-0.02em]",
                    "text-[color:var(--ink-900)]",
                    "[font-variant-numeric:tabular-nums]"
                  )}
                >
                  {result.metric}
                </motion.div>
                <motion.div
                  variants={blurReveal}
                  initial="hidden"
                  animate={active}
                  custom={0.82 + rIdx * 0.08}
                  className={cn(
                    "mt-4",
                    "font-[family-name:var(--font-editorial-mono)]",
                    "text-[11px] uppercase tracking-[0.22em]",
                    "text-[color:var(--ink-500)]"
                  )}
                >
                  {result.label}
                </motion.div>
              </div>
            ))}
          </div>
          <motion.div
            className="h-px w-full origin-left bg-[color:var(--ink-900)]"
            variants={ruleGrow}
            initial="hidden"
            animate={active}
            custom={1}
          />
        </div>

        {/* Pull quote (optional) */}
        {study.quote && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12">
            <motion.blockquote
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={1.1}
              className={cn(
                "md:col-span-9 md:col-start-3",
                "font-[family-name:var(--font-editorial-serif)] italic",
                "text-[clamp(1.25rem,2.5vw,2rem)]",
                "leading-[1.3] text-[color:var(--ink-900)]"
              )}
            >
              <span className="text-[color:var(--accent-red)]">“</span>
              {study.quote}
              <span className="text-[color:var(--accent-red)]">”</span>
            </motion.blockquote>
            {study.quoteAttribution && (
              <motion.figcaption
                variants={blurReveal}
                initial="hidden"
                animate={active}
                custom={1.2}
                className={cn(
                  "md:col-span-9 md:col-start-3",
                  "mt-6 flex items-baseline gap-4",
                  "font-[family-name:var(--font-editorial-mono)]",
                  "text-[11px] uppercase tracking-[0.22em]",
                  "text-[color:var(--ink-500)]"
                )}
              >
                <span className="h-px w-8 bg-[color:var(--ink-900)]" aria-hidden />
                <span>{study.quoteAttribution}</span>
              </motion.figcaption>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Case Studies — section wrapper                                      */
/* ------------------------------------------------------------------ */

export function EditorialCaseStudies() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted && inView ? "visible" : "hidden";

  return (
    <section id="case-studies" className="relative pt-24 md:pt-32 lg:pt-40">
      <div ref={headerRef} className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="flex items-end justify-between">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            § 04 — Field Notes / From Engagements
          </motion.div>
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.05}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            p. 04
          </motion.div>
        </div>
        <motion.div
          className="mt-3 h-[2px] w-full origin-left bg-[color:var(--ink-900)]"
          variants={ruleGrow}
          initial="hidden"
          animate={active}
          custom={0.1}
        />

        <div className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-12">
          <div className="md:col-span-9">
            <motion.h2
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.2}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)]",
                "text-[clamp(2.5rem,6vw,5.5rem)]",
                "leading-[1] tracking-[-0.02em]",
                "text-[color:var(--ink-900)]"
              )}
            >
              {caseStudiesData.headline}
            </motion.h2>
          </div>
          <aside className="md:col-span-4 md:col-start-9 md:mt-6">
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.35}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)] italic",
                "text-[1rem] md:text-[1.05rem]",
                "leading-[1.55] text-[color:var(--ink-700)]"
              )}
            >
              {caseStudiesData.subheadline}
            </motion.p>
          </aside>
        </div>
      </div>

      <div className="mt-16">
        {caseStudiesData.studies.map((study, idx) => (
          <CaseArticle
            key={study.industry}
            study={study}
            index={idx}
            isLast={idx === caseStudiesData.studies.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default EditorialCaseStudies;
