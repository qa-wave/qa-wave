import type { Metadata } from "next";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real engagements, measurable outcomes. See how qawave helped engineering teams achieve 74% test coverage, cut maintenance by 65%, and pass SOC 2 audits.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <div className="pt-16 md:pt-24" />
      <CaseStudiesSection />
      <CtaSection />
    </>
  );
}
