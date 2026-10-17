"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/site";
import { selectWaitlistRole } from "@/lib/waitlist-events";

const LINKS = [
  { href: "#gap", label: "Story" },
  { href: "#measures", label: "How it works" },
  { href: "#who", label: "Who it's for" },
  { href: "#faq", label: "FAQ" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[17px] font-semibold tracking-[-0.03em]", className)}>
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
        <rect x="1" y="6" width="18" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="7" y="4" width="6" height="12" rx="2.5" fill="currentColor" />
      </svg>
      {BRAND}
    </span>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 48));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[var(--frame)] items-center gap-6 px-5 sm:px-10">
        <a href="#top" className="rounded" aria-label={`${BRAND}, back to top`}>
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 text-[14px] text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <ButtonLink
            href="#waitlist"
            variant="secondary"
            size="sm"
            className="max-sm:hidden"
            onClick={() => selectWaitlistRole("clinic")}
          >
            For clinics
          </ButtonLink>
          <ButtonLink href="#waitlist" size="sm">
            Join the waitlist
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
