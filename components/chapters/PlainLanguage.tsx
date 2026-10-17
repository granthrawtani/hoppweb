"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRange } from "@/lib/use-range";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ChapterLabel, SectionFrame } from "@/components/ui/SectionFrame";
import { BRAND } from "@/lib/site";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const MESSAGE = [
  { t: "Your left leg took " },
  { t: "31%", hl: true },
  { t: " of the landing force today, up from 24% last week." },
];
const FULL = MESSAGE.map((s) => s.t).join("");

function Typed({ count }: { count: number }) {
  let left = count;
  return (
    <>
      {MESSAGE.map((s, i) => {
        const shown = s.t.slice(0, Math.max(0, left));
        left -= s.t.length;
        return s.hl ? (
          <span key={i} className="font-semibold text-accent">
            {shown}
          </span>
        ) : (
          <span key={i}>{shown}</span>
        );
      })}
    </>
  );
}

function Notification() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.4"] });
  const chars = useRange(scrollYProgress, [0.1, 1], [0, FULL.length]);
  const [count, setCount] = useState(0);
  useMotionValueEvent(chars, "change", (v) => setCount(Math.round(v)));

  const n = reduce ? FULL.length : count;
  const typing = n > 0 && n < FULL.length;

  return (
    <div ref={ref}>
      <p className="eyebrow mb-3">Daily update · for you</p>
      <div className="rounded-[22px] border border-line bg-[#FAFAFA] p-3 sm:p-4">
        <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-ink text-[13px] font-semibold text-white">
              {BRAND[0]}
            </span>
            <div className="flex-1 text-[13px]">
              <p className="font-semibold">{BRAND}</p>
              <p className="text-muted">Today&apos;s update</p>
            </div>
            <span className="text-[12px] text-muted">now</span>
          </div>
          <p className="sr-only">{FULL}</p>
          {/* Full text reserves height; typed text overlays it so nothing shifts. */}
          <div aria-hidden className="relative mt-3 text-[17px] leading-snug tracking-[-0.01em] sm:text-[18px]">
            <span className="invisible">{FULL}</span>
            <span className="absolute inset-0">
              <Typed count={n} />
              {typing && <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-ink" />}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[12px] text-muted">Example preview</p>
    </div>
  );
}

const ROWS = [
  { label: "Max knee bend", value: "118°", change: "+6°" },
  { label: "Left-leg share of landing force", value: "31%", change: "+7 pts" },
  { label: "Tracked sessions", value: "5", change: "+1" },
  { label: "Avg. daily steps (from Apple Watch)", value: "6,240", change: "+410" },
];

function WeeklyReport() {
  return (
    <div>
      <p className="eyebrow mb-3">Weekly report · for your PT</p>
      <Card className="!p-0">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div>
            <p className="text-[16px] font-semibold tracking-[-0.01em]">[Patient name]</p>
            <p className="mt-1 text-[13px] text-muted">Left knee · Week 6 of recovery</p>
          </div>
          <Pill className="shrink-0 text-[12px]">Example preview</Pill>
        </div>
        <table className="w-full text-left text-[14px] [&_td]:whitespace-nowrap [&_thead_th]:whitespace-nowrap">
          <caption className="sr-only">Example weekly metrics with change from last week</caption>
          <thead className="text-[12px] text-muted">
            <tr>
              <th scope="col" className="px-5 pb-2 pt-4 font-normal sm:px-6">Metric</th>
              <th scope="col" className="px-2 pb-2 pt-4 text-right font-normal">This week</th>
              <th scope="col" className="px-5 pb-2 pt-4 text-right font-normal sm:px-6">vs. last</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <th scope="row" className="px-5 py-3 font-normal sm:px-6">{r.label}</th>
                <td className="px-2 py-3 text-right font-medium tabular-nums">{r.value}</td>
                <td className="px-5 py-3 text-right tabular-nums text-accent sm:px-6">{r.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-5 pt-2 sm:p-6 sm:pt-2">
          <div className="flex gap-3 rounded-xl border border-ink/80 p-4">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="mt-0.5 shrink-0">
              <path d="M9 2 L16.5 15.5 H1.5 Z" fill="none" stroke="#0F0F0F" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M9 7v4M9 13v.01" stroke="#0F0F0F" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className="text-[14px] leading-relaxed">
              <span className="font-semibold">Flag:</span> Knee bend was 9° lower on Thursday, the day after practice.
              Worth a check-in at the next visit.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function PlainLanguage() {
  return (
    <SectionFrame id="plain-language" chapter={5} label="Numbers, in plain language" innerClassName="py-28 sm:py-32">
      <ChapterLabel n={5}>Plain language</ChapterLabel>
      <RevealLines as="h2" className="headline mt-8 max-w-[16ch]" lines={["Numbers,", "in plain language."]} />
      <RevealLines
        className="lede mt-8 max-w-[44ch]"
        lines={["AI turns raw motion data into sentences you can act on. A short daily update for you. A weekly report for your PT, with the numbers and any warning signs."]}
      />
      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Notification />
        <Reveal>
          <WeeklyReport />
        </Reveal>
      </div>
    </SectionFrame>
  );
}
