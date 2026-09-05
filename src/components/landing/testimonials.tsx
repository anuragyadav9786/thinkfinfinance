/* eslint-disable react/no-unescaped-entities */
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Devender Singh",
    role: "Retired Army JCO",
    avatar: "DS",
    dataAiHint: "man portrait",
    testimonial: "After retiring from the Army, I was worried about managing my pension benefits. ThinkFin provided a clear roadmap to invest my hard-earned money safely while ensuring long-term growth. I feel financially secure today.",
  },
  {
    name: "Ankit Kumar",
    role: "Backend Developer",
    avatar: "AK",
    dataAiHint: "man portrait",
    testimonial: "My portfolio was scattered and inefficient. The team at ThinkFin helped me reshuffle my investments into the right assets based on my goals. Their data-driven approach is exactly what a tech professional looks for.",
  },
  {
    name: "Delivery Partner",
    role: "Zepto Rider",
    avatar: "DP",
    dataAiHint: "woman portrait",
    testimonial: "I didn't know much about savings, but ThinkFin taught me the importance of an emergency fund and how to start a small SIP. Now, I’m investing for my future, one step at a time.",
  },{
    name: "Saroj Prasad",
    role: "Software Engineer",
    avatar: "SP",
    dataAiHint: "man portrait",
    testimonial: "I was overwhelmed by the number of investment options. ThinkFin's personalized recommendations and easy-to-understand guidance helped me build a diversified portfolio that aligns with my risk tolerance and financial goals.",
  }
];

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const onInit = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);


  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }
 
    onInit(api);
    api.on("reInit", onInit);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onInit);
      api.off("select", onSelect);
    };
  }, [api, onInit, onSelect]);


  return (
    <section id="testimonials" ref={sectionRef} className="w-full py-20 md:py-24 lg:py-32 bg-card">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div 
          className={cn("flex flex-col items-center justify-center space-y-4 text-center mb-12 animated-component")}
          data-in-view={isIntersecting}
        >
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Testimonials</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We are proud to have helped so many individuals and families achieve their financial goals. Here's what some of them have to say about their experience with ThinkFin.
          </p>
        </div>
        <div 
          className={cn("relative animated-component")}
          data-in-view={isIntersecting}
        >
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 py-4">
              {testimonials.map((item, index) => {
                const isActive = current === index;
                return (
                  <CarouselItem 
                    key={index} 
                    className="md:basis-1/2 lg:basis-1/3 pl-4 cursor-pointer"
                    onClick={() => {
                        if (plugin.current) plugin.current.stop();
                        api?.scrollTo(index);
                    }}
                  >
                    <div className="p-2 h-full">
                      <Card 
                        className="h-full select-none flex flex-col justify-between p-6 transition-all duration-500"
                        style={{
                          transform: `scale(${isActive ? 1.05 : 0.95})`,
                          filter: `blur(${isActive ? 0 : 2}px)`,
                          opacity: isActive ? 1 : 0.7,
                          boxShadow: isActive ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" : "none",
                        }}
                      >
                        <CardContent className="p-0">
                          <p className="mb-6 text-muted-foreground italic">"{item.testimonial}"</p>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={item.image} alt={item.name} data-ai-hint={item.dataAiHint} />
                              <AvatarFallback>{item.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
