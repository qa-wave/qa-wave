"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  ShoppingBag,
  Stethoscope,
  Workflow,
  TrendingUp,
  BarChart3,
  Sprout,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { portfolioData, type PortfolioItem } from "@/data/landing";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/ui/section-wrapper";

/* ------------------------------------------------------------------ */
/*  Icon map                                                            */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<string, LucideIcon> = {
  CreditCard,
  ShoppingBag,
  Stethoscope,
  Workflow,
  TrendingUp,
  BarChart3,
  Sprout,
  Activity,
};

/* ------------------------------------------------------------------ */
/*  Color tokens per accent — keep classes static for Tailwind JIT      */
/* ------------------------------------------------------------------ */

const ACCENT_STYLES: Record<
  PortfolioItem["accentColor"],
  { bg: string; text: string; ring: string }
> = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-300",
    ring: "group-hover:ring-indigo-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    ring: "group-hover:ring-emerald-500/30",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    ring: "group-hover:ring-amber-500/30",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-300",
    ring: "group-hover:ring-rose-500/30",
  },
  sky: {
    bg: "bg-sky-500/10",
    text: "text-sky-300",
    ring: "group-hover:ring-sky-500/30",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    ring: "group-hover:ring-violet-500/30",
  },
};

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const Icon = ICON_MAP[item.icon] ?? Workflow;
  const style = ACCENT_STYLES[item.accentColor];

  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-surface-raised p-6",
        "ring-1 ring-transparent transition-all duration-300",
        "hover:-translate-y-1 hover:border-border-accent",
        style.ring,
      )}
    >
      {/* Top row: icon + engagement pill */}
      <div className="mb-5 flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            style.bg,
          )}
        >
          <Icon className={cn("h-5 w-5", style.text)} />
        </div>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-neutral-400">
          {item.engagement}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>

      {/* Industry + tagline */}
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-neutral-500">
        {item.industry}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
        {item.tagline}
      </p>

      {/* Result */}
      <div className="mt-5 border-t border-border pt-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-600">
          Outcome
        </p>
        <p className={cn("mt-1 text-sm font-semibold", style.text)}>
          {item.result}
        </p>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

export function PortfolioSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <SectionWrapper id="portfolio">
        {/* Headline */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold leading-[1.12] tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {portfolioData.headline}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base leading-relaxed text-neutral-400 md:mt-6 md:text-lg"
          >
            {portfolioData.subheadline}
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {portfolioData.items.map((item) => (
            <PortfolioCard key={item.name} item={item} />
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-12 max-w-2xl text-center text-sm text-neutral-500"
        >
          {portfolioData.footnote}
        </motion.p>
      </SectionWrapper>
    </motion.div>
  );
}

export default PortfolioSection;
