"use client";

import { useEffect, useRef, useState } from "react";
import { Target, Clock, SlidersHorizontal, Rocket } from "lucide-react";
import { productShowcaseSteps } from "@/components/redesign/data";
import { goalPortfolios } from "@/components/landing/goal-portfolios";

const stepIcons = [Target, Clock, SlidersHorizontal, Rocket];

function MockFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[20px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-[#E6EAF0] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E6EAF0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E6EAF0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E6EAF0]" />
        <span className="ml-3 h-5 flex-1 rounded-md bg-[#F7F8FA]" />
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function MockScreen({ index }: { index: number }) {
  if (index === 0) {
    return (
      <MockFrame>
        <p className="mb-4 text-sm font-semibold text-[#081B33]">What are you investing for?</p>
        <div className="grid grid-cols-3 gap-2.5">
          {goalPortfolios.slice(0, 5).map((goal, i) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.id}
                className={`flex aspect-square flex-col items-center justify-center gap-1.5 rounded-[12px] border text-center ${
                  i === 0 ? "border-[#1D5EFF] bg-[#EEF3FF]" : "border-[#E6EAF0] bg-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${i === 0 ? "text-[#1D5EFF]" : "text-[#667085]"}`} strokeWidth={1.75} />
                <span className="px-1 text-[9px] font-medium leading-tight text-[#081B33]">{goal.name}</span>
              </div>
            );
          })}
        </div>
      </MockFrame>
    );
  }

  if (index === 1) {
    return (
      <MockFrame>
        <p className="mb-6 text-sm font-semibold text-[#081B33]">When will you need this money?</p>
        <div className="relative h-1.5 rounded-full bg-[#EEF3FF]">
          <div className="h-1.5 w-[65%] rounded-full bg-[#1D5EFF]" />
          <div className="absolute -top-1.5 left-[65%] h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#1D5EFF] bg-white shadow" />
        </div>
        <div className="mt-3 flex justify-between text-[10px] font-medium text-[#667085]">
          <span>1 Yr</span>
          <span className="text-[#1D5EFF]">15 Yrs</span>
          <span>30 Yrs</span>
        </div>
        <div className="mt-8 rounded-[12px] bg-[#F7F8FA] p-4 text-xs text-[#667085]">
          A longer horizon means more room for growth-oriented investments.
        </div>
      </MockFrame>
    );
  }

  if (index === 2) {
    return (
      <MockFrame>
        <p className="mb-5 text-sm font-semibold text-[#081B33]">How do market dips make you feel?</p>
        <div className="space-y-2.5">
          {["I'd get uneasy and want safety first", "I can stay steady through some ups and downs", "I'm comfortable riding out volatility for growth"].map(
            (option, i) => (
              <div
                key={option}
                className={`rounded-[10px] border px-3.5 py-3 text-xs font-medium ${
                  i === 1 ? "border-[#1D5EFF] bg-[#EEF3FF] text-[#081B33]" : "border-[#E6EAF0] text-[#667085]"
                }`}
              >
                {option}
              </div>
            )
          )}
        </div>
      </MockFrame>
    );
  }

  return (
    <MockFrame>
      <div className="flex flex-col items-center py-4 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF3FF]">
          <Rocket className="h-6 w-6 text-[#1D5EFF]" strokeWidth={1.75} />
        </div>
        <p className="text-sm font-semibold text-[#081B33]">Your approach is ready</p>
        <p className="mt-1.5 max-w-[220px] text-xs text-[#667085]">
          A structured, goal-based plan built around your inputs — ready to begin.
        </p>
        <div className="mt-5 w-full rounded-[10px] bg-[#1D5EFF] py-2.5 text-xs font-semibold text-white">
          Start Investing
        </div>
      </div>
    </MockFrame>
  );
}

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / total, 0), 0.999);
      const index = Math.floor(progress * productShowcaseSteps.length);
      setActiveIndex(Math.min(Math.max(index, 0), productShowcaseSteps.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="product"
      ref={containerRef}
      className="relative w-full bg-[#081B33]"
      style={{ height: `${productShowcaseSteps.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-16 px-[5vw] lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8FB0FF]">
              ThinkFin Advisor
            </span>
            <h2 className="mt-4 text-[clamp(32px,4vw,52px)] font-bold leading-tight tracking-tight text-white">
              A smarter way to start investing.
            </h2>

            <div className="mt-10 space-y-1">
              {productShowcaseSteps.map((step, i) => {
                const StepIcon = stepIcons[i];
                const isActive = i === activeIndex;
                return (
                  <div
                    key={step.title}
                    className="flex gap-4 border-l-2 py-3.5 pl-5 transition-colors duration-500"
                    style={{ borderColor: isActive ? "#1D5EFF" : "rgba(255,255,255,0.12)" }}
                  >
                    <StepIcon
                      className="mt-0.5 h-4 w-4 shrink-0 transition-colors duration-300"
                      style={{ color: isActive ? "#1D5EFF" : "rgba(255,255,255,0.35)" }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold transition-colors duration-300"
                        style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)" }}
                      >
                        {step.title}
                      </p>
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{ maxHeight: isActive ? 60 : 0, opacity: isActive ? 1 : 0 }}
                      >
                        <p className="mt-1.5 text-sm leading-relaxed text-white/60">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-[380px]">
            {productShowcaseSteps.map((step, i) => (
              <div
                key={step.title}
                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex ? "scale(1) translateY(0)" : "scale(0.94) translateY(16px)",
                }}
              >
                <MockScreen index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
