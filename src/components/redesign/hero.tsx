"use client";

import { constants } from "@/components/common/constants";
import GoalCarousel from "@/components/redesign/goal-carousel";

export default function RedesignHero() {
  const scrollToProcess = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[90vh] w-full flex-col justify-center overflow-hidden bg-[#F7F8FA] py-20">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-16 px-[5vw] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="animate-fade-up">
          <span className="inline-block rounded-full bg-[#EEF3FF] px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-[#1D5EFF]">
            INVEST WITH PURPOSE
          </span>
          <h1 className="mt-6 font-sans text-[clamp(48px,6vw,88px)] font-bold leading-[1.05] tracking-tight text-[#081B33]">
            Your Goals.
            <br />
            Your Money.
            <br />
            Your Future.
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#667085]">
            Every investment begins with a reason. Whether you&apos;re building wealth, buying your
            dream home, securing your family&apos;s future, or planning your retirement — start with
            a goal.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={constants.advisorAppLink}
              className="group inline-flex items-center gap-2 rounded-[14px] bg-[#1D5EFF] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_40px_rgba(29,94,255,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#164fdb]"
            >
              Explore Your Investment Plan
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <button
              type="button"
              onClick={scrollToProcess}
              className="inline-flex items-center gap-2 rounded-[14px] px-5 py-4 text-[15px] font-semibold text-[#081B33] transition-colors duration-200 hover:text-[#1D5EFF]"
            >
              How ThinkFin Works
              <span>↓</span>
            </button>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <GoalCarousel />
        </div>
      </div>
    </section>
  );
}
