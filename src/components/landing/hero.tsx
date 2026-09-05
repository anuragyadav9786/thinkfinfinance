"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import NseCarousel from "@/components/nse/IndicesCarousel";
import NseTicker from "@/components/nse/StockList";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { constants } from "@/components/common/constants";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section ref={ref} className="relative w-full md:py-32 lg:py-0 bg-card overflow-hidden">
      <NseTicker />
      <NseCarousel />
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center animated-component"
          )}
          data-in-view={isIntersecting}
        >
          <div className="md:mt-0 mt-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-gray-50">
              Your Path to Financial Freedom Starts Here
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              {"At ThinkFin, we provide personalized financial guidance to help you achieve your goals. Whether you're planning for retirement, managing investments, or securing your family's future, our expert advisors are here to help."}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row mt-4">
              <Button asChild size="lg">
                <Link href={constants.advisorAppLink}>Get Recommendation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#services">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto hidden md:block">
            <Image
              src="/homepage/image-3.png"
              alt="Financial planning meeting"
              width={440}
              height={785}
              className="mx-auto aspect-auto overflow-hidden rounded-xl object-cover object-center"
              data-ai-hint="financial planning"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
