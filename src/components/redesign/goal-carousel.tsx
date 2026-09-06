"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { goalVisuals } from "@/components/redesign/data";
import { constants } from "@/components/common/constants";

const AUTO_ADVANCE_MS = 4500;
const DRAG_THRESHOLD = 60;
const TAP_THRESHOLD = 8;
const CARD_W = 300;
const CARD_H = 380;

type OffsetStyle = { x: number; scale: number; opacity: number; z: number };

const OFFSET_STYLES: Record<number, OffsetStyle> = {
  0: { x: 0, scale: 1, opacity: 1, z: 30 },
  1: { x: 210, scale: 0.86, opacity: 0.55, z: 20 },
  [-1]: { x: -210, scale: 0.86, opacity: 0.55, z: 20 },
  2: { x: 380, scale: 0.72, opacity: 0.22, z: 10 },
  [-2]: { x: -380, scale: 0.72, opacity: 0.22, z: 10 },
};

function signedDistance(index: number, active: number, length: number) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function GoalCarousel() {
  const length = goalPortfolios.length;
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const dragStartX = useRef<number | null>(null);
  const pressedIndexRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const goTo = useCallback(
    (index: number) => setActive(((index % length) + length) % length),
    [length]
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => setActive((c) => (c + 1) % length), AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isPaused, length]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    isDraggingRef.current = true;
    const cardEl = (e.target as HTMLElement).closest<HTMLElement>("[data-goal-index]");
    pressedIndexRef.current = cardEl ? Number(cardEl.dataset.goalIndex) : null;
    setIsPaused(true);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: relX * 10, y: relY * 10 });
  };

  // Tap-to-select and swipe-to-navigate are both resolved here, from the
  // drag distance alone — not from a separate onClick per card. A card's
  // on-screen position shifts the instant `active` changes, so a native
  // "click" synthesized after a swipe can land on a different card than the
  // one actually pressed and silently undo the swipe. Routing both
  // gestures through one measurement avoids that race entirely.
  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || dragStartX.current === null) {
      setIsPaused(false);
      return;
    }
    const deltaX = e.clientX - dragStartX.current;

    if (Math.abs(deltaX) < TAP_THRESHOLD) {
      if (pressedIndexRef.current !== null && pressedIndexRef.current !== active) {
        goTo(pressedIndexRef.current);
      }
    } else if (deltaX > DRAG_THRESHOLD) {
      prev();
    } else if (deltaX < -DRAG_THRESHOLD) {
      next();
    }

    dragStartX.current = null;
    pressedIndexRef.current = null;
    isDraggingRef.current = false;
    setIsPaused(false);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goTo(index);
    }
  };

  return (
    <div className="w-full">
      <div
        className="relative mx-auto h-[440px] w-full max-w-[720px] touch-pan-y select-none"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setParallax({ x: 0, y: 0 });
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          isDraggingRef.current = false;
          dragStartX.current = null;
          pressedIndexRef.current = null;
        }}
      >
        {goalPortfolios.map((goal, index) => {
          const distance = signedDistance(index, active, length);
          if (Math.abs(distance) > 2) return null;
          const style = OFFSET_STYLES[distance];
          const isActiveCard = distance === 0;
          const Icon = goal.icon;
          const visual = goalVisuals[goal.id];

          return (
            <div
              key={goal.id}
              role="button"
              tabIndex={0}
              data-goal-index={index}
              aria-label={`View ${goal.name} goal`}
              aria-current={isActiveCard}
              onKeyDown={(e) => handleCardKeyDown(e, index)}
              className={`absolute left-1/2 top-1/2 overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(8,27,51,0.25)] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActiveCard ? "cursor-default" : "cursor-pointer"
              } ${!isActiveCard ? "hidden sm:block" : ""}`}
              style={{
                width: CARD_W,
                height: CARD_H,
                transform: `translate(-50%, -50%) translateX(${style.x}px) scale(${style.scale})`,
                opacity: style.opacity,
                zIndex: style.z,
                background: visual.gradient,
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 opacity-[0.14] transition-transform duration-300"
                style={
                  isActiveCard
                    ? { transform: `translate(${parallax.x}px, ${parallax.y}px)` }
                    : undefined
                }
              >
                <Icon className="h-56 w-56 text-white" strokeWidth={1} />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#081B33] via-transparent to-transparent" />

              <div className="relative flex h-full flex-col justify-end p-7 text-left">
                <Icon className="mb-4 h-8 w-8 text-white/90" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-white">{goal.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{visual.tagline}</p>
                <p className="mt-4 text-sm font-semibold text-[#8FB0FF]">{goal.target}</p>

                {isActiveCard && (
                  <Link
                    href={`${constants.advisorAppLink}?goal=${goal.id}`}
                    className="group/cta relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 rounded-[10px] bg-white px-4 py-2.5 text-sm font-semibold text-[#081B33] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EEF3FF]"
                  >
                    Start This Plan
                    <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5">→</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous goal"
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6EAF0] bg-white text-[#667085] transition-all duration-200 hover:border-[#1D5EFF] hover:text-[#1D5EFF]"
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
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-7 bg-[#1D5EFF]" : "w-1.5 bg-[#E6EAF0]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next goal"
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6EAF0] bg-white text-[#667085] transition-all duration-200 hover:border-[#1D5EFF] hover:text-[#1D5EFF]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
