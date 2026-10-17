"use client";

import { motion, useScroll } from "framer-motion";
import { useRange } from "@/lib/use-range";
import { useRef } from "react";
import { Pill } from "@/components/ui/Pill";
import { WaitlistForm } from "@/components/WaitlistForm";
import { BRAND } from "@/lib/site";

/**
 * The payoff. While pinned, the frame borders draw inward, the dotted grid
 * fades out, a closing line resolves, and the waitlist settles into the center.
 * With reduced motion it renders as a plain, static section.
 */
export function WaitlistFinale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const inset = useRange(p, [0.05, 0.45], [0, 1]);
  const grid = useRange(p, [0, 0.3], [1, 0]);
  const lineOpacity = useRange(p, [0.18, 0.34], [0, 1]);
  const lineY = useRange(p, [0.18, 0.34, 0.5, 0.68], [140, 120, 120, 0]);
  const formOpacity = useRange(p, [0.52, 0.7], [0, 1]);
  const formY = useRange(p, [0.52, 0.72], [40, 0]);

  // If someone tabs into the form before it has settled, jump to the settled position.
  function onFocusCapture() {
    if (p.get() < 0.7) document.getElementById("waitlist")?.scrollIntoView({ block: "start" });
  }

  return (
    <section
      ref={ref}
      aria-labelledby="waitlist-heading"
      className="relative mx-auto h-[240vh] w-full max-w-[var(--frame)] motion-reduce:h-auto"
    >
      {/* Anchor sits where the sticky stage is fully settled */}
      <div
        id="waitlist"
        aria-hidden
        className="pointer-events-none absolute left-0 h-px w-px top-[calc(100%-100svh)] motion-reduce:top-0"
      />

      <motion.div
        data-progress
        style={{ "--t": inset } as React.CSSProperties}
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5 pt-16 motion-reduce:static motion-reduce:h-auto motion-reduce:py-32"
      >
        <motion.div aria-hidden data-motion-hide className="dot-grid absolute inset-0" style={{ opacity: grid }} />

        {/* Frame borders that draw inward */}
        <span
          aria-hidden
          className="absolute inset-y-0 w-px bg-line"
          style={{ left: "calc(var(--t) * max(0px, (100% - 720px) / 2))" }}
        />
        <span
          aria-hidden
          className="absolute inset-y-0 w-px bg-line"
          style={{ right: "calc(var(--t) * max(0px, (100% - 720px) / 2))" }}
        />

        <div className="relative w-full max-w-[560px] text-center">
          <motion.p
            data-motion
            style={{ opacity: lineOpacity, y: lineY }}
            className="mx-auto max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
          >
            Recovery tracking that doesn&apos;t stop when you leave the clinic.
          </motion.p>

          <motion.div
            data-motion
            style={{ opacity: formOpacity, y: formY }}
            onFocusCapture={onFocusCapture}
            className="mt-10 sm:mt-14"
          >
            <Pill>Early access</Pill>
            <h2 id="waitlist-heading" className="mt-5 text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Join the waitlist
            </h2>
            <p className="mx-auto mt-3 max-w-[40ch] text-[17px] leading-relaxed text-muted">
              Be first to try {BRAND} when early access opens.
            </p>
            <div className="mt-8">
              <WaitlistForm />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
