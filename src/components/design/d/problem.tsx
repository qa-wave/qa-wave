"use client";

// ============================================================
// Variant D — Problem
// Oversized editorial numbers in a 3-column layout with each
// card staggered vertically. Explanatory prose below in sans.
// ============================================================

import { problemData } from "@/data/landing";
import { SweepReveal } from "./reveal";
import { cn } from "@/lib/utils";

const offsets = ["md:mt-0", "md:mt-24", "md:mt-12"];

export function ProblemD() {
  return (
    <section
      id="problem-d"
      className="relative bg-[#F5F2ED] py-28 text-[#1A1A1A] md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/60 md:col-span-4">
            <span className="inline-block h-px w-10 bg-[#C4553D]" />
            <span>(i) Problem Statement · 002</span>
          </div>
          <SweepReveal
            as="h2"
            className="col-span-12 font-[family-name:var(--font-fraunces)] text-[clamp(2.25rem,5vw,4.5rem)] font-[400] leading-[1.02] tracking-[-0.015em] md:col-span-8"
          >
            {problemData.headline}
          </SweepReveal>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-6">
          <p className="col-span-12 max-w-[64ch] text-[#1A1A1A]/70 md:col-span-8 md:col-start-5 md:text-lg md:leading-[1.6]">
            {problemData.subheadline}
          </p>
        </div>

        {/* Stat cards with vertical offsets */}
        <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {problemData.stats.map((stat, i) => (
            <article
              key={stat.number}
              className={cn(
                "group relative flex flex-col gap-8 border-t border-[#1A1A1A]/25 pt-8",
                offsets[i],
              )}
              data-cursor="hover"
              data-cursor-label={stat.source ? "Source" : "Stat"}
            >
              {/* Oversized number */}
              <div className="relative">
                <div className="absolute -left-1 -top-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/50">
                  {String(i + 1).padStart(3, "0")}
                </div>
                <div className="pl-8 font-[family-name:var(--font-fraunces)] text-[clamp(6rem,12vw,11rem)] font-[300] leading-[0.88] tracking-[-0.04em] text-[#1A1A1A]">
                  <span className="inline-block">
                    {stat.number.replace(stat.suffix, "")}
                  </span>
                  <span className="italic text-[#C4553D]">{stat.suffix}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl italic leading-tight tracking-tight text-[#1A1A1A] md:text-2xl">
                  {stat.label}
                </h3>
                <p className="max-w-[40ch] text-sm leading-[1.6] text-[#1A1A1A]/70 md:text-[15px]">
                  {stat.supportingText}
                </p>
                {stat.source ? (
                  <div className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">
                    <span className="inline-block h-px w-4 bg-[#C4553D]" />
                    {stat.sourceUrl ? (
                      <a
                        href={stat.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="hover"
                        data-cursor-label="Cite"
                        className="hover:text-[#C4553D]"
                      >
                        {stat.source}
                      </a>
                    ) : (
                      <span>{stat.source}</span>
                    )}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemD;
