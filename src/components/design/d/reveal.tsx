"use client";

// ============================================================
// Variant D — Sweep Reveal
// Uses mask-image to sweep content in from the left when it
// enters the viewport. Respects prefers-reduced-motion.
// ============================================================

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";

function subscribeReduce(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReduce() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReduceServer() {
  return false;
}

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
  delay?: number;
}

export function SweepReveal({
  children,
  className,
  as = "div",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReduce,
    getReduce,
    getReduceServer,
  );
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, reduceMotion]);

  const revealed = shown || reduceMotion;

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      data-reveal=""
      className={cn(revealed && "is-revealed", className)}
    >
      {children}
    </Tag>
  );
}

export default SweepReveal;
