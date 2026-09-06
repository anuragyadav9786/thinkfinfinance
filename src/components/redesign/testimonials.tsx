"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/components/redesign/data";

export default function RedesignTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: direction * 380, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="w-full bg-white py-[100px] sm:py-[140px]">
      <div className="mx-auto max-w-[1280px] px-[5vw]">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="text-center text-[clamp(32px,4vw,56px)] font-bold leading-tight tracking-tight text-[#081B33] sm:text-left">
            Trusted with important
            <br />
            financial decisions.
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollByCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6EAF0] text-[#667085] transition-colors duration-200 hover:border-[#1D5EFF] hover:text-[#1D5EFF]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollByCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6EAF0] text-[#667085] transition-colors duration-200 hover:border-[#1D5EFF] hover:text-[#1D5EFF]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="w-[320px] shrink-0 snap-center rounded-[24px] border border-[#E6EAF0] bg-[#F7F8FA] p-8 sm:w-[380px]"
            >
              <p className="text-[15px] leading-relaxed text-[#111827]">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#081B33] text-sm font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{t.name}</p>
                  <p className="text-xs text-[#667085]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
