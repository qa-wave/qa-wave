"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ctaData } from "@/data/landing";
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
      duration: 1.05,
      delay,
      ease: [0.2, 0.65, 0.3, 1],
    },
  }),
};

const ruleGrow: Variants = {
  hidden: { scaleX: 0, originX: 0.5 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { duration: 1.1, delay, ease: "easeOut" },
  }),
};

export function EditorialCta() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted && inView ? "visible" : "hidden";

  return (
    <section ref={ref} id="contact" className="relative py-28 md:py-40 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Section masthead */}
        <div className="flex items-end justify-between">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            § 05 — Correspondence
          </motion.div>
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.05}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            p. 05
          </motion.div>
        </div>
        <motion.div
          className="mt-3 h-[2px] w-full bg-[color:var(--ink-900)]"
          style={{ originX: 0 }}
          variants={{
            hidden: { scaleX: 0 },
            visible: (delay: number) => ({
              scaleX: 1,
              transition: { duration: 0.9, delay, ease: "easeOut" },
            }),
          }}
          initial="hidden"
          animate={active}
          custom={0.1}
        />

        {/* Centered editorial headline */}
        <div className="mt-20 text-center">
          <motion.div
            className="mx-auto h-px w-20 origin-center bg-[color:var(--accent-red)]"
            variants={ruleGrow}
            initial="hidden"
            animate={active}
            custom={0.2}
          />
          <motion.p
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.3}
            className="mt-6 font-[family-name:var(--font-editorial-mono)] text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent-red)]"
          >
            The Final Word
          </motion.p>
          <motion.h2
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.4}
            className={cn(
              "mx-auto mt-8 max-w-[18ch]",
              "font-[family-name:var(--font-editorial-serif)]",
              "text-[clamp(2.75rem,7vw,6.5rem)]",
              "leading-[0.98] tracking-[-0.02em]",
              "text-[color:var(--ink-900)]"
            )}
          >
            {ctaData.headline}
          </motion.h2>

          <motion.p
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.55}
            className={cn(
              "mx-auto mt-8 max-w-[58ch]",
              "font-[family-name:var(--font-editorial-serif)] italic",
              "text-[clamp(1.05rem,1.5vw,1.35rem)]",
              "leading-[1.55] text-[color:var(--ink-700)]"
            )}
          >
            {ctaData.subheadline}
          </motion.p>

          {/* Newspaper "continue reading" style CTA */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.7}
            className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
          >
            <a
              href={ctaData.primaryCta.href}
              className={cn(
                "group inline-flex items-baseline gap-3",
                "font-[family-name:var(--font-editorial-serif)] italic",
                "text-[clamp(1.25rem,2vw,1.75rem)] text-[color:var(--ink-900)]",
                "border-b-2 border-[color:var(--ink-900)] pb-1.5",
                "transition-[letter-spacing,color,border-color] duration-300",
                "hover:tracking-[0.01em] hover:text-[color:var(--accent-red)] hover:border-[color:var(--accent-red)]"
              )}
            >
              {ctaData.primaryCta.label}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href={ctaData.secondaryCta.href}
              className={cn(
                "font-[family-name:var(--font-editorial-mono)]",
                "text-[11px] uppercase tracking-[0.28em]",
                "text-[color:var(--ink-500)] hover:text-[color:var(--ink-900)]",
                "transition-colors"
              )}
            >
              {ctaData.secondaryCta.label}
            </a>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 h-px w-32 origin-center bg-[color:var(--ink-200)]"
            variants={ruleGrow}
            initial="hidden"
            animate={active}
            custom={0.9}
          />

          {/* Colophon footer */}
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={1}
            className="mt-8 font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            — End of Vol. 01 · qawave.ai · 2026 —
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EditorialCta;
