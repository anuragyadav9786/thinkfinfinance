"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { processSteps } from "@/components/redesign/data";
import { constants } from "@/components/common/constants";

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.15 });

  return (
    <section id="how-it-works" ref={ref} className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2 className="mx-auto max-w-2xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[#081B33]">
          Your investment journey starts with understanding you.
        </h2>

        <div className="relative mt-20 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-[#E6EAF0] md:block" />
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              className="relative transition-all duration-700"
              style={{
                transitionDelay: `${i * 150}ms`,
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#E6EAF0] bg-white text-sm font-bold text-[#1D5EFF]">
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#081B33]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#667085]">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={constants.advisorAppLink}
            className="group inline-flex items-center gap-2 rounded-[14px] bg-[#1D5EFF] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_40px_rgba(29,94,255,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#164fdb]"
          >
            Start Your Journey
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
