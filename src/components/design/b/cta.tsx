"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ctaData } from "@/data/landing";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  CTA — simple horizontal bar at bottom. Terminal prompt style.      */
/* ------------------------------------------------------------------ */

export function Cta() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="cta"
      ref={ref}
      className={cn(
        "relative w-full border-b border-[rgba(255,255,255,0.08)] bg-black",
        "px-6 py-20 md:px-10 lg:px-16 lg:py-28",
      )}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section header */}
        <div className="mb-10 lg:mb-14">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#555]">
              05
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#888]">
              book.call
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={cn(
              "mt-6 max-w-[820px] font-mono text-[#FAFAFA]",
              "text-[2rem] leading-[1.02] md:text-[2.75rem] lg:text-[3.5rem]",
              "font-medium",
            )}
            style={{ letterSpacing: "-0.04em" }}
          >
            {ctaData.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 max-w-[600px] font-sans text-[14.5px] leading-[1.65] text-[#888]"
          >
            {ctaData.subheadline}
          </motion.p>
        </div>

        {/* Terminal-prompt bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={cn(
            "border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)]",
          )}
        >
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-2">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#666]">
              <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[#00FF88]" />
              <span>qawave@discovery</span>
              <span className="text-[#444]">·</span>
              <span>~/you</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#555]">
              zsh
            </span>
          </div>

          <div className="flex flex-col gap-6 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6 md:py-8 lg:px-10 lg:py-10">
            {/* prompt */}
            <div className="flex flex-wrap items-center gap-2 font-mono">
              <span className="text-[14px] text-[#555]">$</span>
              <span className="text-[14px] text-[#00FF88]">qawave</span>
              <span className="text-[14px] text-[#FAFAFA]">book</span>
              <span className="text-[14px] text-[#888]">--type=discovery</span>
              <span className="text-[14px] text-[#888]">--duration=30m</span>
              <span
                aria-hidden
                className={cn(
                  "ml-0.5 inline-block h-[16px] w-[8px] translate-y-[2px]",
                  cursorOn ? "bg-[#00FF88]" : "bg-transparent",
                )}
              />
            </div>

            {/* primary CTA */}
            <a
              href={ctaData.primaryCta.href}
              className={cn(
                "group inline-flex items-center justify-center gap-2 px-6 py-3",
                "border border-[#00FF88] bg-[#00FF88] text-black",
                "font-mono text-[12px] uppercase tracking-wider",
                "transition-colors hover:bg-transparent hover:text-[#00FF88]",
                "rounded-none",
              )}
            >
              <span>→ book.discovery-call</span>
            </a>
          </div>

          {/* side-info strip */}
          <div className="grid grid-cols-1 border-t border-[rgba(255,255,255,0.08)] md:grid-cols-3 md:divide-x md:divide-[rgba(255,255,255,0.08)]">
            {[
              { k: "duration", v: "30 min" },
              { k: "commitment", v: "none" },
              { k: "response.sla", v: "< 24h" },
            ].map((m) => (
              <div
                key={m.k}
                className="flex items-center justify-between px-4 py-3 md:px-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666]">
                  {m.k}
                </span>
                <span
                  className="font-mono text-[12px] text-[#FAFAFA] tabular-nums"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {m.v}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Secondary link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 flex items-center gap-4"
        >
          <a
            href={ctaData.secondaryCta.href}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#888] hover:text-[#FAFAFA]"
          >
            <span
              aria-hidden
              className="text-[#555] group-hover:text-[#00FF88]"
            >
              →
            </span>
            <span>or view.case-studies</span>
          </a>
        </motion.div>

        {/* Signature footer */}
        <div className="mt-16 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.08)] pt-6 font-mono text-[10px] uppercase tracking-wider text-[#555] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 bg-[#00FF88]" />
            <span>qawave.ai</span>
            <span className="text-[#333]">·</span>
            <span>v0.1.0</span>
            <span className="text-[#333]">·</span>
            <span>sha a7f3d9</span>
          </div>
          <div className="flex items-center gap-3">
            <span>built.with = [ next·16, tailwind·4, framer·12 ]</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
