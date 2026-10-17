"use client";

import { useEffect, useState } from "react";

/**
 * Hydration-safe reduced-motion flag: false on the server and first client
 * render, then the real preference. Use for logic (e.g. typing text);
 * visual styles are handled by the [data-motion] CSS overrides.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}
