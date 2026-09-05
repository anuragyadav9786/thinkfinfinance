"use client";

import { useState } from "react";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Services from "@/components/landing/services";
import BetterPath from "@/components/landing/better-path";
import Testimonials from "@/components/landing/testimonials";
import Team from "@/components/landing/team";
import Footer from "@/components/landing/footer";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";

export default function Home() {
  const [contactMessage, setContactMessage] = useState("");

  const handleSetMessage = (serviceTitle: string) => {
    setContactMessage(`I'd like to inquire about your ${serviceTitle} service.`);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services onLetsTalk={handleSetMessage} />
        <BetterPath />
        <Testimonials />
        <Team />
      </main>
      <Footer contactMessage={contactMessage} setContactMessage={setContactMessage} />
      <ScrollToTopButton />
    </div>
  );
}
