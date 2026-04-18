import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
 * Grid backdrop — faint 40px square grid rendered via CSS gradients.
 * Fills its positioned ancestor. Pointer-events disabled.
 * ------------------------------------------------------------------ */

interface GridLinesProps {
  className?: string;
  /** Grid cell size in px. Default 40. */
  size?: number;
  /** Line opacity 0–1. Default 0.04. */
  opacity?: number;
  /** Apply radial fade mask so grid dissolves at the edges. */
  fade?: boolean;
}

export function GridLines({
  className,
  size = 40,
  opacity = 0.04,
  fade = true,
}: GridLinesProps) {
  const color = `rgba(255,255,255,${opacity})`;
  const backgroundImage = [
    `linear-gradient(to right, ${color} 1px, transparent 1px)`,
    `linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
  ].join(", ");

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        className,
      )}
      style={{
        backgroundImage,
        backgroundSize: `${size}px ${size}px`,
        maskImage: fade
          ? "radial-gradient(ellipse at center, black 40%, transparent 85%)"
          : undefined,
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse at center, black 40%, transparent 85%)"
          : undefined,
      }}
    />
  );
}

export default GridLines;
