"use client";

import { useState, useEffect, useRef, useCallback, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { goalPortfolios, type GoalPortfolio } from "@/components/landing/goal-portfolios";

const AUTO_ADVANCE_MS = 4000;
const SWIPE_THRESHOLD = 40;
const CARD_W = 240;
const CARD_H = 260;

type OffsetStyle = { x: number; scale: number; opacity: number; z: number; rotate: number };

// Card layout by signed distance from the active card (0 = center).
const OFFSET_STYLES: Record<number, OffsetStyle> = {
  0: { x: 0, scale: 1, opacity: 1, z: 30, rotate: 0 },
  1: { x: 165, scale: 0.78, opacity: 0.55, z: 20, rotate: -8 },
  [-1]: { x: -165, scale: 0.78, opacity: 0.55, z: 20, rotate: 8 },
  2: { x: 295, scale: 0.55, opacity: 0.25, z: 10, rotate: -12 },
  [-2]: { x: -295, scale: 0.55, opacity: 0.25, z: 10, rotate: 12 },
};

const ALLOCATION_COLORS = ["bg-primary", "bg-[hsl(var(--chart-4))]", "bg-muted-foreground/40"];

function signedDistance(index: number, active: number, length: number) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

interface HeroCarouselProps {
  onActiveChange?: (goal: GoalPortfolio) => void;
}

export default function HeroCarousel({ onActiveChange }: HeroCarouselProps) {
  const length = goalPortfolios.length;
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % length) + length) % length);
    },
    [length]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    onActiveChange?.(goalPortfolios[active]);
  }, [active, onActiveChange]);

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isPaused, length]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD) prev();
    else if (deltaX < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      <div
        className="relative mx-auto h-[280px] w-full max-w-3xl select-none"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {goalPortfolios.map((goal, index) => {
          const distance = signedDistance(index, active, length);
          if (Math.abs(distance) > 2) return null;

          const style = OFFSET_STYLES[distance];
          const Icon = goal.icon;
          const isActiveCard = distance === 0;

          return (
            <button
              key={goal.id}
              type="button"
              aria-label={`View ${goal.name} portfolio`}
              aria-current={isActiveCard}
              onClick={() => goTo(index)}
              className={cn(
                "absolute left-1/2 top-1/2 rounded-2xl border bg-card text-card-foreground shadow-xl transition-all duration-500 ease-out",
                isActiveCard ? "border-primary cursor-default" : "border-border cursor-pointer hover:opacity-80",
                !isActiveCard && "hidden sm:block"
              )}
              style={{
                width: CARD_W,
                height: CARD_H,
                transform: `translate(-50%, -50%) translateX(${style.x}px) scale(${style.scale}) rotateY(${style.rotate}deg)`,
                opacity: style.opacity,
                zIndex: style.z,
              }}
            >
              <div className="flex h-full flex-col p-4 text-left">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="font-headline text-base font-semibold">{goal.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{goal.target}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">{goal.blurb}</p>

                <div className="mt-auto space-y-1.5 pt-2">
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                    {goal.allocation.map((slice, i) => (
                      <div
                        key={slice.label}
                        className={ALLOCATION_COLORS[i % ALLOCATION_COLORS.length]}
                        style={{ width: `${slice.pct}%` }}
                        title={`${slice.label} ${slice.pct}%`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                    {goal.allocation.map((slice) => (
                      <span key={slice.label}>
                        {slice.label} {slice.pct}%
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                    {goal.horizon}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous goal"
          onClick={prev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {goalPortfolios.map((goal, index) => (
            <button
              key={goal.id}
              type="button"
              aria-label={`Go to ${goal.name}`}
              onClick={() => goTo(index)}
              className={cn("h-2 rounded-full transition-all", index === active ? "w-6 bg-primary" : "w-2 bg-border")}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next goal"
          onClick={next}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
