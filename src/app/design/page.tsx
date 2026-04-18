import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design Variants",
  description:
    "Four distinct design variants of qawave.ai — each with its own typography, layout, and motion system.",
};

interface Variant {
  slug: string;
  label: string;
  name: string;
  description: string;
  gradient: string;
  textColor: string;
  accent: string;
  typography: string;
  motion: string;
}

const VARIANTS: Variant[] = [
  {
    slug: "a",
    label: "A / EDITORIAL",
    name: "Longform Magazine",
    description:
      "New Yorker meets Bloomberg. Serif headlines, drop caps, asymmetric columns, pull-quotes. Quiet authority.",
    gradient: "linear-gradient(135deg, #FAFAF7 0%, #F4F1EA 100%)",
    textColor: "#0A0A0A",
    accent: "#C8102E",
    typography: "Instrument Serif + Geist Sans",
    motion: "Line-by-line text reveals",
  },
  {
    slug: "b",
    label: "B / SWISS MONO",
    name: "Engineering Precision",
    description:
      "Linear × Stripe. Pure black, monospaced typography, 12-column grid, terminal readouts, hairline rules.",
    gradient: "linear-gradient(135deg, #000000 0%, #0A0A0A 100%)",
    textColor: "#FAFAFA",
    accent: "#00FF88",
    typography: "Geist Mono everywhere",
    motion: "Typewriter & tabular counters",
  },
  {
    slug: "c",
    label: "C / IMMERSIVE TECH",
    name: "AI Playground",
    description:
      "Cursor × Anthropic. Deep space gradients, glass-morphic cards, live-looking dashboards, magnetic buttons.",
    gradient:
      "linear-gradient(135deg, #0B0D12 0%, #1E1B4B 50%, #0B0D12 100%)",
    textColor: "#FAFAFA",
    accent: "#22D3EE",
    typography: "Geist Sans + gradient headlines",
    motion: "Mesh gradient + 3D tilt",
  },
  {
    slug: "d",
    label: "D / LUXURY STUDIO",
    name: "Premium Agency",
    description:
      "Pentagram × IDEO. Warm cream, editorial serifs, custom cursor, portfolio-style case grid. High-touch craft.",
    gradient: "linear-gradient(135deg, #F5F2ED 0%, #EAE2D5 100%)",
    textColor: "#1A1A1A",
    accent: "#C4553D",
    typography: "Fraunces + Geist Sans",
    motion: "Custom cursor + marquee",
  },
];

export default function DesignIndex() {
  return (
    <div className="min-h-screen bg-background">
      {/* Masthead */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-light">
            Design Exploration · April 2026
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Four directions.
            <br />
            <span className="text-neutral-500">Pick one to build on.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Each variant is a complete landing page with its own typography,
            layout system, and motion language. Same story, radically different
            delivery. Compare them side by side and pick the voice that fits
            qawave.ai best.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-foreground"
            >
              ← Back to current production page
            </Link>
          </div>
        </div>
      </div>

      {/* Variants grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {VARIANTS.map((v) => (
            <Link
              key={v.slug}
              href={`/design/${v.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-border-accent hover:shadow-[0_0_40px_rgba(79,70,229,0.15)]"
            >
              {/* Preview panel — faux thumbnail showing the aesthetic */}
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: v.gradient }}
              >
                {/* Stylized mini-hero preview per variant */}
                {v.slug === "a" && (
                  <div className="flex h-full flex-col justify-center px-10">
                    <p
                      className="mb-3 text-[9px] uppercase tracking-[0.2em]"
                      style={{ color: v.textColor, fontFamily: "monospace" }}
                    >
                      Vol. 01 · 2026 · qawave
                    </p>
                    <p
                      className="font-serif text-4xl font-medium leading-[0.95] tracking-tight"
                      style={{
                        color: v.textColor,
                        fontFamily: 'Georgia, "Times New Roman", serif',
                      }}
                    >
                      The Edge of
                      <br />
                      <em>QA Automation</em>
                    </p>
                    <div
                      className="mt-4 h-px w-16"
                      style={{ backgroundColor: v.accent }}
                    />
                  </div>
                )}
                {v.slug === "b" && (
                  <div
                    className="flex h-full flex-col justify-center px-10 font-mono"
                    style={{ color: v.textColor }}
                  >
                    <p
                      className="mb-3 text-[9px] uppercase"
                      style={{ color: v.accent }}
                    >
                      › qawave.ai // v0.1.0
                    </p>
                    <p className="text-2xl font-medium leading-tight tracking-tight">
                      AUTONOMOUS_QA
                      <br />
                      AS A SERVICE.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] opacity-70">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: v.accent }}
                      />
                      <span>scanning 247 paths [OK]</span>
                    </div>
                  </div>
                )}
                {v.slug === "c" && (
                  <div className="relative flex h-full flex-col justify-center px-10">
                    {/* Fake grid backdrop */}
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                      }}
                    />
                    {/* Blob */}
                    <div
                      className="absolute right-6 top-6 h-24 w-24 rounded-full opacity-60 blur-2xl"
                      style={{ backgroundColor: v.accent }}
                    />
                    <div
                      className="absolute bottom-6 left-10 h-16 w-16 rounded-full opacity-50 blur-2xl"
                      style={{ backgroundColor: "#E879F9" }}
                    />
                    <p
                      className="relative mb-3 text-[10px] uppercase tracking-widest"
                      style={{ color: v.accent }}
                    >
                      ● LIVE AGENT
                    </p>
                    <p
                      className="relative bg-clip-text text-3xl font-bold tracking-tight"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${v.accent}, #6366F1, #E879F9)`,
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Autonomous
                      <br />
                      QA, now.
                    </p>
                  </div>
                )}
                {v.slug === "d" && (
                  <div className="relative flex h-full items-center px-10">
                    {/* Abstract composition */}
                    <svg
                      className="absolute right-4 top-1/2 h-40 w-40 -translate-y-1/2"
                      viewBox="0 0 160 160"
                    >
                      <circle cx="80" cy="80" r="70" fill={v.accent} opacity="0.2" />
                      <circle cx="120" cy="60" r="40" fill={v.accent} opacity="0.5" />
                      <rect x="20" y="40" width="60" height="60" fill="#1A1A1A" opacity="0.15" />
                    </svg>
                    <div className="relative max-w-[60%]">
                      <p
                        className="mb-2 font-mono text-[9px] uppercase tracking-widest"
                        style={{ color: v.textColor, opacity: 0.6 }}
                      >
                        QA consulting · est. 2026
                      </p>
                      <p
                        className="text-3xl font-medium leading-[0.95] tracking-tight"
                        style={{
                          color: v.textColor,
                          fontFamily: 'Georgia, "Times New Roman", serif',
                          fontStyle: "italic",
                        }}
                      >
                        The edge of
                        <br />
                        <em>QA automation.</em>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Meta block */}
              <div className="border-t border-border p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent-light">
                    {v.label}
                  </p>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: v.accent }}
                  />
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {v.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400 md:text-base">
                  {v.description}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                      Type
                    </dt>
                    <dd className="mt-1 text-xs text-neutral-300">
                      {v.typography}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                      Motion
                    </dt>
                    <dd className="mt-1 text-xs text-neutral-300">{v.motion}</dd>
                  </div>
                </dl>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-light">
                  View full page
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
