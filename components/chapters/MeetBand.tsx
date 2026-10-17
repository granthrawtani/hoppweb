"use client";

import { motion, useScroll } from "framer-motion";
import { useRange } from "@/lib/use-range";
import { useRef } from "react";
import { Pill } from "@/components/ui/Pill";
import { RevealLines } from "@/components/ui/Reveal";
import { ChapterLabel, SectionFrame } from "@/components/ui/SectionFrame";
import { BRAND } from "@/lib/site";

function ClipIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.5"] });

  const bandY = useRange(scrollYProgress, [0, 0.7], [-150, 0]);
  const bandOpacity = useRange(scrollYProgress, [0, 0.25], [0, 1]);
  const click = useRange(scrollYProgress, [0.7, 0.85], [0, 1]);
  const labels = useRange(scrollYProgress, [0.8, 1], [0, 1]);

  const ink = "#0F0F0F";
  const soft = "#BDBDBD";

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[420px]">
      <svg
        viewBox="0 0 420 480"
        role="img"
        aria-label={`Line drawing of a ${BRAND} band clipping onto a knee sleeve.`}
        className="h-auto w-full"
      >
        {/* Leg outline */}
        <path d="M150 0 C 156 70, 162 140, 156 200 C 150 250, 150 290, 162 330 C 172 380, 176 430, 178 480" fill="none" stroke={ink} strokeWidth="1.5" />
        <path d="M272 0 C 268 70, 262 140, 264 200 C 268 250, 270 290, 258 330 C 246 380, 240 430, 238 480" fill="none" stroke={ink} strokeWidth="1.5" />

        {/* Existing knee sleeve */}
        <path d="M155 196 C 149 246, 149 288, 160 330 L 259 330 C 271 288, 270 246, 265 196 Z" fill="#FAFAFA" stroke={ink} strokeWidth="1.5" />
        <path d="M156 208 Q 210 216 264 208" fill="none" stroke={soft} strokeWidth="1" />
        <path d="M159 318 Q 210 326 261 318" fill="none" stroke={soft} strokeWidth="1" />
        <ellipse cx="210" cy="268" rx="25" ry="30" fill="none" stroke={soft} strokeWidth="1" strokeDasharray="3 4" />

        {/* The band */}
        <motion.g data-motion style={{ y: bandY, opacity: bandOpacity }}>
          <path d="M152 226 Q 210 238 268 226 L 268 246 Q 210 258 152 246 Z" fill="#fff" stroke={ink} strokeWidth="1.5" />
          <rect x="184" y="219" width="52" height="40" rx="11" fill={ink} />
          <rect x="196" y="236" width="28" height="3" rx="1.5" fill="#fff" opacity="0.35" />
          <motion.circle cx="226" cy="229" r="3" fill="#1F7A4D" data-motion style={{ opacity: click }} />
        </motion.g>

        {/* Click marks */}
        <motion.g data-motion style={{ opacity: click }} stroke={ink} strokeWidth="1.5" strokeLinecap="round">
          <path d="M140 222 l-12 -6" />
          <path d="M138 238 h-14" />
          <path d="M280 222 l12 -6" />
          <path d="M282 238 h14" />
        </motion.g>

        {/* Labels */}
        <motion.g data-motion style={{ opacity: labels }} fontFamily="inherit" fontSize="13" fill="#6B6B6B">
          <path d="M236 239 H 330 V 150" fill="none" stroke={soft} strokeWidth="1" />
          <text x="330" y="140" textAnchor="middle" fill={ink} fontWeight="500">{BRAND} band</text>
          <path d="M160 300 H 70 V 380" fill="none" stroke={soft} strokeWidth="1" />
          <text x="70" y="400" textAnchor="middle">Your sleeve</text>
        </motion.g>
      </svg>
    </div>
  );
}

export function MeetBand() {
  return (
    <SectionFrame id="meet" chapter={3} label={`Meet ${BRAND}`} innerClassName="py-28 sm:py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <ChapterLabel n={3}>Meet {BRAND}</ChapterLabel>
          <div className="mt-8">
            <Pill>No new brace needed</Pill>
          </div>
          <RevealLines
            as="h2"
            className="headline mt-6 max-w-[16ch]"
            lines={["A band that clips onto the brace, sleeve, or strap you already wear."]}
          />
          <RevealLines
            className="lede mt-8 max-w-[38ch]"
            lines={[
              "It measures how each leg moves, anywhere you go.",
              "At home. At practice. In the gym.",
            ]}
            stagger={0.25}
          />
        </div>
        <ClipIllustration />
      </div>
    </SectionFrame>
  );
}
