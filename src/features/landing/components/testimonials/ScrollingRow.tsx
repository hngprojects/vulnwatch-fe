"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { TestimonialType } from "../../types";
import TestimonialCard from "./TestimonialCard";

// Set to false to disable auto-scrolling across all rows.
const AUTOSCROLL_ENABLED = true;

const SCROLL_SPEED_PX_PER_SECOND = 50;

// Exported so Testimonials can compute the precise stagger offset.
// Must match the gap-5 class used on the track div below.
export const CARD_GAP_PX = 20;

interface ScrollingRowProps {
  testimonials: TestimonialType[];
  direction: "left" | "right";
  // Shifts the row's starting position in pixels for a staggered layout.
  initialOffset?: number;
}

// Renders a horizontally scrolling row of testimonial cards.
// Cards are duplicated so the loop appears seamless.
// Auto-scroll pauses while the user is dragging.
const ScrollingRow = ({
  testimonials,
  direction,
  initialOffset = 0,
}: ScrollingRowProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidth = useRef(0);

  // Use refs for values that drive animation — avoids re-renders on every frame.
  const xOffset = useRef(0);
  const isDragging = useRef(false);
  const dragStartClientX = useRef(0);
  const dragStartOffset = useRef(0);

  // useLayoutEffect runs before the browser paints, so the stagger offset
  // is applied before the user ever sees the component at its default position.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    loopWidth.current = track.scrollWidth / 2;

    // Right-scrolling rows start at the far end so they scroll into view correctly.
    const baseOffset = direction === "right" ? -loopWidth.current : 0;
    xOffset.current = baseOffset + initialOffset;
    track.style.transform = `translateX(${xOffset.current}px)`;
  }, [direction, initialOffset]);

  useEffect(() => {
    if (!AUTOSCROLL_ENABLED) return;
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId: number;
    let lastTimestamp: number | null = null;

    function tick(timestamp: number) {
      const delta = lastTimestamp ? timestamp - lastTimestamp : 0;
      lastTimestamp = timestamp;

      if (!isDragging.current) {
        const step = (SCROLL_SPEED_PX_PER_SECOND * delta) / 1000;

        if (direction === "left") {
          xOffset.current -= step;
          // Reset threshold accounts for initialOffset so the stagger is
          // preserved across loops rather than snapping back to 0.
          if (xOffset.current <= initialOffset - loopWidth.current) {
            xOffset.current += loopWidth.current;
          }
        } else {
          xOffset.current += step;
          if (xOffset.current >= initialOffset) {
            xOffset.current -= loopWidth.current;
          }
        }

        if (track) {
          track.style.transform = `translateX(${xOffset.current}px)`;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    }

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, initialOffset]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    isDragging.current = true;
    dragStartClientX.current = e.clientX;
    dragStartOffset.current = xOffset.current;
    // Capture the pointer so drag continues even if the cursor moves
    // outside the element before the mouse button is released.
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging.current || !trackRef.current) return;
    xOffset.current =
      dragStartOffset.current + (e.clientX - dragStartClientX.current);
    trackRef.current.style.transform = `translateX(${xOffset.current}px)`;
  }

  function onPointerUp() {
    isDragging.current = false;
  }

  return (
    <div className="overflow-x-hidden pb-px">
      <div
        ref={trackRef}
        className="flex cursor-grab gap-5 will-change-transform select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollingRow;
