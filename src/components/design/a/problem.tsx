"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { problemData } from "@/data/landing";
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
      duration: 0.95,
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
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function EditorialProblem() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted && inView ? "visible" : "hidden";

  return (
    <section
      ref={ref}
      id="problem"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Page number / folio */}
        <div className="flex items-end justify-between">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            § 02 — Dispatch / Industry
          </motion.div>
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.05}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            p. 02
          </motion.div>
        </div>

        {/* Thick top rule */}
        <motion.div
          className="mt-3 h-[2px] w-full origin-left bg-[color:var(--ink-900)]"
          variants={ruleGrow}
          initial="hidden"
          animate={active}
          custom={0.1}
        />

        {/* Headline — 10 cols, generous */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-12">
          <div className="md:col-span-10">
            <motion.h2
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.2}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)]",
                "text-[clamp(2.25rem,5.5vw,5rem)]",
                "leading-[1.02] tracking-[-0.015em]",
                "text-[color:var(--ink-900)]"
              )}
            >
              {problemData.headline}
            </motion.h2>
          </div>
          <aside className="md:col-span-4 md:col-start-9 md:mt-6">
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.35}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)]",
                "italic",
                "text-[1rem] md:text-[1.05rem]",
                "leading-[1.55] text-[color:var(--ink-700)]"
              )}
            >
              {problemData.subheadline}
            </motion.p>
          </aside>
        </div>

        {/* Editorial pull-stats table — 3 columns, hairline-ruled */}
        <div className="mt-20">
          <motion.div
            className="h-px w-full origin-left bg-[color:var(--ink-900)]"
            variants={ruleGrow}
            initial="hidden"
            animate={active}
            custom={0.45}
          />
          <div className="grid grid-cols-1 md:grid-cols-3">
            {problemData.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={cn(
                  "relative px-6 py-10 md:px-8 md:py-14",
                  /* hairline column separators, except last */
                  idx !== 0 && "md:border-l md:border-[color:var(--ink-200)]",
                  /* bottom border on mobile rows */
                  idx !== problemData.stats.length - 1 &&
                    "border-b border-[color:var(--ink-200)] md:border-b-0"
                )}
              >
                {/* Label / kicker */}
                <motion.div
                  variants={blurReveal}
                  initial="hidden"
                  animate={active}
                  custom={0.55 + idx * 0.08}
                  className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
                >
                  Figure {String(idx + 1).padStart(2, "0")}
                </motion.div>

                {/* Massive serif figure */}
                <motion.div
                  variants={statFigure}
                  initial="hidden"
                  animate={active}
                  custom={0.7 + idx * 0.1}
                  className={cn(
                    "mt-4",
                    "font-[family-name:var(--font-editorial-serif)]",
                    "text-[clamp(5rem,11vw,9rem)]",
                    "leading-[0.88] tracking-[-0.03em]",
                    "text-[color:var(--ink-900)]",
                    "[font-variant-numeric:tabular-nums]"
                  )}
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <motion.div
                  variants={blurReveal}
                  initial="hidden"
                  animate={active}
                  custom={0.85 + idx * 0.08}
                  className={cn(
                    "mt-6",
                    "font-[family-name:var(--font-editorial-serif)]",
                    "italic",
                    "text-[1.125rem] md:text-[1.25rem]",
                    "leading-[1.35] text-[color:var(--ink-900)]"
                  )}
                >
                  {stat.label}.
                </motion.div>

                {/* Supporting body copy */}
                <motion.p
                  variants={blurReveal}
                  initial="hidden"
                  animate={active}
                  custom={0.95 + idx * 0.08}
                  className="mt-4 max-w-[34ch] text-[0.9rem] leading-[1.65] text-[color:var(--ink-700)]"
                >
                  {stat.supportingText}
                </motion.p>

                {/* Footnote citation */}
                {stat.source && (
                  <motion.div
                    variants={blurReveal}
                    initial="hidden"
                    animate={active}
                    custom={1.05 + idx * 0.08}
                    className="mt-6 border-t border-[color:var(--ink-200)] pt-3 font-[family-name:var(--font-editorial-mono)] text-[10px] leading-[1.55] tracking-[0.04em] text-[color:var(--ink-500)]"
                  >
                    <span className="align-super text-[9px] text-[color:var(--accent-red)]">
                      [{idx + 1}]
                    </span>{" "}
                    {stat.sourceUrl ? (
                      <a
                        href={stat.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-[color:var(--ink-200)] underline-offset-2 hover:text-[color:var(--ink-900)] hover:decoration-[color:var(--ink-900)]"
                      >
                        {stat.source}
                      </a>
                    ) : (
                      stat.source
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          <motion.div
            className="h-px w-full origin-left bg-[color:var(--ink-900)]"
            variants={ruleGrow}
            initial="hidden"
            animate={active}
            custom={1.15}
          />
        </div>
      </div>
    </section>
  );
}

export default EditorialProblem;
