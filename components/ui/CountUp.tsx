"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Counts from `from` to `to` once in view. Renders `to` for reduced motion. */
export function CountUp({
  from = 0,
  to,
  duration = 1.6,
  delay = 0,
  suffix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotionSafe();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (reduce) return setValue(to);
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
