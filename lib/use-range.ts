"use client";

import { transform, useTransform, type MotionValue } from "framer-motion";

/**
 * Like useTransform(value, input, output), but always computed on the JS side.
 * Framer Motion 12 otherwise hands scroll-linked opacity/transform to a native
 * ViewTimeline, which mis-maps target offsets (e.g. on tall pinned sections).
 */
export function useRange<T>(value: MotionValue<number>, input: number[], output: T[]): MotionValue<T> {
  return useTransform(value, transform(input, output) as (v: number) => T);
}
