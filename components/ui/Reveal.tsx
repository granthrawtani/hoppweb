"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const line: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Reveals each line with a fade + slight rise, staggered, once it scrolls into view.
 * Lines render as block spans inside a single semantic element.
 */
export function RevealLines({
  as: Tag = "p",
  lines,
  className,
  lineClassName,
  stagger = 0.12,
  amount = 0.5,
}: {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  amount?: number;
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {lines.map((l, i) => (
        <motion.span key={i} data-motion variants={line} className={cn("block", lineClassName)}>
          {l}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/** Generic single-block reveal. */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 18,
  amount = 0.3,
}: {
  as?: "div" | "li";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      data-motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
