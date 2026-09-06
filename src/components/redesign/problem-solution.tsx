"use client";

import { useRef } from "react";
import { X, Check } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const withoutItems = [
  "Too many investment options",
  "No clear financial direction",
  "Investments without defined goals",
  "Difficulty understanding risk",
];

const withItems = [
  "Start with your goals",
  "Understand your investment horizon",
  "Consider your risk profile",
  "Take a structured approach",
];

export default function ProblemSolution() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className="w-full bg-[#F7F8FA] py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2 className="mx-auto max-w-2xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[#081B33]">
          Investing should not feel complicated.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div
            className="rounded-[24px] bg-white p-8 shadow-[0_10px_40px_rgba(8,27,51,0.06)] transition-all duration-700"
            style={{ opacity: isIntersecting ? 0.55 : 1 }}
          >
            <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-[#667085]">
              Without a clear investment approach
            </p>
            <ul className="space-y-4">
              {withoutItems.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[16px] text-[#667085] transition-all duration-500"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    opacity: isIntersecting ? 0.6 : 1,
                    textDecoration: isIntersecting ? "line-through" : "none",
                  }}
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#667085]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] bg-[#081B33] p-8 shadow-[0_20px_60px_rgba(8,27,51,0.25)]">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-[#8FB0FF]">With ThinkFin</p>
            <ul className="space-y-4">
              {withItems.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[16px] font-medium text-white transition-all duration-500"
                  style={{
                    transitionDelay: `${300 + i * 120}ms`,
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting ? "translateX(0)" : "translateX(12px)",
                  }}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D5EFF]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
