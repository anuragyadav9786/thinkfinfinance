"use client";

import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (options: {
          url: string;
          color?: string;
          label?: string;
          target: HTMLElement;
        }) => void;
      };
    };
  }
}

const GOOGLE_CALENDAR_CSS_URL = "https://calendar.google.com/calendar/scheduling-button-script.css";
const GOOGLE_CALENDAR_SCRIPT_URL = "https://calendar.google.com/calendar/scheduling-button-script.js";
const GOOGLE_CALENDAR_SCHEDULING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0IOjRHdRc0xcjXmqjWiQtpmlydDXLkTsYkQULpsNMom652LCGhIM3ZTf_wztZxiT7OHDYv6wx-?gv=true";

export default function ScheduleAppointment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const buttonTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cssId = "google-calendar-scheduling-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = GOOGLE_CALENDAR_CSS_URL;
      document.head.appendChild(link);
    }

    const loadButton = () => {
      if (buttonTargetRef.current && window.calendar) {
        window.calendar.schedulingButton.load({
          url: GOOGLE_CALENDAR_SCHEDULING_URL,
          color: "#039BE5",
          label: "Book an appointment",
          target: buttonTargetRef.current,
        });
      }
    };

    const scriptId = "google-calendar-scheduling-js";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.calendar) {
        loadButton();
      } else {
        existingScript.addEventListener("load", loadButton);
      }
      return () => existingScript.removeEventListener("load", loadButton);
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = GOOGLE_CALENDAR_SCRIPT_URL;
    script.async = true;
    script.addEventListener("load", loadButton);
    document.body.appendChild(script);

    return () => script.removeEventListener("load", loadButton);
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="w-full py-20 md:py-24 lg:py-32 bg-background">
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

        <div
          className={cn(
            "mt-10 flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-10 animated-component"
          )}
          style={{ transitionDelay: "150ms" }}
          data-in-view={isIntersecting}
        >
          <div ref={buttonTargetRef} />
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 text-primary" />
          Prefer to talk first? Call us at{" "}
          <a href="tel:+917503080522" className="font-medium text-primary hover:underline">
            +91 7503080522
          </a>
        </p>
      </div>
    </section>
  );
}
