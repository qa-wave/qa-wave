"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { heroData } from "@/data/landing";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Hero — 12-col grid. Left 7 cols: label + display headline + sub.   */
/*  Right 5 cols: fake system readout (typewriter git log).            */
/* ------------------------------------------------------------------ */

interface LogLine {
  prefix: string;
  body: string;
  status?: "ok" | "info" | "warn" | "done";
  delayAfter?: number;
}

const LOG_LINES: LogLine[] = [
  { prefix: "$", body: "qawave agent --init --target=app", status: "info" },
  { prefix: ">", body: "booting discovery runtime...", status: "info", delayAfter: 180 },
  { prefix: ">", body: "scanning repository tree", status: "ok", delayAfter: 160 },
  { prefix: ">", body: "247 test paths discovered", status: "ok", delayAfter: 140 },
  { prefix: ">", body: "mapping user flows", status: "ok", delayAfter: 120 },
  { prefix: ">", body: "edge cases detected: 34", status: "warn", delayAfter: 140 },
  { prefix: ">", body: "generating test fixtures", status: "ok", delayAfter: 160 },
  { prefix: ">", body: "coverage: 28% -> 74%", status: "ok", delayAfter: 180 },
  { prefix: ">", body: "flaky tests auto-healed: 41", status: "ok", delayAfter: 160 },
  { prefix: ">", body: "audit trail: signed + committed", status: "done", delayAfter: 200 },
  { prefix: "$", body: "ready. awaiting instruction_", status: "info" },
];

const STATUS_COLOR: Record<NonNullable<LogLine["status"]>, string> = {
  ok: "text-[#00FF88]",
  info: "text-[#888]",
  warn: "text-[#E6B800]",
  done: "text-[#00FF88]",
};

const STATUS_BADGE: Record<NonNullable<LogLine["status"]>, string> = {
  ok: "[OK]",
  info: "[  ]",
  warn: "[!!]",
  done: "[DONE]",
};

/* ---------- Typewriter line component ---------- */

function TypedLine({
  line,
  onDone,
  start,
}: {
  line: LogLine;
  onDone: () => void;
  start: boolean;
}) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (typed >= line.body.length) {
      const t = setTimeout(onDone, line.delayAfter ?? 80);
      return () => clearTimeout(t);
    }
    const speed = line.prefix === "$" ? 28 : 14;
    const t = setTimeout(() => setTyped((n) => n + 1), speed);
    return () => clearTimeout(t);
  }, [typed, start, line, onDone]);

  const visible = line.body.slice(0, typed);
  const complete = typed >= line.body.length;

  return (
    <div className="flex items-start gap-2 font-mono text-[12px] leading-[1.7]">
      <span className="w-3 shrink-0 text-[#555]">{line.prefix}</span>
      <span className="flex-1 text-[#FAFAFA]">
        {visible}
        {start && !complete && (
          <span
            aria-hidden
            className="ml-[1px] inline-block h-[11px] w-[6px] translate-y-[1px] animate-pulse bg-[#00FF88]"
          />
        )}
      </span>
      {complete && line.status && (
        <span className={cn("shrink-0 text-[11px]", STATUS_COLOR[line.status])}>
          {STATUS_BADGE[line.status]}
        </span>
      )}
    </div>
  );
}

/* ---------- System readout ---------- */

function SystemReadout() {
  const [lineIdx, setLineIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const timestamps = useMemo(
    () =>
      LOG_LINES.map((_, i) => {
        // Synthesize monotonically increasing fake timestamps
        const base = 12 * 1000 + i * 340;
        const ms = base % 1000;
        const totalSec = Math.floor(base / 1000);
        const s = totalSec % 60;
        const m = Math.floor(totalSec / 60) % 60;
        const h = 14 + Math.floor(totalSec / 3600);
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        const ss = String(s).padStart(2, "0");
        const mss = String(ms).padStart(3, "0");
        return `${hh}:${mm}:${ss}.${mss}`;
      }),
    [],
  );

  return (
    <div
      className={cn(
        "border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.015)]",
        "font-mono",
      )}
    >
      {/* terminal header bar */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-2.5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#666]">
          <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[#00FF88]" />
          <span>agent.log</span>
          <span className="text-[#444]">·</span>
          <span>live</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#333]" />
          <span className="inline-block h-2 w-2 rounded-full bg-[#333]" />
          <span className="inline-block h-2 w-2 rounded-full bg-[#333]" />
        </div>
      </div>

      {/* log body */}
      <div className="grid grid-cols-[auto_1fr] gap-x-4 px-4 py-4">
        {LOG_LINES.map((line, i) => (
          <div
            key={`line-${i}`}
            className={cn(
              "contents",
              i > lineIdx && !mounted ? "opacity-0" : "",
            )}
          >
            <div
              className={cn(
                "self-start pt-[3px] text-[10px] uppercase tracking-wider text-[#555] tabular-nums",
                i > lineIdx ? "opacity-20" : "",
              )}
            >
              {timestamps[i]}
            </div>
            <div className={cn(i > lineIdx ? "opacity-0" : "")}>
              {i <= lineIdx && mounted && (
                <TypedLine
                  line={line}
                  start={i === lineIdx}
                  onDone={() => {
                    setLineIdx((n) => Math.min(n + 1, LOG_LINES.length - 1));
                  }}
                />
              )}
              {/* Reserve vertical space before typewriter reaches this line */}
              {i > lineIdx && (
                <div className="h-[20px]" aria-hidden />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] px-4 py-2 text-[10px] uppercase tracking-wider text-[#555]">
        <span>sha a7f3d9 · main</span>
        <span>
          latency <span className="text-[#FAFAFA] tabular-nums">14ms</span>
        </span>
      </div>
    </div>
  );
}

/* ---------- Main hero export ---------- */

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className={cn(
        "relative w-full border-b border-[rgba(255,255,255,0.08)] bg-black",
        "px-6 pb-20 pt-24 md:px-10 lg:px-16 lg:pb-28 lg:pt-32",
      )}
    >
      {/* 12-col grid */}
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-12 gap-x-6 gap-y-12">
        {/* LEFT — 7 cols */}
        <div className="col-span-12 lg:col-span-7">
          {/* Section mono label */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-[#888]"
          >
            <span className="h-px w-8 bg-[#00FF88]" />
            <span className="text-[#FAFAFA]">qawave.ai</span>
            <span className="text-[#444]">{"//"}</span>
            <span>autonomous-qa</span>
          </motion.div>

          {/* Display headline — Geist Mono tight-tracked */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={cn(
              "font-mono text-[#FAFAFA]",
              "text-[2.75rem] leading-[0.95] md:text-[4rem] lg:text-[5.25rem]",
              "font-medium",
            )}
            style={{ letterSpacing: "-0.04em" }}
          >
            The edge of
            <br />
            <span className="text-[#FAFAFA]">QA</span>{" "}
            <span className="text-[#00FF88]">automation.</span>
          </motion.h1>

          {/* Subhead — Geist Sans (body) */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 max-w-[540px] font-sans text-[15px] leading-[1.65] text-[#888] md:text-base"
          >
            {heroData.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={heroData.primaryCta.href}
              className={cn(
                "group inline-flex items-center gap-2 px-5 py-3",
                "border border-[#00FF88] bg-[#00FF88] text-black",
                "font-mono text-[12px] uppercase tracking-wider",
                "transition-colors hover:bg-transparent hover:text-[#00FF88]",
                "focus-visible:outline-2 focus-visible:outline-[#00FF88] focus-visible:outline-offset-2",
                "rounded-none",
              )}
            >
              <span>book.discovery-call</span>
              <span aria-hidden>{"->"}</span>
            </a>
            <a
              href={heroData.secondaryCta.href}
              className={cn(
                "group inline-flex items-center gap-2 px-5 py-3",
                "border border-[rgba(255,255,255,0.15)] bg-transparent text-[#FAFAFA]",
                "font-mono text-[12px] uppercase tracking-wider",
                "transition-colors hover:border-[#FAFAFA] hover:bg-[rgba(255,255,255,0.04)]",
                "rounded-none",
              )}
            >
              <span>view.case-studies</span>
            </a>
          </motion.div>

          {/* Metric strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-14 grid max-w-[560px] grid-cols-3 border-y border-[rgba(255,255,255,0.08)]"
          >
            {[
              { k: "coverage.delta", v: "+46%" },
              { k: "maint.time", v: "-65%" },
              { k: "engagements", v: "30+" },
            ].map((m, i) => (
              <div
                key={m.k}
                className={cn(
                  "px-4 py-4",
                  i > 0 && "border-l border-[rgba(255,255,255,0.08)]",
                )}
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#666]">
                  {m.k}
                </div>
                <div
                  className="mt-1.5 font-mono text-[22px] text-[#FAFAFA] tabular-nums"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — 5 cols — system readout */}
        <div className="col-span-12 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-8"
          >
            <SystemReadout />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
