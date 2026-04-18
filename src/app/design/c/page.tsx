import type { Metadata } from "next";
import { HeroC } from "@/components/design/c/hero";
import { ProblemC } from "@/components/design/c/problem";
import { ApproachC } from "@/components/design/c/approach";
import { CaseStudiesC } from "@/components/design/c/case-studies";
import { CtaC } from "@/components/design/c/cta";

export const metadata: Metadata = {
  title: "Design Variant C — Immersive Tech",
  description:
    "Variant C of the qawave.ai landing page — an immersive, AI-lab aesthetic with mesh gradients, glassmorphic surfaces, and live-feeling motion.",
  robots: { index: false, follow: false },
};

export default function DesignCPage() {
  return (
    <>
      <HeroC />
      <ProblemC />
      <ApproachC />
      <CaseStudiesC />
      <CtaC />
    </>
  );
}
