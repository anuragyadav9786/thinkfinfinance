"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "leadModalShown";
const SCROLL_DEPTH_THRESHOLD = 0.65;
const SCROLL_SETTLE_DELAY_MS = 200;

export function useLeadCaptureTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const hasFiredRef = useRef(false);
  const hasReachedScheduleRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (sessionStorage.getItem(SESSION_KEY)) {
      hasFiredRef.current = true;
      return undefined;
    }

    const fire = () => {
      if (hasFiredRef.current || hasReachedScheduleRef.current) return;
      hasFiredRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsOpen(true);
    };

    let settleTimeout: ReturnType<typeof setTimeout> | undefined;

    // Evaluated only once scrolling has paused, not on every intermediate
    // frame — a single fast scroll gesture straight from the top toward the
    // schedule section passes through the depth threshold before arriving,
    // and an unbuffered check would fire mid-transit instead of suppressing.
    const evaluateScrollPosition = () => {
      if (hasFiredRef.current) return;

      // "Reached" means the section is substantially in view (its top is in
      // the upper third of the viewport), not merely peeking at the bottom
      // edge — a loose "within one viewport" check can overlap with the
      // depth threshold below on tall viewports / shorter pages, permanently
      // suppressing the popup before it ever gets a chance to fire.
      const scheduleSection = document.getElementById("schedule");
      if (scheduleSection && scheduleSection.getBoundingClientRect().top < window.innerHeight * 0.3) {
        hasReachedScheduleRef.current = true;
        return;
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const scrolledFraction = window.scrollY / scrollableHeight;
      if (scrolledFraction >= SCROLL_DEPTH_THRESHOLD) {
        fire();
      }
    };

    const handleScroll = () => {
      if (hasFiredRef.current) return;
      clearTimeout(settleTimeout);
      settleTimeout = setTimeout(evaluateScrollPosition, SCROLL_SETTLE_DELAY_MS);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (hasFiredRef.current || hasReachedScheduleRef.current) return;
      const leftThroughTop = e.clientY <= 0 && !e.relatedTarget;
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      if (leftThroughTop && isFinePointer) {
        fire();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      clearTimeout(settleTimeout);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return {
    isOpen,
    close: () => setIsOpen(false),
  };
}
