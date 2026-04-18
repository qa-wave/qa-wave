"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Landmark,
  ShoppingCart,
  HeartPulse,
  ArrowLeft,
  ArrowRight,
  Quote,
} from "lucide-react";
import { caseStudiesData, type CaseStudy } from "@/data/landing";
import { cn } from "@/lib/utils";
import { GridLines } from "./grid-lines";

const iconMap: Record<string, React.ElementType> = {
  Landmark,
  ShoppingCart,
  HeartPulse,
};

const hueMap: Record<string, number> = {
  Landmark: 200, // cyan-lean
  ShoppingCart: 245, // indigo
  HeartPulse: 320, // magenta-pink
};

/* ------------------------------------------------------------------
 * Single case-study panel
 * ------------------------------------------------------------------ */

interface PanelProps {
  study: CaseStudy;
  index: number;
}

function CasePanel({ study, index }: PanelProps) {
  const Icon = iconMap[study.icon] ?? Landmark;
  const hue = hueMap[study.icon] ?? 220;

  return (
    <article
      className={cn(
        "group relative flex w-[86vw] max-w-[560px] flex-none snap-start",
        "flex-col overflow-hidden rounded-3xl p-6 md:w-[560px] md:p-8",
        "border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]",
      )}
      style={{ minHeight: 560 }}
    >
      {/* Hover border gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from ${index * 120}deg at 50% 50%, hsla(${hue}, 92%, 70%, 0.4), hsla(${hue + 40}, 85%, 62%, 0.25) 40%, transparent 70%, hsla(${hue}, 92%, 70%, 0.4))`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: 1,
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, hsla(${hue}, 92%, 62%, 0.28) 0%, transparent 65%)`,
          filter: "blur(24px)",
        }}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border"
          style={{
            borderColor: `hsla(${hue}, 90%, 65%, 0.4)`,
            background: `hsla(${hue}, 90%, 55%, 0.14)`,
            color: `hsl(${hue}, 90%, 78%)`,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            Case 0{index + 1} / 0{caseStudiesData.studies.length}
          </span>
          <span
            className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: `hsl(${hue}, 88%, 78%)` }}
          >
            {study.industry}
          </span>
        </div>
      </div>

      {/* Company description */}
      <p className="relative mt-5 text-sm leading-relaxed text-neutral-400">
        {study.companyDescription}
      </p>

      {/* Challenge */}
      <div className="relative mt-6 space-y-1.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Challenge
        </div>
        <p className="text-[13px] leading-relaxed text-neutral-300">
          {study.challenge}
        </p>
      </div>

      {/* Approach */}
      <div className="relative mt-4 space-y-1.5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Approach
        </div>
        <p className="text-[13px] leading-relaxed text-neutral-300">
          {study.approach}
        </p>
      </div>

      {/* Results — 3 monospace neon metrics */}
      <div className="relative mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
        {study.results.map((r) => (
          <div key={r.label} className="min-w-0">
            <div
              className="truncate font-mono text-xl font-medium leading-none tracking-tight md:text-2xl"
              style={{
                backgroundImage: `linear-gradient(135deg, hsla(${hue}, 95%, 82%, 1) 0%, hsla(${hue}, 90%, 55%, 1) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textShadow: `0 0 20px hsla(${hue}, 92%, 60%, 0.35)`,
              }}
            >
              {r.metric}
            </div>
            <div className="mt-1.5 text-[10px] leading-tight text-neutral-500">
              {r.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      {study.quote && (
        <blockquote className="relative mt-auto pt-6">
          <Quote
            className="h-5 w-5 opacity-40"
            style={{ color: `hsl(${hue}, 90%, 72%)` }}
            strokeWidth={1.8}
          />
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-200 italic">
            &ldquo;{study.quote}&rdquo;
          </p>
          {study.quoteAttribution && (
            <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              — {study.quoteAttribution}
            </footer>
          )}
        </blockquote>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------
 * Case Studies Section — horizontal scroll carousel
 * ------------------------------------------------------------------ */

export function CaseStudiesC() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Update nav enabled state as user scrolls
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll by roughly one card width + gap
    const amount = Math.min(580, el.clientWidth * 0.9) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      id="case-studies"
      className="relative isolate overflow-hidden py-28 md:py-36"
      style={{ background: "#0B0D12" }}
    >
      <GridLines />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.08), transparent 50%)",
        }}
      />

      <div className="relative">
        {/* Header + nav — contained */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={headingRef} className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fuchsia-300/80"
              >
                <span className="h-px w-8 bg-fuchsia-300/40" />
                Selected Engagements
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.8,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-neutral-50 md:text-5xl"
              >
                {caseStudiesData.headline}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.8,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-5 text-base leading-relaxed text-neutral-400 md:text-lg"
              >
                {caseStudiesData.subheadline}
              </motion.p>
            </div>

            {/* Nav */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous case study"
                onClick={() => scrollBy(-1)}
                disabled={!canPrev}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full",
                  "border border-white/15 bg-white/[0.03] text-neutral-300 backdrop-blur-sm",
                  "transition-all duration-200",
                  "hover:border-white/30 hover:bg-white/[0.08] hover:text-neutral-50",
                  "disabled:cursor-not-allowed disabled:opacity-30",
                )}
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label="Next case study"
                onClick={() => scrollBy(1)}
                disabled={!canNext}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full",
                  "border border-cyan-400/30 text-neutral-900",
                  "transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30",
                )}
                style={{
                  background:
                    "linear-gradient(120deg, #A5F3FC 0%, #22D3EE 50%, #6366F1 100%)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.35)",
                }}
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroller */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.8,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-12"
        >
          {/* Edge fade masks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0B0D12] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0B0D12] to-transparent"
          />

          <div
            ref={scrollerRef}
            className={cn(
              "flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8",
              // Custom scrollbar styling via utility is limited; keep default but hidden via class below
              "scroll-smooth",
            )}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Left spacer to keep first card aligned with container on wide viewports */}
            <div aria-hidden className="hidden lg:block lg:w-[calc((100vw-72rem)/2)]" />

            {caseStudiesData.studies.map((study, i) => (
              <CasePanel key={study.industry} study={study} index={i} />
            ))}

            {/* Right spacer */}
            <div aria-hidden className="hidden lg:block lg:w-[calc((100vw-72rem)/2)]" />
          </div>

          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}

export default CaseStudiesC;
