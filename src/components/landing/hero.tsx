"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/landing/hero-carousel";
import { goalPortfolios, type GoalPortfolio } from "@/components/landing/goal-portfolios";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { constants } from "@/components/common/constants";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });
  const [activeGoal, setActiveGoal] = useState<GoalPortfolio>(goalPortfolios[0]);

  return (
    <section ref={ref} className="relative w-full py-20 md:py-28 lg:py-32 bg-card overflow-hidden">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div
          className={cn("mx-auto max-w-3xl text-center animated-component")}
          data-in-view={isIntersecting}
        >
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Goal-Based Investing</div>
          <h1 className="mt-5 font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-gray-900 dark:text-gray-50">
            Map Your Life Goals to the Right Portfolio
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {"Every milestone — retirement, your child's education, a new home — needs a different mix of risk and time. We structure your investments around each goal, not just the market."}
          </p>
        </div>

        <div
          className={cn("mt-14 animated-component")}
          style={{ transitionDelay: "150ms" }}
          data-in-view={isIntersecting}
        >
          <HeroCarousel onActiveChange={setActiveGoal} />
        </div>

        <div
          className={cn("mt-10 flex flex-col items-center gap-3 animated-component")}
          style={{ transitionDelay: "250ms" }}
          data-in-view={isIntersecting}
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={constants.advisorAppLink}>
                {activeGoal.cta}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#services">Learn More</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">No spam. No obligation. Just a clear plan.</p>
        </div>
      </div>
    </section>
  );
}
