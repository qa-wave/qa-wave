"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Fixed left sidebar — section nav. Hides on mobile (<lg).           */
/*  Linear-docs inspired. Numbered 01-06.                              */
/* ------------------------------------------------------------------ */

interface SectionRef {
  id: string;
  num: string;
  label: string;
}

const SECTIONS: SectionRef[] = [
  { id: "hero", num: "01", label: "index" },
  { id: "problem", num: "02", label: "problem.stats" },
  { id: "approach", num: "03", label: "approach" },
  { id: "case-studies", num: "04", label: "case-studies" },
  { id: "cta", num: "05", label: "book.call" },
];

export function Sidebar() {
  const [active, setActive] = useState<string>("hero");
  const [time, setTime] = useState<string>("");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Live clock (UTC-style, monospace)
  useEffect(() => {
    function tick() {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col",
        "border-r border-[rgba(255,255,255,0.08)] bg-black",
        "font-mono text-[11px] uppercase tracking-wider",
        "lg:flex",
      )}
    >
      {/* ---- Brand block ---- */}
      <div className="border-b border-[rgba(255,255,255,0.08)] px-5 py-5">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 bg-[#00FF88]"
            aria-hidden
          />
          <a
            href="/design/b"
            className="text-[13px] font-medium lowercase tracking-tight text-[#FAFAFA]"
          >
            qawave.ai
          </a>
        </div>
        <div className="mt-2 text-[10px] tracking-wider text-[#666]">
          v0.1.0 · a7f3d9
        </div>
      </div>

      {/* ---- Section nav ---- */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <div className="px-3 pb-3 text-[10px] tracking-wider text-[#555]">
          {"// sections"}
        </div>
        <ul className="flex flex-col">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2 transition-colors",
                    isActive
                      ? "bg-[rgba(0,255,136,0.06)] text-[#FAFAFA]"
                      : "text-[#888] hover:text-[#FAFAFA]",
                  )}
                >
                  <span
                    className={cn(
                      "w-6 text-[10px]",
                      isActive ? "text-[#00FF88]" : "text-[#555]",
                    )}
                  >
                    {s.num}
                  </span>
                  <span className="flex-1 lowercase">{s.label}</span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="h-1 w-1 bg-[#00FF88]"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ---- Status footer ---- */}
      <div className="border-t border-[rgba(255,255,255,0.08)] px-5 py-4">
        <div className="flex items-center justify-between text-[10px] tracking-wider text-[#666]">
          <span>utc</span>
          <span className="tabular-nums text-[#FAFAFA]">{time || "--:--:--"}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] tracking-wider text-[#666]">
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse bg-[#00FF88]"
            aria-hidden
          />
          <span>online · eu-fra1</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
