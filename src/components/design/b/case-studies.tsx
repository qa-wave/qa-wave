"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { caseStudiesData } from "@/data/landing";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Case Studies — accordion rows. Collapsed: badge + headline metric. */
/*  Expanded: full detail (challenge, approach, results grid, quote).  */
/* ------------------------------------------------------------------ */

export function CaseStudies() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const [open, setOpen] = useState<number>(0); // first open by default

  return (
    <section
      id="case-studies"
      ref={ref}
      className={cn(
        "relative w-full border-b border-[rgba(255,255,255,0.08)] bg-black",
        "px-6 py-20 md:px-10 lg:px-16 lg:py-24",
      )}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Section header */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#555]">
              04
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#888]">
              case-studies
            </span>
            <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-wider text-[#555] md:inline">
              click row to expand
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
            {caseStudiesData.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 max-w-[640px] font-sans text-[14.5px] leading-[1.65] text-[#888]"
          >
            {caseStudiesData.subheadline}
          </motion.p>
        </div>

        {/* Accordion list */}
        <div className="border-t border-[rgba(255,255,255,0.08)]">
          {caseStudiesData.studies.map((study, i) => {
            const isOpen = open === i;
            const idxStr = String(i + 1).padStart(2, "0");
            const headlineMetric = study.results[0];
            return (
              <motion.div
                key={study.industry + i}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                className="border-b border-[rgba(255,255,255,0.08)]"
              >
                {/* Row trigger */}
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={cn(
                    "group grid w-full grid-cols-12 items-center gap-x-6 gap-y-3",
                    "px-0 py-6 text-left transition-colors",
                    "hover:bg-[rgba(255,255,255,0.015)]",
                    "focus-visible:outline-2 focus-visible:outline-[#00FF88] focus-visible:outline-offset-2",
                  )}
                >
                  {/* idx */}
                  <div className="col-span-2 lg:col-span-1">
                    <span
                      className={cn(
                        "font-mono text-[14px] tabular-nums",
                        isOpen ? "text-[#00FF88]" : "text-[#555]",
                      )}
                    >
                      {idxStr}
                    </span>
                  </div>

                  {/* industry badge */}
                  <div className="col-span-10 lg:col-span-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 border px-2.5 py-1",
                        "font-mono text-[10px] uppercase tracking-wider",
                        "border-[rgba(255,255,255,0.12)] text-[#FAFAFA]",
                      )}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 bg-[#00FF88]"
                        aria-hidden
                      />
                      {study.industry}
                    </span>
                  </div>

                  {/* headline metric */}
                  <div className="col-span-8 lg:col-span-5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#666]">
                      {headlineMetric.label}
                    </div>
                    <div
                      className="mt-1 font-mono text-[20px] text-[#FAFAFA] md:text-[24px] tabular-nums"
                      style={{ letterSpacing: "-0.025em" }}
                    >
                      {headlineMetric.metric}
                    </div>
                  </div>

                  {/* expand glyph */}
                  <div className="col-span-4 flex justify-end lg:col-span-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 font-mono text-[11px]",
                        "uppercase tracking-wider",
                        isOpen ? "text-[#00FF88]" : "text-[#888] group-hover:text-[#FAFAFA]",
                      )}
                    >
                      <span>{isOpen ? "collapse" : "expand"}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "inline-block transition-transform",
                          isOpen ? "rotate-45" : "",
                        )}
                      >
                        +
                      </span>
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-10 pt-2 lg:pb-14">
                        {/* company description */}
                        <div className="col-span-12 lg:col-span-4 lg:col-start-2">
                          <div className="font-mono text-[10px] uppercase tracking-wider text-[#555]">
                            {"// company"}
                          </div>
                          <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-[#bbb]">
                            {study.companyDescription}
                          </p>

                          <div className="mt-6 font-mono text-[10px] uppercase tracking-wider text-[#555]">
                            {"// challenge"}
                          </div>
                          <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-[#bbb]">
                            {study.challenge}
                          </p>

                          <div className="mt-6 font-mono text-[10px] uppercase tracking-wider text-[#555]">
                            {"// approach"}
                          </div>
                          <p className="mt-2 font-sans text-[13.5px] leading-[1.6] text-[#bbb]">
                            {study.approach}
                          </p>
                        </div>

                        {/* results table + quote */}
                        <div className="col-span-12 lg:col-span-6">
                          {/* results grid */}
                          <div className="border border-[rgba(255,255,255,0.08)]">
                            <div className="border-b border-[rgba(255,255,255,0.08)] px-4 py-2.5">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666]">
                                  results.recorded
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-[#00FF88]">
                                  [committed]
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-[rgba(255,255,255,0.08)]">
                              {study.results.map((r) => (
                                <div key={r.label} className="px-4 py-5">
                                  <div
                                    className="font-mono text-[20px] text-[#FAFAFA] md:text-[24px] tabular-nums"
                                    style={{ letterSpacing: "-0.025em" }}
                                  >
                                    {r.metric}
                                  </div>
                                  <div className="mt-1.5 font-mono text-[10px] uppercase leading-[1.3] tracking-wider text-[#888]">
                                    {r.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* quote */}
                          {study.quote && (
                            <figure className="mt-6 border-l-2 border-[#00FF88] pl-5">
                              <blockquote className="font-sans text-[14.5px] leading-[1.65] text-[#FAFAFA]">
                                &ldquo;{study.quote}&rdquo;
                              </blockquote>
                              {study.quoteAttribution && (
                                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#888]">
                                  — {study.quoteAttribution}
                                </figcaption>
                              )}
                            </figure>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
