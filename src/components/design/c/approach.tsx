"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Radar, RefreshCw, ShieldCheck, ArrowUpRight } from "lucide-react";
import { uvpData, type UvpPillar } from "@/data/landing";
import { cn } from "@/lib/utils";
import { GridLines } from "./grid-lines";

/* ------------------------------------------------------------------
 * Mini-visualizations for the featured pillar.
 * Each pillar gets its own embedded inline SVG motif.
 * ------------------------------------------------------------------ */

function RadarViz() {
  const rings = [1, 2, 3, 4];
  const spokes = 8;
  const datapoints = [0.85, 0.6, 0.9, 0.45, 0.78, 0.95, 0.55, 0.7];

  const points = datapoints
    .map((r, i) => {
      const angle = (i * 2 * Math.PI) / spokes - Math.PI / 2;
      const radius = r * 70;
      return `${80 + radius * Math.cos(angle)},${80 + radius * Math.sin(angle)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <defs>
        <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* Concentric rings */}
      {rings.map((r) => (
        <circle
          key={r}
          cx={80}
          cy={80}
          r={r * 17.5}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
      ))}

      {/* Spokes */}
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i * 2 * Math.PI) / spokes - Math.PI / 2;
        return (
          <line
            key={i}
            x1={80}
            y1={80}
            x2={80 + 70 * Math.cos(angle)}
            y2={80 + 70 * Math.sin(angle)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        );
      })}

      {/* Data polygon */}
      <motion.polygon
        points={points}
        fill="url(#radar-fill)"
        stroke="#22D3EE"
        strokeWidth={1.5}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "80px 80px" }}
      />

      {/* Vertices */}
      {datapoints.map((r, i) => {
        const angle = (i * 2 * Math.PI) / spokes - Math.PI / 2;
        return (
          <motion.circle
            key={i}
            cx={80 + r * 70 * Math.cos(angle)}
            cy={80 + r * 70 * Math.sin(angle)}
            r={2.5}
            fill="#E0F7FA"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
          />
        );
      })}

      {/* Sweep line */}
      <motion.line
        x1={80}
        y1={80}
        x2={80}
        y2={10}
        stroke="#22D3EE"
        strokeWidth={1}
        strokeOpacity={0.6}
        style={{ transformOrigin: "80px 80px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function MaintenanceViz() {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <defs>
        <linearGradient id="maint-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
          <stop offset="40%" stopColor="#6366F1" stopOpacity="1" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
        </linearGradient>
      </defs>

      {[20, 45, 70, 95, 120].map((y, i) => (
        <motion.path
          key={y}
          d={`M 10 ${y} Q 60 ${y - 10 + i * 3}, 90 ${y + 5} T 150 ${y - 3}`}
          fill="none"
          stroke="url(#maint-line)"
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.6, delay: i * 0.12, ease: "easeInOut" }}
        />
      ))}

      {/* Scrubbing bar */}
      <motion.line
        x1={0}
        y1={0}
        x2={0}
        y2={160}
        stroke="#22D3EE"
        strokeWidth={1}
        strokeOpacity={0.5}
        animate={{ x1: [0, 160, 0], x2: [0, 160, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function ShieldViz() {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <defs>
        <linearGradient id="shield-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E879F9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 80 20 L 130 40 L 130 85 Q 130 125, 80 145 Q 30 125, 30 85 L 30 40 Z"
        fill="url(#shield-grad)"
        stroke="#E879F9"
        strokeWidth={1.2}
        strokeOpacity={0.7}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      {/* Checkmark */}
      <motion.path
        d="M 58 85 L 75 100 L 105 68"
        fill="none"
        stroke="#E879F9"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      />
      {/* Scanning halo */}
      <motion.circle
        cx={80}
        cy={82}
        r={50}
        fill="none"
        stroke="#E879F9"
        strokeOpacity={0.4}
        strokeWidth={1}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "80px 82px" }}
      />
    </svg>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Radar,
  RefreshCw,
  ShieldCheck,
};

const vizMap: Record<string, React.ComponentType> = {
  Radar: RadarViz,
  RefreshCw: MaintenanceViz,
  ShieldCheck: ShieldViz,
};

const hueMap: Record<string, number> = {
  Radar: 190, // cyan
  RefreshCw: 245, // indigo
  ShieldCheck: 295, // magenta
};

/* ------------------------------------------------------------------
 * Pillar card — either featured (large) or compact.
 * ------------------------------------------------------------------ */

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface PillarCardProps {
  pillar: UvpPillar;
  featured?: boolean;
  delay?: number;
}

function PillarCard({ pillar, featured = false, delay = 0 }: PillarCardProps) {
  const Icon = iconMap[pillar.icon] ?? Radar;
  const Viz = vizMap[pillar.icon];
  const hue = hueMap[pillar.icon] ?? 220;

  return (
    <motion.article
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      style={{ transformPerspective: 1200 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-7 md:p-8",
        "border border-white/10 bg-white/[0.04] backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]",
        featured && "lg:p-10",
      )}
      // shadow in style to allow CSS var color
      data-hue={hue}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 100% 0%, hsla(${hue}, 92%, 62%, 0.14) 0%, transparent 55%)`,
        }}
      />

      {/* Hover border gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, hsla(${hue}, 95%, 75%, 0.5), hsla(${hue + 40}, 90%, 65%, 0.35) 60%, transparent)`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: 1,
        }}
      />

      <div className="relative flex h-full flex-col">
        {/* Header: icon + status */}
        <div className="flex items-start justify-between gap-4">
          <div
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm"
            style={{
              borderColor: `hsla(${hue}, 90%, 65%, 0.35)`,
              background: `hsla(${hue}, 90%, 55%, 0.12)`,
              color: `hsl(${hue}, 90%, 75%)`,
            }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <div
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1"
            style={{
              borderColor: `hsla(${hue}, 90%, 65%, 0.25)`,
              background: `hsla(${hue}, 90%, 55%, 0.08)`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: `hsl(${hue}, 92%, 72%)` }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: `hsl(${hue}, 80%, 78%)` }}
            >
              Live
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "mt-6 font-semibold tracking-tight text-neutral-50",
            featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
          )}
        >
          {pillar.headline}
        </h3>

        {/* Tagline */}
        <p
          className={cn(
            "mt-2 font-medium",
            featured ? "text-base md:text-lg" : "text-sm",
          )}
          style={{ color: `hsl(${hue}, 85%, 78%)` }}
        >
          {pillar.tagline}
        </p>

        {/* Featured visualization */}
        {featured && Viz && (
          <div className="relative mt-6 h-48 w-full overflow-hidden rounded-2xl border border-white/5 bg-black/30 md:h-56">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, hsla(${hue}, 90%, 55%, 0.18) 0%, transparent 70%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <Viz />
            </div>
            <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              {pillar.icon === "Radar" && "coverage.map"}
              {pillar.icon === "RefreshCw" && "test.streams"}
              {pillar.icon === "ShieldCheck" && "governance.shield"}
            </div>
          </div>
        )}

        {/* Description */}
        <p
          className={cn(
            "mt-5 leading-relaxed text-neutral-400",
            featured ? "text-base md:text-[17px]" : "text-sm",
          )}
        >
          {pillar.description}
        </p>

        {/* Bullets */}
        <ul
          className={cn(
            "mt-5 space-y-3",
            !featured && "mt-4 space-y-2.5",
          )}
        >
          {pillar.bullets.map((b) => (
            <li
              key={b.bold}
              className={cn(
                "flex gap-3 text-neutral-400",
                featured ? "text-sm md:text-[15px]" : "text-[13px]",
              )}
            >
              <span
                className="mt-2 h-1 w-1 flex-none rounded-full"
                style={{ background: `hsl(${hue}, 92%, 70%)` }}
              />
              <span>
                <span className="font-semibold text-neutral-200">
                  {b.bold}:
                </span>{" "}
                {b.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer link */}
        <div className="mt-auto pt-6">
          <a
            href={pillar.href}
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
            )}
            style={{ color: `hsl(${hue}, 88%, 78%)` }}
          >
            Explore
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------
 * Approach (UVP) Section — bento grid
 * ------------------------------------------------------------------ */

export function ApproachC() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const [featured, secondary, tertiary] = uvpData.pillars;

  return (
    <section
      id="approach"
      className="relative isolate overflow-hidden py-28 md:py-36"
      style={{ background: "#0B0D12" }}
    >
      <GridLines />

      {/* Ambient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 85% 15%, rgba(99,102,241,0.12), transparent 50%), radial-gradient(ellipse at 15% 85%, rgba(34,211,238,0.1), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-300/80"
          >
            <span className="h-px w-8 bg-indigo-300/40" />
            Three Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-neutral-50 md:text-5xl"
          >
            {uvpData.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            {uvpData.subheadline}
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
          {/* Featured — spans 2 cols, 2 rows */}
          <div className="lg:col-span-2 lg:row-span-2">
            <PillarCard pillar={featured} featured delay={0} />
          </div>

          {/* Secondary — top right */}
          <div>
            <PillarCard pillar={secondary} delay={0.1} />
          </div>

          {/* Tertiary — bottom right */}
          <div>
            <PillarCard pillar={tertiary} delay={0.2} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApproachC;
