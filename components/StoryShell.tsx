"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useRange } from "@/lib/use-range";
import { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "@/lib/site";

/**
 * Wraps chapters 01–07. Draws a 1px progress line over the left frame
 * border and a chapter counter in the left gutter on wide screens.
 */
export function StoryShell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  // Hand off to the finale, whose own borders draw inward.
  const lineOpacity = useRange(scrollYProgress, [0.985, 1], [1, 0]);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const visible = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const n = Number((e.target as HTMLElement).dataset.chapter);
          if (e.isIntersecting) visible.add(n);
          else visible.delete(n);
        }
        setActive(visible.size ? Math.max(...visible) : null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id="story" className="relative">
      {/* Progress line on the left frame border */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-[max(0px,calc(50%-600px))] z-30 w-px origin-top bg-ink"
        style={{ scaleY, opacity: lineOpacity }}
      />

      {/* Chapter counter, only where the gutter has room */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-8 left-[calc(50%-600px-160px)] z-30 hidden w-[136px] min-[1520px]:block"
      >
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-right"
            >
              <p className="text-[13px] font-medium tabular-nums text-ink">
                {String(active).padStart(2, "0")} <span className="text-muted">/ {String(CHAPTERS.length).padStart(2, "0")}</span>
              </p>
              <p className="mt-1 text-[12px] text-muted">{CHAPTERS[active - 1]?.label}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {children}
    </div>
  );
}
