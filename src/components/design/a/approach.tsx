"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { uvpData, socialProofData } from "@/data/landing";
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

const dropCap: Variants = {
  hidden: { opacity: 0, scale: 0.55, y: 10 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
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

const ROMAN = ["I", "II", "III"];

function Chapter({
  pillar,
  index,
  total,
}: {
  pillar: (typeof uvpData.pillars)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted && inView ? "visible" : "hidden";
  const dropLetter = pillar.description.charAt(0);
  const descriptionRest = pillar.description.slice(1);

  return (
    <article
      ref={ref}
      className={cn(
        "py-20 md:py-24",
        index !== total - 1 && "border-b border-[color:var(--ink-200)]"
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Chapter header row */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-12 md:items-baseline">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0}
            className={cn(
              "md:col-span-2",
              "font-[family-name:var(--font-editorial-mono)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--accent-red)]"
            )}
          >
            Chapter {ROMAN[index]}
          </motion.div>

          <div className="md:col-span-10">
            <motion.h3
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.1}
              className={cn(
                "font-[family-name:var(--font-editorial-serif)]",
                "text-[clamp(2.5rem,6.5vw,6rem)]",
                "leading-[0.96] tracking-[-0.02em]",
                "text-[color:var(--ink-900)]"
              )}
            >
              {pillar.headline}
              <span className="text-[color:var(--ink-400)]">.</span>
            </motion.h3>
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.25}
              className={cn(
                "mt-4",
                "font-[family-name:var(--font-editorial-serif)] italic",
                "text-[clamp(1.125rem,1.8vw,1.55rem)]",
                "leading-[1.35] text-[color:var(--ink-700)]"
              )}
            >
              {pillar.tagline}
            </motion.p>
          </div>
        </div>

        {/* Long rule under header */}
        <motion.div
          className="mt-10 h-px w-full origin-left bg-[color:var(--ink-900)]"
          variants={ruleGrow}
          initial="hidden"
          animate={active}
          custom={0.3}
        />

        {/* Body: 7 cols essay with drop cap + 5 cols bullet footnotes */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-12">
          {/* Essay body with drop cap */}
          <div className="md:col-span-7">
            <div className="flex items-start gap-5">
              <motion.span
                variants={dropCap}
                initial="hidden"
                animate={active}
                custom={0.45}
                className={cn(
                  "font-[family-name:var(--font-editorial-serif)]",
                  "block",
                  "text-[6rem] md:text-[8.5rem]",
                  "leading-[0.78]",
                  "-mt-2 -ml-1",
                  "text-[color:var(--ink-900)]",
                  "select-none"
                )}
                aria-hidden
              >
                {dropLetter}
              </motion.span>
              <motion.p
                variants={blurReveal}
                initial="hidden"
                animate={active}
                custom={0.55}
                className={cn(
                  "text-[1.05rem] md:text-[1.125rem]",
                  "leading-[1.7] text-[color:var(--ink-800)]"
                )}
              >
                <span className="sr-only">{dropLetter}</span>
                {descriptionRest}
              </motion.p>
            </div>

            {/* Read more inline link */}
            <motion.div
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.75}
              className="mt-8 border-t border-[color:var(--ink-200)] pt-4"
            >
              <a
                href={pillar.href}
                className={cn(
                  "inline-flex items-baseline gap-2",
                  "font-[family-name:var(--font-editorial-serif)] italic",
                  "text-[1.05rem] text-[color:var(--ink-900)]",
                  "border-b border-[color:var(--ink-900)] pb-0.5",
                  "transition-colors",
                  "hover:text-[color:var(--accent-red)] hover:border-[color:var(--accent-red)]"
                )}
              >
                Continue reading — {pillar.headline}
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>

          {/* Annotated bullets column */}
          <ol className="md:col-span-5 md:col-start-8">
            <motion.div
              variants={blurReveal}
              initial="hidden"
              animate={active}
              custom={0.55}
              className="mb-4 font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
            >
              Marginalia — notes from the field
            </motion.div>
            {pillar.bullets.map((bullet, bIdx) => (
              <motion.li
                key={bullet.bold}
                variants={blurReveal}
                initial="hidden"
                animate={active}
                custom={0.65 + bIdx * 0.08}
                className={cn(
                  "flex items-baseline gap-4 py-4",
                  bIdx !== pillar.bullets.length - 1 &&
                    "border-b border-[color:var(--ink-200)]"
                )}
              >
                <span
                  className={cn(
                    "font-[family-name:var(--font-editorial-mono)]",
                    "text-[10px] uppercase tracking-[0.2em]",
                    "text-[color:var(--accent-red)]",
                    "w-8 shrink-0 pt-1"
                  )}
                >
                  {String(bIdx + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "block",
                      "font-[family-name:var(--font-editorial-serif)]",
                      "text-[1.125rem] leading-[1.3] text-[color:var(--ink-900)]"
                    )}
                  >
                    {bullet.bold}.
                  </span>
                  <span className="mt-1 block text-[0.92rem] leading-[1.6] text-[color:var(--ink-700)]">
                    {bullet.text}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Pull quote between Chapters I and II                               */
/* ------------------------------------------------------------------ */

function PullQuote() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted && inView ? "visible" : "hidden";

  return (
    <div ref={ref} className="border-b border-[color:var(--ink-200)] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <motion.blockquote
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.1}
            className={cn(
              "md:col-span-9 md:col-start-3",
              "font-[family-name:var(--font-editorial-serif)] italic",
              "text-[clamp(1.75rem,4vw,3.5rem)]",
              "leading-[1.18] tracking-[-0.01em]",
              "text-[color:var(--ink-900)]"
            )}
          >
            <span className="text-[color:var(--accent-red)]">“</span>
            {socialProofData.testimonial.quote}
            <span className="text-[color:var(--accent-red)]">”</span>
          </motion.blockquote>
          <motion.figcaption
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.3}
            className={cn(
              "md:col-span-9 md:col-start-3",
              "mt-8 flex items-baseline gap-4",
              "font-[family-name:var(--font-editorial-mono)]",
              "text-[11px] uppercase tracking-[0.22em] text-[color:var(--ink-500)]"
            )}
          >
            <span className="h-px w-10 bg-[color:var(--ink-900)]" aria-hidden />
            <span>
              <span className="text-[color:var(--ink-900)]">
                {socialProofData.testimonial.author}
              </span>{" "}
              · {socialProofData.testimonial.company}
            </span>
          </motion.figcaption>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Approach — three numbered chapters                                  */
/* ------------------------------------------------------------------ */

export function EditorialApproach() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active = mounted && inView ? "visible" : "hidden";

  return (
    <section id="approach" className="relative pt-24 md:pt-32 lg:pt-40">
      <div ref={headerRef} className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="flex items-end justify-between">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            § 03 — The Approach / In Three Chapters
          </motion.div>
          <motion.div
            variants={blurReveal}
            initial="hidden"
            animate={active}
            custom={0.05}
            className="font-[family-name:var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--ink-500)]"
          >
            p. 03
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
              {uvpData.headline}
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
              {uvpData.subheadline}
            </motion.p>
          </aside>
        </div>
      </div>

      {/* Chapter I */}
      <Chapter pillar={uvpData.pillars[0]} index={0} total={uvpData.pillars.length} />

      {/* Pull quote break */}
      <PullQuote />

      {/* Chapter II */}
      <Chapter pillar={uvpData.pillars[1]} index={1} total={uvpData.pillars.length} />

      {/* Chapter III */}
      <Chapter pillar={uvpData.pillars[2]} index={2} total={uvpData.pillars.length} />
    </section>
  );
}

export default EditorialApproach;
