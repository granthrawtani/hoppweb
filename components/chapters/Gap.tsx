"use client";

import { motion, useScroll } from "framer-motion";
import { useRange } from "@/lib/use-range";
import { useRef } from "react";
import { RevealLines } from "@/components/ui/Reveal";
import { ChapterLabel, SectionFrame } from "@/components/ui/SectionFrame";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Three one-hour PT sessions: Mon, Wed, Fri at 10am.
const CLINIC = new Set([0 * 24 + 10, 2 * 24 + 10, 4 * 24 + 10]);

function WeekGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.45"] });
  // Cells appear in order; clinic hours darken once the grid is complete.
  const p = useRange(scrollYProgress, [0, 0.8], [0, 1]);
  const clinic = useRange(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <figure ref={ref} className="mt-16 max-w-[840px] sm:mt-20">
      <motion.div
        data-progress
        role="img"
        aria-label="A week as 168 hourly cells. Only 3 are filled for time with a physical therapist; the other 165 are empty."
        style={{ "--p": p, "--c": clinic } as React.CSSProperties}
        className="grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-[3px] sm:grid-cols-[3rem_1fr]"
      >
        {DAYS.map((day, d) => (
          <div key={day} className="contents">
            <span className="self-center text-[11px] text-muted sm:text-[12px]">{day}</span>
            <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-[3px]">
              {Array.from({ length: 24 }, (_, h) => {
                const i = d * 24 + h;
                const isClinic = CLINIC.has(i);
                return (
                  <span
                    key={h}
                    className="relative aspect-square rounded-[2px] bg-[#efefef]"
                    style={{ opacity: `clamp(0, calc(var(--p) * 168 - ${i}), 1)` }}
                  >
                    {isClinic && (
                      <span
                        className="absolute inset-0 rounded-[2px] bg-ink"
                        style={{ opacity: "var(--c)" }}
                      />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
      <figcaption className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-muted">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-[2px] bg-ink" />
          With your PT: 3 hours
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-[2px] bg-[#efefef]" />
          On your own: 165 hours
        </span>
      </figcaption>
    </figure>
  );
}

export function Gap() {
  return (
    <SectionFrame id="gap" chapter={2} label="The gap" innerClassName="py-28 sm:py-32">
      <ChapterLabel n={2}>The gap</ChapterLabel>
      <RevealLines
        as="h2"
        className="headline mt-8 max-w-[22ch]"
        lines={["You get hurt.", "You see a PT a few hours a week.", "The rest of the time, you're guessing."]}
        lineClassName="[&:nth-child(3)]:text-muted"
        stagger={0.35}
        amount={0.6}
      />
      <RevealLines
        className="mt-14 space-y-2 text-[20px] leading-snug tracking-[-0.01em] sm:text-[22px]"
        lines={["Are you favoring one leg?", "Was that landing too hard?", "Is today progress, or a setback?"]}
        stagger={0.3}
        amount={0.8}
      />
      <WeekGrid />
    </SectionFrame>
  );
}
