"use client";

import { motion, useScroll } from "framer-motion";
import { useRange } from "@/lib/use-range";
import { useRef } from "react";
import { ChapterLabel, SectionFrame } from "@/components/ui/SectionFrame";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useRange(scrollYProgress, [0, 1], [0, -80]);
  const fade = useRange(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <SectionFrame id="moment" chapter={1} label="The moment" className="overflow-hidden" innerClassName="!px-0">
      <div ref={ref} className="relative flex min-h-[calc(100svh-6.5rem)] flex-col justify-center px-5 py-24 sm:px-10 lg:px-16">
        <div aria-hidden className="dot-grid fade-in absolute inset-0" />

        {/* Entrance uses CSS (no hydration wait) so the headline paints fast. */}
        <motion.div data-motion style={{ y, opacity: fade }} className="relative">
          <div className="rise">
            <ChapterLabel n={1}>The moment</ChapterLabel>
          </div>
          <h1 className="display mt-8">
            <span className="rise block" style={{ animationDelay: "80ms" }}>
              Recovery doesn&apos;t
            </span>
            <span className="rise block" style={{ animationDelay: "200ms" }}>
              happen in the clinic.
            </span>
          </h1>
          <p className="lede rise mt-8 max-w-[34ch]" style={{ animationDelay: "420ms" }}>
            It happens in the 165 hours a week you&apos;re on your own.
          </p>
        </motion.div>

        <a
          href="#gap"
          className="absolute bottom-8 left-5 flex items-center gap-3 rounded text-[13px] text-muted hover:text-ink sm:left-10 lg:left-16"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <motion.span
              data-motion-hide
              className="absolute inset-x-0 top-0 h-4 bg-ink"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          Scroll to read the story
        </a>
      </div>
    </SectionFrame>
  );
}
