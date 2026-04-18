"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { uvpData } from "@/data/landing";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Approach — 3 horizontal rows, each 12-col grid.                    */
/*  Cols:  index (1) | title (2-4) | description (5-8) | metrics (9-12)*/
/* ------------------------------------------------------------------ */

interface KeyMetric {
  k: string;
  v: string;
}

const PILLAR_METRICS: KeyMetric[][] = [
  [
    { k: "coverage", v: "28% → 74%" },
    { k: "time-to-first", v: "6 wks" },
    { k: "paths.found", v: "247+" },
  ],
  [
    { k: "maint.time", v: "-65%" },
    { k: "mttr.deploy", v: "minutes" },
    { k: "autohealed", v: "80%" },
  ],
  [
    { k: "audit.trail", v: "100%" },
    { k: "approval.gate", v: "human" },
    { k: "soc2 · iso27k", v: "aligned" },
  ],
];

export function Approach() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="approach"
      ref={ref}
      className={cn(
        "relative w-full border-b border-[rgba(255,255,255,0.08)] bg-black",
        "px-6 py-20 md:px-10 lg:px-16 lg:py-24",
      )}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 mb-12 lg:mb-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#555]">
                03
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#888]">
                approach
              </span>
              <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-wider text-[#555] md:inline">
                3 capabilities · 1 team · 0 lock-in
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={cn(
                "mt-6 max-w-[820px] font-mono text-[#FAFAFA]",
                "text-[1.75rem] leading-[1.05] md:text-[2.25rem] lg:text-[2.75rem]",
                "font-medium",
              )}
              style={{ letterSpacing: "-0.035em" }}
            >
              Three capabilities we bring to your team.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-5 max-w-[640px] font-sans text-[14.5px] leading-[1.65] text-[#888]"
            >
              {uvpData.subheadline}
            </motion.p>
          </div>
        </div>

        {/* Three horizontal rows */}
        <div className="border-t border-[rgba(255,255,255,0.08)]">
          {uvpData.pillars.map((pillar, i) => {
            const indexNum = String(i + 1).padStart(2, "0");
            const metrics = PILLAR_METRICS[i];
            return (
              <motion.div
                key={pillar.headline}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.1 }}
                className={cn(
                  "group relative grid grid-cols-12 gap-x-6 gap-y-6",
                  "border-b border-[rgba(255,255,255,0.08)]",
                  "py-10 lg:py-14",
                  "transition-colors hover:bg-[rgba(255,255,255,0.015)]",
                )}
              >
                {/* Index */}
                <div className="col-span-12 lg:col-span-1">
                  <div
                    className={cn(
                      "font-mono text-[22px] leading-none text-[#00FF88] tabular-nums",
                    )}
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {indexNum}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-[#555]">
                    /pillar
                  </div>
                </div>

                {/* Title (cols 2-4) */}
                <div className="col-span-12 lg:col-span-3">
                  <h3
                    className="font-mono text-[22px] leading-[1.1] text-[#FAFAFA] md:text-[26px]"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    {pillar.headline}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-[#00FF88]">
                    {pillar.tagline}
                  </p>
                </div>

                {/* Description (cols 5-8) */}
                <div className="col-span-12 lg:col-span-4">
                  <p className="font-sans text-[14.5px] leading-[1.65] text-[#bbb]">
                    {pillar.description}
                  </p>

                  {/* bullets */}
                  <ul className="mt-5 space-y-2">
                    {pillar.bullets.map((b) => (
                      <li
                        key={b.bold}
                        className="flex items-start gap-3 font-mono text-[12px] leading-[1.55]"
                      >
                        <span
                          className="mt-[7px] h-[3px] w-[3px] shrink-0 bg-[#00FF88]"
                          aria-hidden
                        />
                        <span>
                          <span className="text-[#FAFAFA]">{b.bold}.</span>{" "}
                          <span className="text-[#888]">{b.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics (cols 9-12) */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="border border-[rgba(255,255,255,0.08)]">
                    <div className="border-b border-[rgba(255,255,255,0.08)] px-3 py-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#555]">
                        metrics.observed
                      </span>
                    </div>
                    {metrics.map((m, j) => (
                      <div
                        key={m.k}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 font-mono",
                          j < metrics.length - 1 &&
                            "border-b border-[rgba(255,255,255,0.04)]",
                        )}
                      >
                        <span className="text-[11px] uppercase tracking-wider text-[#888]">
                          {m.k}
                        </span>
                        <span
                          className="text-[13px] text-[#FAFAFA] tabular-nums"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {m.v}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={pillar.href}
                    className={cn(
                      "mt-4 inline-flex items-center gap-2 font-mono text-[11px]",
                      "uppercase tracking-wider text-[#888] hover:text-[#FAFAFA]",
                    )}
                  >
                    <span>read.detail</span>
                    <span
                      aria-hidden
                      className="text-[#555] group-hover:text-[#00FF88]"
                    >
                      {"→"}
                    </span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Approach;
