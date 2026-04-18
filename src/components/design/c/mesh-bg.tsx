"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
 * Animated mesh gradient — three blurred radial blobs that slowly
 * drift and rotate. Indigo → cyan → magenta palette.
 * Pure CSS/SVG; no WebGL. Cheap to render, respectful of motion.
 * ------------------------------------------------------------------ */

interface MeshBgProps {
  className?: string;
  /** Intensity multiplier on blob opacity, default 1. */
  intensity?: number;
}

export function MeshBg({ className, intensity = 1 }: MeshBgProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Cyan blob — top-left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,211,238,0.35) 0%, rgba(34,211,238,0) 65%)",
          opacity: 0.65 * intensity,
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 60, -20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Indigo blob — center */}
      <motion.div
        className="absolute top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.42) 0%, rgba(99,102,241,0) 60%)",
          opacity: 0.6 * intensity,
          filter: "blur(60px)",
        }}
        animate={{
          x: ["-50%", "-45%", "-55%", "-50%"],
          y: ["-50%", "-60%", "-42%", "-50%"],
          scale: [1, 1.08, 1.18, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Magenta accent — bottom-right */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(232,121,249,0.22) 0%, rgba(232,121,249,0) 65%)",
          opacity: 0.55 * intensity,
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle conic rotation — background hue drift */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(34,211,238,0.06), rgba(99,102,241,0.06), rgba(232,121,249,0.05), rgba(34,211,238,0.06))",
          filter: "blur(70px)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default MeshBg;
