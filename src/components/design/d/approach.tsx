"use client";

// ============================================================
// Variant D — Approach
// Three UVP pillars laid out as a horizontal timeline of
// numbered dots on a hairline. Hovering a dot reveals a
// detail callout with bullets. The active dot expands.
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { uvpData } from "@/data/landing";
import { SweepReveal } from "./reveal";
import { cn } from "@/lib/utils";

export function ApproachD() {
  const [active, setActive] = useState<number>(0);

  return (
    <section
      id="approach-d"
      className="relative bg-[#EFE9DC] py-28 text-[#1A1A1A] md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/60 md:col-span-4">
            <span className="inline-block h-px w-10 bg-[#C4553D]" />
            <span>(ii) Approach · 003</span>
          </div>
          <SweepReveal
            as="h2"
            className="col-span-12 font-[family-name:var(--font-fraunces)] text-[clamp(2.25rem,5vw,4.5rem)] font-[400] leading-[1.02] tracking-[-0.015em] md:col-span-8"
          >
            {uvpData.headline}
          </SweepReveal>
          <p className="col-span-12 max-w-[64ch] pt-4 text-[#1A1A1A]/70 md:col-span-8 md:col-start-5 md:text-lg md:leading-[1.6]">
            {uvpData.subheadline}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-24 hidden md:block">
          {/* hairline track */}
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#1A1A1A]/25" />
          <div className="relative flex justify-between">
            {uvpData.pillars.map((pillar, i) => {
              const isActive = active === i;
              return (
                <div
                  key={pillar.headline}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  {/* Chapter label above */}
                  <div className="absolute -top-14 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                    Chapter 0{i + 1}
                  </div>

                  {/* Dot */}
                  <button
                    type="button"
                    data-cursor="hover"
                    data-cursor-label="Open"
                    aria-label={`Show ${pillar.headline}`}
                    className={cn(
                      "relative z-10 flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                      isActive
                        ? "h-8 w-8 border-[#C4553D] bg-[#C4553D]"
                        : "border-[#1A1A1A]/60 bg-[#EFE9DC] hover:border-[#1A1A1A]",
                    )}
                    onClick={() => setActive(i)}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="h-2 w-2 rounded-full bg-[#F5F2ED]"
                        />
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Label under */}
                  <div
                    className={cn(
                      "absolute top-12 whitespace-nowrap font-[family-name:var(--font-fraunces)] text-xl italic tracking-tight transition-colors",
                      isActive ? "text-[#C4553D]" : "text-[#1A1A1A]",
                    )}
                  >
                    {pillar.headline}
                  </div>
                  <div className="absolute top-[86px] whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                    {pillar.tagline}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail callout */}
          <div className="relative mt-44 grid grid-cols-12 gap-6">
            <AnimatePresence mode="wait">
              <motion.article
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-12 grid grid-cols-12 gap-6 border-t border-[#1A1A1A]/25 pt-10"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                    Chapter 0{active + 1} · Detail
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-4xl leading-[1.05] tracking-tight text-[#1A1A1A]">
                    {uvpData.pillars[active].headline}
                  </h3>
                  <div className="mt-5 font-[family-name:var(--font-fraunces)] text-xl italic text-[#C4553D]">
                    {uvpData.pillars[active].tagline}
                  </div>
                  <a
                    href={uvpData.pillars[active].href}
                    data-cursor="hover"
                    data-cursor-label="Read"
                    className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A] hover:text-[#C4553D]"
                  >
                    <span className="inline-block h-px w-6 bg-current" />
                    Full chapter
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                  </a>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[15px] leading-[1.65] text-[#1A1A1A]/75">
                    {uvpData.pillars[active].description}
                  </p>
                </div>
                <ul className="col-span-12 space-y-5 md:col-span-4">
                  {uvpData.pillars[active].bullets.map((b) => (
                    <li key={b.bold} className="border-t border-[#1A1A1A]/20 pt-3">
                      <div className="font-[family-name:var(--font-fraunces)] text-lg italic text-[#1A1A1A]">
                        {b.bold}
                      </div>
                      <p className="mt-1 text-sm leading-[1.6] text-[#1A1A1A]/70">
                        {b.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile stacked fallback */}
        <div className="mt-16 space-y-14 md:hidden">
          {uvpData.pillars.map((pillar, i) => (
            <article
              key={pillar.headline}
              className="border-t border-[#1A1A1A]/25 pt-8"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                Chapter 0{i + 1}
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl leading-tight">
                {pillar.headline}
              </h3>
              <div className="mt-2 font-[family-name:var(--font-fraunces)] text-lg italic text-[#C4553D]">
                {pillar.tagline}
              </div>
              <p className="mt-4 text-[15px] leading-[1.65] text-[#1A1A1A]/75">
                {pillar.description}
              </p>
              <ul className="mt-6 space-y-5">
                {pillar.bullets.map((b) => (
                  <li key={b.bold} className="border-t border-[#1A1A1A]/20 pt-3">
                    <div className="font-[family-name:var(--font-fraunces)] text-lg italic">
                      {b.bold}
                    </div>
                    <p className="mt-1 text-sm leading-[1.6] text-[#1A1A1A]/70">
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ApproachD;
