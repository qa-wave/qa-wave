import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import {
  instrumentSerif,
  jetbrainsMono,
} from "@/components/design/a/fonts";
import { EditorialHero } from "@/components/design/a/hero";
import { EditorialProblem } from "@/components/design/a/problem";
import { EditorialApproach } from "@/components/design/a/approach";
import { EditorialCaseStudies } from "@/components/design/a/case-studies";
import { EditorialCta } from "@/components/design/a/cta";

export const metadata: Metadata = {
  title: "Design A — Editorial",
  description:
    "Variant A of the qawave.ai landing page. Editorial / longform magazine aesthetic.",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  Variant A — Editorial                                               */
/*  New Yorker / Bloomberg longform magazine. Off-white ground, deep    */
/*  ink, single red accent, serif display typography, asymmetric grid.  */
/* ------------------------------------------------------------------ */

export default function DesignVariantA() {
  return (
    <div
      className={cn(
        instrumentSerif.variable,
        jetbrainsMono.variable,
        "editorial-scope",
        "relative min-h-screen w-full overflow-x-hidden",
        "bg-[color:var(--paper)] text-[color:var(--ink-900)]"
      )}
    >
      {/* Scoped theme tokens and paper-grain texture */}
      <style>{`
        .editorial-scope {
          /* Editorial palette — not using global theme tokens */
          --paper: #FAFAF7;
          --ink-900: #0A0A0A;
          --ink-800: #1A1A1A;
          --ink-700: #3A3A3A;
          --ink-500: #767676;
          --ink-400: #A5A5A5;
          --ink-300: #D0D0CC;
          --ink-200: #E3E2DC;
          --ink-100: #EEEDE6;
          --accent-red: #C8102E;

          color-scheme: light;
          font-feature-settings: "kern", "liga", "calt";
          font-synthesis-weight: none;
        }

        /* Subtle paper-grain via layered radial-gradients */
        .editorial-scope::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            radial-gradient(
              circle at 20% 30%,
              rgba(10, 10, 10, 0.018) 0,
              transparent 40%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(10, 10, 10, 0.015) 0,
              transparent 45%
            ),
            repeating-radial-gradient(
              circle at 50% 50%,
              rgba(10, 10, 10, 0.008) 0,
              rgba(10, 10, 10, 0.008) 1px,
              transparent 1px,
              transparent 3px
            );
          mix-blend-mode: multiply;
          opacity: 0.65;
        }

        /* Vertical hairline rule down the right edge like a newspaper column */
        .editorial-scope::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 1px;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            var(--ink-200) 12%,
            var(--ink-200) 88%,
            transparent 100%
          );
          opacity: 0.6;
        }

        /* All descendants inherit sans body font by default */
        .editorial-scope {
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Override the global dark body background while this page is open */
        body:has(.editorial-scope) {
          background: var(--paper, #FAFAF7);
          color: var(--ink-900, #0A0A0A);
        }

        /* Hide the global dark navbar/footer on editorial variant page */
        body:has(.editorial-scope) > nav,
        body:has(.editorial-scope) main > footer,
        body:has(.editorial-scope) > footer {
          display: none;
        }

        /* Keep underlines crisp in editorial */
        .editorial-scope a {
          text-underline-offset: 3px;
        }
      `}</style>

      {/* All content above paper-grain overlay */}
      <div className="relative z-10">
        {/* Thin top border rule — like a published magazine edge */}
        <div
          aria-hidden
          className="h-1 w-full bg-[color:var(--ink-900)]"
        />

        <EditorialHero />
        <EditorialProblem />
        <EditorialApproach />
        <EditorialCaseStudies />
        <EditorialCta />

        {/* Bottom edition marque */}
        <div
          aria-hidden
          className="h-1 w-full bg-[color:var(--ink-900)]"
        />
      </div>
    </div>
  );
}
