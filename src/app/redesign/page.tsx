import type { Metadata } from "next";
import RedesignStyles from "@/components/redesign/redesign-styles";
import RedesignHeader from "@/components/redesign/redesign-header";
import RedesignHero from "@/components/redesign/hero";
import TrustBar from "@/components/redesign/trust-bar";
import ProblemSolution from "@/components/redesign/problem-solution";
import HowItWorks from "@/components/redesign/how-it-works";
import ProductShowcase from "@/components/redesign/product-showcase";
import Ecosystem from "@/components/redesign/ecosystem";
import WhyThinkFin from "@/components/redesign/why-thinkfin";
import GoalGrid from "@/components/redesign/goal-grid";
import RedesignTestimonials from "@/components/redesign/testimonials";
import Insights from "@/components/redesign/insights";
import RedesignFaq from "@/components/redesign/faq";
import FinalCta from "@/components/redesign/final-cta";
import RedesignFooter from "@/components/redesign/redesign-footer";

export const metadata: Metadata = {
  title: "ThinkFin — Invest With Purpose",
  description: "Your goals. Your money. Your future. A modern, goal-based way to start investing with ThinkFin.",
};

export default function RedesignPage() {
  return (
    <div className="redesign-root bg-[#F7F8FA]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <RedesignStyles />

      <RedesignHeader />
      <main>
        <RedesignHero />
        <TrustBar />
        <ProblemSolution />
        <HowItWorks />
        <ProductShowcase />
        <Ecosystem />
        <WhyThinkFin />
        <GoalGrid />
        <RedesignTestimonials />
        <Insights />
        <RedesignFaq />
        <FinalCta />
      </main>
      <RedesignFooter />
    </div>
  );
}
