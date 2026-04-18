import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { UvpSection } from "@/components/sections/uvp-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { TechCredSection } from "@/components/sections/tech-cred-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <UvpSection />
      <HowItWorksSection />
      <CaseStudiesSection />
      <PortfolioSection />
      <SocialProofSection />
      <TechCredSection />
      <CtaSection />
    </>
  );
}
