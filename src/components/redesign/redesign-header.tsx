"use client";

import Link from "next/link";
import { constants } from "@/components/common/constants";

export default function RedesignHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E6EAF0] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-[5vw]">
        <Link href="/redesign" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#081B33] text-sm font-bold text-white">
            T
          </span>
          <span className="text-lg font-bold tracking-tight text-[#111827]">ThinkFin</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#667085] md:flex">
          <a href="#how-it-works" className="transition-colors duration-200 hover:text-[#111827]">
            How It Works
          </a>
          <a href="#ecosystem" className="transition-colors duration-200 hover:text-[#111827]">
            Services
          </a>
          <a href="#testimonials" className="transition-colors duration-200 hover:text-[#111827]">
            Stories
          </a>
          <a href="#faq" className="transition-colors duration-200 hover:text-[#111827]">
            FAQ
          </a>
        </nav>

        <a
          href={constants.advisorAppLink}
          className="group inline-flex items-center gap-1.5 rounded-[12px] bg-[#1D5EFF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(8,27,51,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#164fdb]"
        >
          Start Investing
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </header>
  );
}
