"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { heroData } from "@/data/landing";
import { cn } from "@/lib/utils";
import { MeshBg } from "./mesh-bg";
import { GridLines } from "./grid-lines";

/* ------------------------------------------------------------------
 * Fake test checks — a suggestive runtime feed, not a real test run.
 * Chosen to feel representative without implying product functionality.
 * ------------------------------------------------------------------ */

const TEST_CHECKS: Array<{ id: string; label: string; duration: string }> = [
  { id: "auth.login", label: "auth.login — email + password flow", duration: "412ms" },
  { id: "cart.add", label: "cart.add_item — SKU variance", duration: "287ms" },
  { id: "checkout", label: "checkout.stripe — 3DS challenge", duration: "1.2s" },
  { id: "profile", label: "profile.update — avatar upload", duration: "603ms" },
  { id: "search.fts", label: "search.fulltext — multi-locale", duration: "198ms" },
  { id: "api.rate", label: "api.rate_limit — 429 handling", duration: "344ms" },
  { id: "a11y.kbd", label: "a11y.keyboard — focus trap", duration: "521ms" },
  { id: "db.tx", label: "db.transaction — rollback safety", duration: "812ms" },
];

const checkReveal: Variants = {
  hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.9 + i * 0.22,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ------------------------------------------------------------------
 * Floating test-run card
 * ------------------------------------------------------------------ */

function TestRunCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
      className={cn(
        "relative mx-auto mt-14 w-full max-w-2xl",
        "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "shadow-[0_0_60px_rgba(34,211,238,0.18),0_0_120px_rgba(99,102,241,0.12)]",
      )}
    >
      {/* Glow border halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.4), rgba(99,102,241,0.3) 40%, rgba(232,121,249,0.25) 80%)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: 1,
        }}
      />

      {/* Title bar — traffic lights + path */}
      <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 truncate font-mono text-[11px] text-neutral-400">
          qawave agent › run #2041 › 8 flows
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5">
          {reduceMotion ? (
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          ) : (
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-200">
            Running
          </span>
        </div>
      </div>

      {/* Check list */}
      <div className="px-5 py-4">
        <ul className="space-y-2.5">
          {TEST_CHECKS.map((check, i) => (
            <motion.li
              key={check.id}
              custom={i}
              variants={checkReveal}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 font-mono text-[13px]"
            >
              <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/40">
                <Check className="h-3 w-3 text-emerald-300" strokeWidth={3} />
              </span>
              <span className="min-w-0 flex-1 truncate text-neutral-200">
                {check.label}
              </span>
              <span className="flex-none text-[11px] text-neutral-500">
                {check.duration}
              </span>
            </motion.li>
          ))}

          {/* Running line */}
          <motion.li
            variants={checkReveal}
            custom={TEST_CHECKS.length}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 font-mono text-[13px]"
          >
            <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/40">
              {reduceMotion ? (
                <Loader2 className="h-3 w-3 text-cyan-300" strokeWidth={2.5} />
              ) : (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Loader2 className="h-3 w-3 text-cyan-300" strokeWidth={2.5} />
                </motion.span>
              )}
            </span>
            <span className="min-w-0 flex-1 truncate text-cyan-100/80">
              billing.invoice — prorated adjustment
            </span>
            <span className="flex-none text-[11px] text-cyan-300/70">…</span>
          </motion.li>
        </ul>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-t border-white/5 px-5 py-2.5 font-mono text-[11px] text-neutral-500">
        <span>8 passed · 0 failed · 1 running</span>
        <span className="text-neutral-600">autonomous discovery · live</span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
 * Hero Section
 * ------------------------------------------------------------------ */

export function HeroC() {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[92vh] items-start overflow-hidden pt-28 md:pt-36",
      )}
      style={{ background: "#0B0D12" }}
    >
      {/* Backdrop layers */}
      <MeshBg />
      <GridLines />

      {/* Vignette so content pops */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 35%, rgba(11,13,18,0.9) 90%)",
        }}
      />

      <div
        className={cn(
          "relative mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8",
        )}
      >
        {/* Status badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-sm"
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
            {heroData.badge}
          </span>
        </motion.div>

        {/* Headline with gradient */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.12}
          className={cn(
            "mt-8 text-balance text-5xl font-semibold leading-[1.02] tracking-tight",
            "md:text-7xl lg:text-[88px]",
          )}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #E0F2FE 0%, #22D3EE 30%, #6366F1 65%, #E879F9 100%)",
            }}
          >
            {heroData.headline}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          {heroData.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.38}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href={heroData.primaryCta.href}
            data-track={heroData.primaryCta.trackingEvent}
            className={cn(
              "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
              "rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-950",
              "transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]",
            )}
            style={{
              background:
                "linear-gradient(120deg, #A5F3FC 0%, #22D3EE 40%, #6366F1 100%)",
              boxShadow:
                "0 0 30px rgba(34,211,238,0.35), 0 0 60px rgba(99,102,241,0.18)",
            }}
          >
            <span className="relative z-10">{heroData.primaryCta.label}</span>
            <ArrowRight
              className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </a>
          <a
            href={heroData.secondaryCta.href}
            data-track={heroData.secondaryCta.trackingEvent}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold",
              "border border-white/15 bg-white/[0.03] text-neutral-200 backdrop-blur-sm",
              "hover:border-white/30 hover:bg-white/[0.06] transition-all duration-200",
            )}
          >
            {heroData.secondaryCta.label}
          </a>
        </motion.div>

        {/* Floating test-run card */}
        <TestRunCard />
      </div>
    </section>
  );
}

export default HeroC;
