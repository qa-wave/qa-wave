"use client";

// ============================================================
// Variant D — Capability Marquee
// Seamless horizontal ticker using a duplicated track with a
// CSS keyframe animation. Sizes to any label content.
// ============================================================

import { cn } from "@/lib/utils";

const ITEMS = [
  "Fintech",
  "Healthcare",
  "E-commerce",
  "DevTools",
  "Autonomous Discovery",
  "Intelligent Maintenance",
  "Compliance & Governance",
  "SaaS",
  "Playwright",
  "Cypress",
  "GitHub Actions",
  "SOC 2 / ISO 27001",
];

const STAR = (
  <span aria-hidden className="inline-block rotate-45 text-[#C4553D]">
    ✦
  </span>
);

interface Props {
  className?: string;
  reverse?: boolean;
}

export function LuxuryMarquee({ className, reverse = false }: Props) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden border-y border-[#1A1A1A]/15 py-6",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 animate-[marquee-d_42s_linear_infinite] items-center gap-12 whitespace-nowrap pr-12",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[family-name:var(--font-fraunces)] text-3xl italic tracking-tight text-[#1A1A1A] md:text-4xl"
          >
            {item}
            <span className="mx-12 text-2xl align-middle">{STAR}</span>
          </span>
        ))}
      </div>
      <div
        className={cn(
          "flex shrink-0 animate-[marquee-d_42s_linear_infinite] items-center gap-12 whitespace-nowrap pr-12",
          reverse && "[animation-direction:reverse]",
        )}
        aria-hidden
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`dup-${item}-${i}`}
            className="font-[family-name:var(--font-fraunces)] text-3xl italic tracking-tight text-[#1A1A1A] md:text-4xl"
          >
            {item}
            <span className="mx-12 text-2xl align-middle">{STAR}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default LuxuryMarquee;
