"use client";

// ============================================================
// Variant D — Custom Cursor
// 24px circle following the mouse with spring physics.
// Expands to 48px on hover over links/buttons and shows "View".
// Disabled on touch/coarse-pointer devices.
// ============================================================

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING = { damping: 26, stiffness: 320, mass: 0.45 };

// --- Media-query store: subscribe once, read synchronously.
function subscribeFine(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getFine() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}
function getFineServer() {
  return false;
}

export function LuxuryCursor() {
  const enabled = useSyncExternalStore(subscribeFine, getFine, getFineServer);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string>("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, SPRING);
  const y = useSpring(mouseY, SPRING);

  useEffect(() => {
    if (!enabled) return;

    function onMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    function findHoverTarget(el: EventTarget | null): HTMLElement | null {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        if (!node.dataset) return null;
        if (
          node.tagName === "A" ||
          node.tagName === "BUTTON" ||
          node.dataset.cursor === "hover" ||
          node.getAttribute("role") === "button"
        ) {
          return node;
        }
        node = node.parentElement;
      }
      return null;
    }

    function onOver(e: MouseEvent) {
      const target = findHoverTarget(e.target);
      if (target) {
        setHovering(true);
        setLabel(target.dataset.cursorLabel || "View");
      }
    }
    function onOut(e: MouseEvent) {
      const target = findHoverTarget(e.target);
      if (target) {
        setHovering(false);
        setLabel("");
      }
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // Hide native cursor (scoped via CSS on layout).
    document.documentElement.classList.add("luxury-cursor-active");

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("luxury-cursor-active");
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-multiply"
      style={{ x, y }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        animate={{
          width: hovering ? 64 : 20,
          height: hovering ? 64 : 20,
          backgroundColor: hovering ? "#C4553D" : "#1A1A1A",
          x: hovering ? -32 : -10,
          y: hovering ? -32 : -10,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F2ED]"
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default LuxuryCursor;
