"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Yogesh Singh Tanwar",
    role: "Chief Techinal Officier",
    image: "/our-team/yogesh-tanwar.jpg",
    dataAiHint: "man professional",
  },
  {
    name: "Hony Lt OP Singh Yadav",
    role: "IRDAI Certified Insurance Advisior",
    image: "/our-team/om-prakash.jpg",
    dataAiHint: "man professional",
  },
  {
    name: "Anurag Singh",
    role: "AMFI Registered Mutual Fund Distributors",
    image: "/our-team/anurag-singh.jpg",
    dataAiHint: "man turban",
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section id="team" ref={ref} className="w-full py-20 md:py-24 lg:py-32">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <div 
          className={cn("flex flex-col items-center justify-center space-y-4 text-center mb-12 animated-component")}
          data-in-view={isIntersecting}
        >
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Our Team</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Financial Experts</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our team of experienced and dedicated professionals is the backbone of ThinkFin. We are committed to providing you with the highest level of service and expertise.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {teamMembers.map((member, i) => (
            <Card 
              key={member.name} 
              className={cn("overflow-hidden text-center animated-component")}
              style={{ transitionDelay: `${i * 150}ms` }}
              data-in-view={isIntersecting}
            >
              <Image
                src={member.image}
                alt={`Photo of ${member.name}`}
                width={400}
                height={400}
                className="w-full h-auto aspect-square object-cover"
                data-ai-hint={member.dataAiHint}
              />
              <CardContent className="p-6">
                <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
