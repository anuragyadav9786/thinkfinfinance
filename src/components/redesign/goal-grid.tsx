"use client";

import { useRef } from "react";
import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { goalVisuals } from "@/components/redesign/data";
import { constants } from "@/components/common/constants";

export default function GoalGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section ref={ref} className="w-full bg-[#F7F8FA] py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <h2 className="mx-auto max-w-2xl text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[#081B33]">
          What are you investing for?
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {goalPortfolios.map((goal, i) => {
            const Icon = goal.icon;
            const visual = goalVisuals[goal.id];
            return (
              <Link
                key={goal.id}
                href={`${constants.advisorAppLink}?goal=${goal.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-[20px] transition-all duration-700"
                style={{
                  background: visual.gradient,
                  transitionDelay: isIntersecting ? `${i * 70}ms` : "0ms",
                  opacity: isIntersecting ? 1 : 0,
                  transform: isIntersecting ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <div className="absolute inset-0 bg-[#081B33]/0 transition-colors duration-300 group-hover:bg-[#081B33]/40" />
                <Icon
                  className="absolute right-3 top-3 h-6 w-6 text-white/80 transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-sm font-bold text-white sm:text-base">{goal.name}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-[11px] leading-snug text-white/75 opacity-0 transition-all duration-300 group-hover:mt-1.5 group-hover:max-h-16 group-hover:opacity-100">
                    {visual.tagline}
                  </p>
                  <div className="mt-2 flex max-h-0 items-center gap-1 overflow-hidden text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:max-h-8 group-hover:opacity-100">
                    Start plan
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
