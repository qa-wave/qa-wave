"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type MouseEvent,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ctaData } from "@/data/landing";
import { cn } from "@/lib/utils";
import { MeshBg } from "./mesh-bg";
import { GridLines } from "./grid-lines";

/* ------------------------------------------------------------------
 * Magnetic button — position tracks the cursor within a bounded range.
 * Range is clamped so it never drifts far enough to feel broken.
 * ------------------------------------------------------------------ */

interface MagneticButtonProps {
  href: string;
  trackingEvent?: string;
  children: React.ReactNode;
  className?: string;
  /** Max distance in px the button can translate. */
  strength?: number;
  /** Distance from center at which magnet engages, in px. */
  radius?: number;
}

function MagneticButton({
  href,
  trackingEvent,
  children,
  className,
  strength = 18,
  radius = 140,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMove = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius) {
        setPos({ x: 0, y: 0 });
        return;
      }
      // Falloff so motion is strongest near edges, subtle near center
      const falloff = 1 - dist / radius;
      const scale = (strength / radius) * falloff;
      setPos({ x: dx * scale, y: dy * scale });
    },
    [radius, strength, reduceMotion],
  );

  const reset = useCallback(() => setPos({ x: 0, y: 0 }), []);

  // Also release on scroll — pointerleave doesn't always fire
  useEffect(() => {
    if (reduceMotion) return;
    const onScroll = () => setPos({ x: 0, y: 0 });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion]);

  return (
    <motion.a
      ref={ref}
      href={href}
      data-track={trackingEvent}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={pos}
      transition={{ type: "spring", stiffness: 140, damping: 14, mass: 0.3 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden",
        "rounded-full px-10 py-5 text-base font-semibold text-neutral-950",
        "transition-transform duration-150 active:scale-[0.97]",
        className,
      )}
      style={{
        background:
          "linear-gradient(120deg, #A5F3FC 0%, #22D3EE 35%, #6366F1 85%)",
        boxShadow:
          "0 0 40px rgba(34,211,238,0.45), 0 0 80px rgba(99,102,241,0.25)",
      }}
    >
      {/* Inner shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
        }}
      />
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
        strokeWidth={2.5}
      />
    </motion.a>
  );
}

/* ------------------------------------------------------------------
 * CTA Section
 * ------------------------------------------------------------------ */

export function CtaC() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden py-28 md:py-40"
      style={{ background: "#0B0D12" }}
    >
      <MeshBg intensity={1.2} />
      <GridLines opacity={0.05} />

      {/* Center spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.12) 0%, transparent 60%)",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <motion.span
              className="absolute inset-0 rounded-full bg-cyan-400"
              animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300">
            Discovery Call · 30 min · No Commitment
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mt-8 text-balance text-4xl font-semibold leading-[1.04] tracking-tight",
            "md:text-6xl lg:text-7xl",
          )}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #F5FBFF 0%, #22D3EE 35%, #6366F1 70%, #E879F9 100%)",
            }}
          >
            {ctaData.headline}
          </span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          {ctaData.subheadline}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <MagneticButton
            href={ctaData.primaryCta.href}
            trackingEvent={ctaData.primaryCta.trackingEvent}
          >
            {ctaData.primaryCta.label}
          </MagneticButton>
          <a
            href={ctaData.secondaryCta.href}
            data-track={ctaData.secondaryCta.trackingEvent}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold",
              "border border-white/15 bg-white/[0.03] text-neutral-200 backdrop-blur-sm",
              "hover:border-white/30 hover:bg-white/[0.08] transition-all duration-200",
            )}
          >
            {ctaData.secondaryCta.label}
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            SOC 2 Aligned
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            ISO 27001 Compatible
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            Exit-Ready Artifacts
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaC;
