"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, isActive: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!isActive || hasRunRef.current || target <= 0) return;
    hasRunRef.current = true;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(target * easeOutQuint(progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isActive, target, durationMs]);

  return value;
}
