"use client";

import { useState } from "react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative bg-ink text-white">
      <div className="mx-auto flex h-10 max-w-[var(--frame)] items-center justify-center px-12 text-[13px]">
        <a href="#waitlist" className="group inline-flex items-center gap-1.5 rounded font-medium">
          Now opening early access
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/70 hover:text-white"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
