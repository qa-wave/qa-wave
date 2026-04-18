"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { problemData, type StatBox } from "@/data/landing";
import { cn } from "@/lib/utils";
import { GridLines } from "./grid-lines";

/* ------------------------------------------------------------------
 * Animated counter — spring-based number that tweens to a target.
 * Accepts decimal targets; clamps to the suffix the data defines.
 * ------------------------------------------------------------------ */

function AnimatedNumber({
  target,
  inView,
  decimals = 0,
}: {
  target: number;
  inView: boolean;
  decimals?: number;
}) {
  const reduceMotion = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  const rounded = useTransform(spring, (v) => {
    const pow = Math.pow(10, decimals);
    return (Math.round(v * pow) / pow).toFixed(decimals);
  });

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      mv.set(target);
    } else {
      mv.set(target);
    }
  }, [inView, target, reduceMotion, mv]);

  return <motion.span>{rounded}</motion.span>;
}

/* ------------------------------------------------------------------
 * Stat card — glassmorphic panel with large mono number,
 * trailing comet glow accent, and offset layout positioning.
 * ------------------------------------------------------------------ */

interface StatCardProps {
  stat: StatBox;
  index: number;
  /** Accent hue in HSL degrees. */
  accentHue: number;
  /** Grid offset class determining diagonal position. */
  offsetClass: string;
}

function StatCard({ stat, index, accentHue, offsetClass }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const displayNumber = stat.numericValue;
  const suffix = stat.suffix;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      transition={{
        duration: 0.9,
        delay: 0.1 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1200 }}
      className={cn("relative", offsetClass)}
    >
      {/* Trailing comet — positioned behind card, extends toward next */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10"
        style={{
          top: "50%",
          left: index === 0 ? "100%" : index === 1 ? "50%" : "0",
          width: "240px",
          height: "180px",
          transform:
            index === 0
              ? "translate(-20%, -40%)"
              : index === 1
                ? "translate(-50%, 40%)"
                : "translate(-80%, -60%)",
          background: `radial-gradient(ellipse at center, hsla(${accentHue}, 92%, 65%, 0.28) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl p-7 md:p-8",
          "border border-white/10 bg-white/[0.04] backdrop-blur-xl",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]",
        )}
        style={{
          boxShadow: `0 0 40px hsla(${accentHue}, 80%, 60%, 0.08)`,
        }}
      >
        {/* Corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, hsla(${accentHue}, 92%, 62%, 0.35) 0%, transparent 65%)`,
            filter: "blur(24px)",
          }}
        />

        {/* Index mono */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            0{index + 1} / 03
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: `hsl(${accentHue}, 85%, 70%)` }}
          >
            ● Gap Signal
          </span>
        </div>

        {/* Huge mono number */}
        <div
          className="mt-5 font-mono text-6xl font-medium leading-none tracking-tight md:text-7xl"
          style={{
            backgroundImage: `linear-gradient(135deg, hsla(${accentHue}, 95%, 80%, 1) 0%, hsla(${accentHue}, 90%, 55%, 1) 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          <AnimatedNumber target={displayNumber} inView={inView} />
          <span className="text-4xl md:text-5xl">{suffix}</span>
        </div>

        {/* Label + supporting text */}
        <div className="mt-6 space-y-3">
          <h3 className="text-base font-semibold leading-snug text-neutral-100 md:text-lg">
            {stat.label}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            {stat.supportingText}
          </p>
        </div>

        {/* Source */}
        {stat.source && (
          <div className="mt-6 border-t border-white/5 pt-4">
            {stat.sourceUrl ? (
              <a
                href={stat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-neutral-500 transition-colors hover:text-neutral-300"
              >
                Source: {stat.source} ↗
              </a>
            ) : (
              <span className="font-mono text-[10px] text-neutral-500">
                Source: {stat.source}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
 * Problem Section — offset diagonal layout
 * ------------------------------------------------------------------ */

export function ProblemC() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  // Diagonal offset on desktop: card1 top-left, card2 middle, card3 bottom-right.
  // Hues chosen to sweep cyan → indigo → magenta across the diagonal.
  const offsets = [
    "md:col-start-1 md:row-start-1",
    "md:col-start-2 md:row-start-2",
    "md:col-start-3 md:row-start-3",
  ];
  const hues = [190, 245, 295]; // cyan, indigo, magenta

  return (
    <section
      id="problem"
      className="relative isolate overflow-hidden py-28 md:py-36"
      style={{ background: "#0B0D12" }}
    >
      <GridLines />

      {/* Soft ambient radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(34,211,238,0.08), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(232,121,249,0.07), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300/80"
          >
            <span className="h-px w-8 bg-cyan-300/40" />
            The Coverage Gap
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-neutral-50 md:text-5xl"
          >
            {problemData.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            {problemData.subheadline}
          </motion.p>
        </div>

        {/* Diagonal stat grid */}
        <div
          className={cn(
            "mt-16 grid gap-6",
            "md:grid-cols-3 md:grid-rows-3 md:gap-8",
          )}
        >
          {problemData.stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              accentHue={hues[i]}
              offsetClass={offsets[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemC;
