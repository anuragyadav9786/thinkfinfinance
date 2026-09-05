"use client";

import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import TrustStrip from "@/components/landing/trust-strip";
import Services from "@/components/landing/services";
import Calculators from "@/components/landing/calculators";
import BetterPath from "@/components/landing/better-path";
import Testimonials from "@/components/landing/testimonials";
import Team from "@/components/landing/team";
import ScheduleAppointment from "@/components/landing/schedule-appointment";
import Footer from "@/components/landing/footer";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";

export default function Home() {
  const handleLetsTalk = () => {
    const scheduleSection = document.getElementById("schedule");
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Services onLetsTalk={handleLetsTalk} />
        <Calculators />
        <BetterPath />
        <Testimonials />
        <Team />
        <ScheduleAppointment />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
