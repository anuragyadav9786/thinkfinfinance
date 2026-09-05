"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { constants } from "@/components/common/constants";


export default function BetterPath() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div 
             className={cn(
                "relative flex justify-center h-[550px] animated-component",
             )}
             style={{ transitionDelay: "200ms" }}
             data-in-view={isIntersecting}
          >
            <div className="absolute inset-0 bg-secondary/30 rounded-full blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4 w-3/4 h-3/4"></div>
            <div className="w-[550px] h-[550px] overflow-hidden rounded-xl">
                 <Image
                    src="/homepage/image-2.png"
                    alt="Happy person using a phone"
                    width={550}
                    height={550}
                    className="object-cover w-auto h-auto"
                    data-ai-hint="man phone"
                />
            </div>
          </div>
          <div 
            className={cn(
                "space-y-6 animated-component",
            )}
            data-in-view={isIntersecting}
           >
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
              A better path is waiting, get inside of this
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                    With a focus on integrity, transparency, and trust, we forge lasting partnerships with our clients, working collaboratively to turn your financial goals into reality. Whether you&apos;re a seasoned investor or just starting on your financial journey, ThinkFin Finance is here to help you make informed decisions and build a brighter financial future.
                </p>
                <p>
                    Discover the difference that personalized financial guidance can make. Partner with ThinkFin Finance, and let&apos;s embark on this journey toward financial success together.
                </p>
            </div>
            <Button asChild size="lg">
              <Link href={constants.advisorAppLink}>Get Recommendation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
