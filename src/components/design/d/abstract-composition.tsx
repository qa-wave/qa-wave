"use client";

// ============================================================
// Variant D — Abstract Composition
// SVG "artwork" of overlapping circles and rectangles in warm
// cream/terracotta tones. Used in the hero and as case-study
// cover images. Slowly reacts to pointer position and scroll.
// ============================================================

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type CompositionVariant = "hero" | "a" | "b" | "c";

interface Props {
  variant?: CompositionVariant;
  interactive?: boolean;
  seed?: number;
  className?: string;
}

const TERRACOTTA = "#C4553D";
const CREAM_DEEP = "#E8DFCE";
const CREAM = "#F5F2ED";
const CHARCOAL = "#1A1A1A";
const INK_SOFT = "#4A413A";

export function AbstractComposition({
  variant = "hero",
  interactive = false,
  seed = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 30, stiffness: 120, mass: 0.8 });
  const smy = useSpring(my, { damping: 30, stiffness: 120, mass: 0.8 });

  // Parallax translations for different layers
  const t1x = useTransform(smx, (v) => (v - 0.5) * 24);
  const t1y = useTransform(smy, (v) => (v - 0.5) * 24);
  const t2x = useTransform(smx, (v) => (v - 0.5) * -14);
  const t2y = useTransform(smy, (v) => (v - 0.5) * -14);
  const t3x = useTransform(smx, (v) => (v - 0.5) * 8);
  const t3y = useTransform(smy, (v) => (v - 0.5) * 8);

  useEffect(() => {
    if (!interactive) return;
    const el = ref.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive, mx, my]);

  if (variant === "hero") {
    return (
      <div ref={ref} className={className}>
        <svg
          viewBox="0 0 600 720"
          className="h-full w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id={`grad-hero-${seed}`} cx="0.3" cy="0.3" r="0.9">
              <stop offset="0%" stopColor={CREAM} />
              <stop offset="80%" stopColor={CREAM_DEEP} />
              <stop offset="100%" stopColor="#DED3BD" />
            </radialGradient>
            <linearGradient
              id={`grad-terra-${seed}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={TERRACOTTA} />
              <stop offset="100%" stopColor="#A03C24" />
            </linearGradient>
            <pattern
              id={`dots-${seed}`}
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill={CHARCOAL} opacity="0.12" />
            </pattern>
          </defs>

          {/* Background wash */}
          <rect width="600" height="720" fill={`url(#grad-hero-${seed})`} />

          {/* Soft back circle */}
          <motion.circle
            cx="420"
            cy="200"
            r="180"
            fill={CREAM_DEEP}
            style={{ x: t1x, y: t1y }}
          />

          {/* Terracotta arch */}
          <motion.g style={{ x: t2x, y: t2y }}>
            <path
              d="M 80 640 L 80 340 A 200 200 0 0 1 480 340 L 480 640 Z"
              fill={`url(#grad-terra-${seed})`}
            />
          </motion.g>

          {/* Dotted textured rectangle */}
          <motion.rect
            x="60"
            y="120"
            width="180"
            height="180"
            fill={`url(#dots-${seed})`}
            style={{ x: t3x, y: t3y }}
          />

          {/* Fine outlined circle */}
          <motion.circle
            cx="220"
            cy="490"
            r="120"
            fill="none"
            stroke={CHARCOAL}
            strokeWidth="1"
            style={{ x: t3x, y: t3y }}
          />

          {/* Small accent circle */}
          <motion.circle
            cx="470"
            cy="520"
            r="36"
            fill={CHARCOAL}
            style={{ x: t1x, y: t1y }}
          />

          {/* Hairline axes */}
          <line
            x1="0"
            y1="660"
            x2="600"
            y2="660"
            stroke={CHARCOAL}
            strokeWidth="0.5"
            opacity="0.4"
          />

          {/* Corner index marks */}
          <g fill={CHARCOAL} opacity="0.55">
            <rect x="40" y="40" width="8" height="0.5" />
            <rect x="40" y="40" width="0.5" height="8" />
            <rect x="552" y="40" width="8" height="0.5" />
            <rect x="559.5" y="40" width="0.5" height="8" />
          </g>
        </svg>
      </div>
    );
  }

  // Case-study cover variants
  const palettes: Record<
    Exclude<CompositionVariant, "hero">,
    { bg: string; shape: string; accent: string }
  > = {
    a: { bg: "#E8DFCE", shape: TERRACOTTA, accent: CHARCOAL },
    b: { bg: "#D9CFB8", shape: CHARCOAL, accent: TERRACOTTA },
    c: { bg: "#EFE6D2", shape: "#8C3A20", accent: INK_SOFT },
  };
  const pal = palettes[variant];

  const compositions: Record<
    Exclude<CompositionVariant, "hero">,
    React.ReactNode
  > = {
    a: (
      <>
        <rect width="400" height="300" fill={pal.bg} />
        <circle cx="140" cy="160" r="110" fill={pal.shape} />
        <rect x="200" y="60" width="160" height="180" fill={pal.accent} />
        <circle
          cx="260"
          cy="150"
          r="56"
          fill="none"
          stroke={CREAM}
          strokeWidth="2"
        />
      </>
    ),
    b: (
      <>
        <rect width="400" height="300" fill={pal.bg} />
        <path
          d="M0 240 Q 100 60 200 200 T 400 120 L 400 300 L 0 300 Z"
          fill={pal.shape}
        />
        <circle cx="320" cy="80" r="44" fill={pal.accent} />
        <circle
          cx="100"
          cy="90"
          r="26"
          fill="none"
          stroke={pal.accent}
          strokeWidth="1"
        />
      </>
    ),
    c: (
      <>
        <rect width="400" height="300" fill={pal.bg} />
        <rect x="40" y="80" width="220" height="180" fill={pal.shape} />
        <circle cx="300" cy="180" r="80" fill={pal.accent} opacity="0.9" />
        <line
          x1="40"
          y1="80"
          x2="260"
          y2="260"
          stroke={CREAM}
          strokeWidth="1"
        />
      </>
    ),
  };

  return (
    <div className={className} ref={ref}>
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        {compositions[variant]}
      </svg>
    </div>
  );
}

export default AbstractComposition;
