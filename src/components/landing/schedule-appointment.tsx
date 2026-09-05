"use client";

import { useRef } from "react";
import { CalendarClock, Phone } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export default function ScheduleAppointment() {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <section id="schedule" ref={ref} className="w-full py-20 md:py-24 lg:py-32 bg-background">
      <div className="container max-w-3xl px-4 md:px-6 mx-auto text-center">
        <div className={cn("space-y-4 animated-component")} data-in-view={isIntersecting}>
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Book a Call</div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Get Your Free Portfolio Review
          </h2>
          <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Pick a slot that works for you. A 30-minute call, zero pressure, one clear next step.
          </p>
        </div>

        {/*
          Embed a scheduling widget here, e.g.:
          <div className="calendly-inline-widget" data-url="https://calendly.com/your-handle/portfolio-review" style={{ minWidth: '320px', height: '650px' }} />
          or the Cal.com <Cal /> embed component.
        */}
        <div
          className={cn(
            "mt-10 flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card p-10 animated-component"
          )}
          style={{ transitionDelay: "150ms" }}
          data-in-view={isIntersecting}
        >
          <CalendarClock className="h-9 w-9 text-primary" strokeWidth={1.5} />
          <p className="text-sm font-medium">Scheduling widget goes here</p>
          <p className="max-w-xs text-xs text-muted-foreground">
            Connect a Calendly or Cal.com embed to let visitors book a call instantly.
          </p>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 text-primary" />
          Prefer to talk first? Call us at{" "}
          <a href="tel:+917290010081" className="font-medium text-primary hover:underline">
            +91 72900 10081
          </a>
        </p>
      </div>
    </section>
  );
}
