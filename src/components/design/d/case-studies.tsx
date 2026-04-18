"use client";

// ============================================================
// Variant D — Case Studies (portfolio grid)
// Three rectangular cards, each with an abstract SVG cover,
// industry, year, single headline metric, and Read case link.
// On hover the card lifts and the cover reveals a color overlay
// with "View study →".
// ============================================================

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { caseStudiesData } from "@/data/landing";
import { AbstractComposition } from "./abstract-composition";
import { SweepReveal } from "./reveal";

const YEARS = ["2025", "2025", "2026"];
const VARIANTS: Array<"a" | "b" | "c"> = ["a", "b", "c"];

export function CaseStudiesD() {
  return (
    <section
      id="case-studies-d"
      className="relative bg-[#F5F2ED] py-28 text-[#1A1A1A] md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/60 md:col-span-4">
            <span className="inline-block h-px w-10 bg-[#C4553D]" />
            <span>(iii) Selected Work · 004</span>
          </div>
          <SweepReveal
            as="h2"
            className="col-span-12 font-[family-name:var(--font-fraunces)] text-[clamp(2.25rem,5vw,4.5rem)] font-[400] leading-[1.02] tracking-[-0.015em] md:col-span-8"
          >
            {caseStudiesData.headline}
          </SweepReveal>
          <p className="col-span-12 max-w-[64ch] pt-4 text-[#1A1A1A]/70 md:col-span-8 md:col-start-5 md:text-lg md:leading-[1.6]">
            {caseStudiesData.subheadline}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-24 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
          {caseStudiesData.studies.map((study, i) => {
            const highlight =
              study.results[0]?.metric ?? study.results[0]?.label ?? "—";
            const highlightLabel = study.results[0]?.label ?? "";
            return (
              <motion.a
                key={study.industry}
                href="/case-studies"
                data-cursor="hover"
                data-cursor-label="Open"
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group relative block"
              >
                {/* Cover */}
                <motion.div
                  variants={{
                    rest: { y: 0 },
                    hover: { y: -8 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/3] w-full overflow-hidden"
                >
                  <AbstractComposition
                    variant={VARIANTS[i]}
                    className="h-full w-full"
                  />
                  {/* Color overlay */}
                  <motion.div
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute inset-0 flex items-end bg-[#1A1A1A]/80 p-6"
                  >
                    <div className="flex w-full items-end justify-between text-[#F5F2ED]">
                      <div className="font-[family-name:var(--font-fraunces)] text-2xl italic">
                        View study
                      </div>
                      <ArrowUpRight className="h-6 w-6" strokeWidth={1.25} />
                    </div>
                  </motion.div>
                  {/* Index */}
                  <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/60">
                    {String(i + 1).padStart(3, "0")} · {YEARS[i]}
                  </div>
                </motion.div>

                {/* Meta */}
                <div className="mt-5 flex items-start justify-between gap-4 border-t border-[#1A1A1A]/25 pt-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                      {study.industry}
                    </div>
                    <h3 className="mt-2 font-[family-name:var(--font-fraunces)] text-2xl leading-tight tracking-tight text-[#1A1A1A]">
                      {study.companyDescription.split(",")[0]}
                    </h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-[family-name:var(--font-fraunces)] text-3xl leading-none text-[#C4553D]">
                      {highlight}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                      {highlightLabel}
                    </div>
                  </div>
                </div>

                {/* Read link */}
                <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A] transition-colors group-hover:text-[#C4553D]">
                  <span className="inline-block h-px w-6 bg-current transition-all group-hover:w-10" />
                  Read case
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesD;
