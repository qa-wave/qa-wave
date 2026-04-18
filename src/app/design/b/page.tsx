import { Sidebar } from "@/components/design/b/sidebar";
import { Hero } from "@/components/design/b/hero";
import { Problem } from "@/components/design/b/problem";
import { Approach } from "@/components/design/b/approach";
import { CaseStudies } from "@/components/design/b/case-studies";
import { Cta } from "@/components/design/b/cta";

/* ------------------------------------------------------------------ */
/*  qawave.ai — Variant B // SWISS MONO                                */
/*  Linear / Stripe precision engineering aesthetic.                   */
/* ------------------------------------------------------------------ */

export default function DesignBPage() {
  return (
    <div className="relative min-h-screen bg-black text-[#FAFAFA]">
      <Sidebar />

      {/* Main content column — offset by sidebar width on lg+ */}
      <div className="lg:pl-56">
        <Hero />
        <Problem />
        <Approach />
        <CaseStudies />
        <Cta />
      </div>
    </div>
  );
}
