"use client";

// ============================================================
// Variant D — Magnetic Button
// Attracts toward the cursor within a ~60px radius, then snaps
// back on mouse leave. Styled as a pill with warm accent.
// ============================================================

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  ariaLabel?: string;
}

const RADIUS = 80;
const MAX_PULL = 14;

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { damping: 20, stiffness: 260, mass: 0.4 });
  const ty = useSpring(my, { damping: 20, stiffness: 260, mass: 0.4 });

  // Child is pulled a bit less for parallax feel.
  const childX = useTransform(tx, (v) => v * 0.55);
  const childY = useTransform(ty, (v) => v * 0.55);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > RADIUS) {
      mx.set(0);
      my.set(0);
      return;
    }
    const pull = (1 - dist / RADIUS) * MAX_PULL;
    mx.set((dx / dist) * pull);
    my.set((dy / dist) * pull);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm uppercase tracking-[0.18em] transition-colors";
  const primary =
    "bg-[#1A1A1A] text-[#F5F2ED] hover:bg-[#C4553D]";
  const ghost =
    "border border-[#1A1A1A]/30 text-[#1A1A1A] hover:border-[#1A1A1A]";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: tx, y: ty }}
      className="inline-block"
    >
      {href ? (
        <motion.a
          href={href}
          aria-label={ariaLabel}
          data-cursor="hover"
          data-cursor-label="Go"
          style={{ x: childX, y: childY }}
          className={cn(base, variant === "primary" ? primary : ghost, className)}
        >
          <span className="relative z-10 flex items-center gap-3">{children}</span>
        </motion.a>
      ) : (
        <motion.button
          onClick={onClick}
          aria-label={ariaLabel}
          data-cursor="hover"
          data-cursor-label="Go"
          style={{ x: childX, y: childY }}
          className={cn(base, variant === "primary" ? primary : ghost, className)}
        >
          <span className="relative z-10 flex items-center gap-3">{children}</span>
        </motion.button>
      )}
    </motion.div>
  );
}

export default MagneticButton;
