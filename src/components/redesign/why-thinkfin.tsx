"use client";

import { useRef } from "react";
import { Cpu, GraduationCap, Compass } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const pillars = [
  {
    icon: Cpu,
    title: "Technology",
    description: "Structured digital experience.",
  },
  {
    icon: GraduationCap,
    title: "Expertise",
    description: "Professional financial guidance.",
  },
  {
    icon: Compass,
    title: "Your Goals",
    description: "A financial journey built around what matters to you.",
  },
];

export default function WhyThinkFin() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2 className="mx-auto max-w-3xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[#081B33]">
          Technology makes investing easier.
          <br className="hidden sm:block" /> Human expertise makes it meaningful.
        </h2>

        <div className="relative mx-auto mt-20 max-w-3xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col items-center text-center transition-all duration-700"
                  style={{
                    transitionDelay: `${i * 150}ms`,
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF3FF] text-[#1D5EFF]">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#081B33]">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm text-[#667085]">{pillar.description}</p>
                </div>
              );
            })}
          </div>

          <svg
            viewBox="0 0 300 90"
            className="mx-auto mt-2 hidden w-[70%] sm:block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[50, 150, 250].map((x, i) => (
              <path
                key={x}
                d={`M ${x} 0 C ${x} 45, 150 45, 150 88`}
                fill="none"
                stroke="#1D5EFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: isIntersecting ? 0 : 1,
                  transition: `stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1) ${400 + i * 150}ms`,
                  opacity: 0.35,
                }}
              />
            ))}
          </svg>

          <div
            className="relative z-10 mx-auto -mt-1 flex h-14 w-14 items-center justify-center rounded-full bg-[#081B33] text-sm font-bold text-white shadow-[0_10px_30px_rgba(8,27,51,0.3)] transition-all duration-700"
            style={{
              transitionDelay: "900ms",
              opacity: isIntersecting ? 1 : 0,
              transform: isIntersecting ? "scale(1)" : "scale(0.7)",
            }}
          >
            TF
          </div>
        </div>
      </div>
    </section>
  );
}
