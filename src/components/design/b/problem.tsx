"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { problemData } from "@/data/landing";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Problem — terminal-style data table.                               */
/*  Columns: METRIC | VALUE | DELTA | SOURCE. Zebra striping.          */
/* ------------------------------------------------------------------ */

interface Row {
  metric: string;
  value: string;
  numericValue: number;
  delta: string;
  deltaDirection: "up" | "down";
  source: string;
  sourceUrl?: string;
  detail: string;
}

const ROWS: Row[] = [
  {
    metric: "test.automation.ceiling",
    value: "25%",
    numericValue: 25,
    delta: "↓ 75pp missed",
    deltaDirection: "down",
    source: "Forrester Wave Q4 2025",
    sourceUrl: problemData.stats[0].sourceUrl,
    detail: "Script-based tools can only cover anticipated paths.",
  },
  {
    metric: "hidden.cost.multiplier",
    value: "6x",
    numericValue: 6,
    delta: "↑ €760K over budget",
    deltaDirection: "up",
    source: "Bug0 Research 2026",
    sourceUrl: problemData.stats[1].sourceUrl,
    detail: "€140-180K budgeted. €900K-1M actual.",
  },
  {
    metric: "senior.time.lost",
    value: "30%",
    numericValue: 30,
    delta: "↑ 12 hrs/week",
    deltaDirection: "up",
    source: "Gartner Peer Insights 2026",
    sourceUrl: problemData.stats[2].sourceUrl,
    detail: "Triage, flaky tests, broken selectors.",
  },
];

/* ---------- Animated numeric value ---------- */

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function Problem() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="problem"
      ref={ref}
      className={cn(
        "relative w-full border-b border-[rgba(255,255,255,0.08)] bg-black",
        "px-6 py-20 md:px-10 lg:px-16 lg:py-24",
      )}
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-12 gap-x-6">
        {/* Section header */}
        <div className="col-span-12 mb-10 lg:mb-14">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#555]">
              02
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#888]">
              problem.stats
            </span>
            <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-wider text-[#555] md:inline">
              src: industry-analyst reports
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
            The gap between{" "}
            <span className="text-[#00FF88]">dev velocity</span> and{" "}
            <span className="text-[#FAFAFA]">test coverage</span> is widening every
            sprint.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 max-w-[640px] font-sans text-[14.5px] leading-[1.65] text-[#888]"
          >
            {problemData.subheadline}
          </motion.p>
        </div>

        {/* Terminal-style table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.25 }}
          className={cn(
            "col-span-12 border border-[rgba(255,255,255,0.08)]",
            "bg-[rgba(255,255,255,0.015)] font-mono",
          )}
        >
          {/* Table header bar */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-2.5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#666]">
              <span className="inline-block h-1.5 w-1.5 bg-[#E6B800]" />
              <span>industry.baseline.tsv</span>
              <span className="text-[#444]">·</span>
              <span>3 rows</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-[#555]">
              ro · mtime 2026-03-28
            </div>
          </div>

          {/* Column headers */}
          <div
            className={cn(
              "grid items-center gap-4 border-b border-[rgba(255,255,255,0.08)]",
              "px-4 py-3 text-[10px] uppercase tracking-wider text-[#666]",
              "grid-cols-[1fr_70px_110px] md:grid-cols-[minmax(240px,2fr)_90px_130px_minmax(180px,1.5fr)]",
            )}
          >
            <span>metric</span>
            <span className="text-right">value</span>
            <span className="text-right md:text-left">delta</span>
            <span className="hidden md:block">source</span>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.metric}
              className={cn(
                "grid items-start gap-4 border-b border-[rgba(255,255,255,0.04)] px-4 py-5",
                "grid-cols-[1fr_70px_110px] md:grid-cols-[minmax(240px,2fr)_90px_130px_minmax(180px,1.5fr)]",
                i % 2 === 1 && "bg-[rgba(255,255,255,0.015)]",
                i === ROWS.length - 1 && "border-b-0",
              )}
            >
              {/* metric */}
              <div className="flex flex-col">
                <span className="text-[13px] text-[#FAFAFA]">{row.metric}</span>
                <span className="mt-1 font-sans text-[12px] leading-[1.5] text-[#888]">
                  {row.detail}
                </span>
              </div>

              {/* value */}
              <div
                className="text-right text-[22px] text-[#FAFAFA] tabular-nums"
                style={{ letterSpacing: "-0.02em" }}
              >
                <Counter
                  target={row.numericValue}
                  suffix={row.value.replace(String(row.numericValue), "")}
                  active={inView}
                />
              </div>

              {/* delta */}
              <div
                className={cn(
                  "text-right text-[11px] uppercase tracking-wider md:text-left",
                  row.deltaDirection === "up" ? "text-[#E6B800]" : "text-[#00FF88]",
                )}
              >
                {row.delta}
              </div>

              {/* source */}
              <div className="col-span-3 mt-2 md:col-span-1 md:mt-0">
                {row.sourceUrl ? (
                  <a
                    href={row.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#888] hover:text-[#FAFAFA]"
                  >
                    <span>{row.source}</span>
                    <span
                      aria-hidden
                      className="text-[#555] transition-colors group-hover:text-[#00FF88]"
                    >
                      {"[→]"}
                    </span>
                  </a>
                ) : (
                  <span className="text-[11px] uppercase tracking-wider text-[#666]">
                    {row.source}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] px-4 py-2 text-[10px] uppercase tracking-wider text-[#555]">
            <span>end.of.table</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 bg-[#00FF88]" />
              <span>rendered · {ROWS.length} rows</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Problem;
