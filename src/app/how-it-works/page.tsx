import type { Metadata } from "next";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From assessment to autonomous coverage in three phases. Learn how qawave implements agentic AI testing for your engineering team.",
};

export default function HowItWorksPage() {
  return (
    <>
      <div className="pt-16 md:pt-24" />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
