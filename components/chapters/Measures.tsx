"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ChapterLabel, SectionFrame } from "@/components/ui/SectionFrame";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, amount: 0.6 } as const;

function BendGauge() {
  const arc = "M 20 110 A 90 90 0 0 1 200 110";
  return (
    <div className="relative mx-auto w-full max-w-[240px]">
      <svg viewBox="0 0 220 124" className="h-auto w-full" aria-hidden>
        <path d={arc} fill="none" stroke="#EDEDED" strokeWidth="10" strokeLinecap="round" />
        <motion.path
          data-motion
          d={arc}
          fill="none"
          stroke="#1F7A4D"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 118 / 150 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <text x="20" y="123" fontSize="10" fill="#6B6B6B" textAnchor="middle">0°</text>
        <text x="200" y="123" fontSize="10" fill="#6B6B6B" textAnchor="middle">150°</text>
      </svg>
      <p className="absolute inset-x-0 bottom-3 text-center text-[34px] font-semibold tracking-[-0.03em]">
        <CountUp to={118} suffix="°" />
      </p>
    </div>
  );
}

function ForceChart() {
  const d =
    "M0 82 L28 82 L34 40 L40 88 L46 80 L76 80 L82 30 L88 87 L94 80 L124 81 L130 44 L136 88 L142 81 L172 80 L178 20 L184 87 L190 80 L240 80";
  return (
    <svg viewBox="0 0 240 100" className="h-auto w-full" aria-hidden>
      <line x1="0" y1="92" x2="240" y2="92" stroke="#EDEDED" />
      <motion.path
        data-motion
        d={d}
        fill="none"
        stroke="#0F0F0F"
        strokeWidth="1.75"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEW}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.circle
        data-motion
        cx="178"
        cy="20"
        r="4"
        fill="#1F7A4D"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEW}
        transition={{ delay: 1.6, duration: 0.4 }}
      />
    </svg>
  );
}

function BalanceBar() {
  return (
    <div>
      <div className="flex justify-between text-[13px] text-muted">
        <span>Left</span>
        <span>Right</span>
      </div>
      <div className="mt-2 flex h-10 overflow-hidden rounded-lg border border-line">
        <motion.div
          data-motion
          className="h-full origin-left bg-accent"
          style={{ width: "31%" }}
          initial={{ scaleX: 24 / 31 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        />
        <div className="h-full flex-1 bg-[#F3F3F3]" />
      </div>
      <div className="mt-3 flex justify-between text-[22px] font-semibold tracking-[-0.02em]">
        <CountUp from={24} to={31} suffix="%" delay={0.4} />
        <CountUp from={76} to={69} suffix="%" delay={0.4} />
      </div>
    </div>
  );
}

const METRICS = [
  {
    title: "Bend",
    body: "How far your knee or joint bends, rep by rep.",
    viz: <BendGauge />,
    alt: "Example: an arc gauge sweeping from 0 to 118 degrees of knee bend.",
  },
  {
    title: "Landing force",
    body: "How hard each leg hits the ground when you land.",
    viz: <ForceChart />,
    alt: "Example: a line chart with four landing spikes, the last one highest.",
  },
  {
    title: "Left vs. right balance",
    body: "How much work each leg is really doing.",
    viz: <BalanceBar />,
    alt: "Example: a split bar moving from 24% left, 76% right to 31% left, 69% right.",
  },
];

export function Measures() {
  return (
    <SectionFrame id="measures" chapter={4} label="What it measures" innerClassName="py-28 sm:py-32">
      <div aria-hidden className="dot-grid absolute inset-x-0 top-0 h-[480px] opacity-70" />
      <div className="relative">
        <ChapterLabel n={4}>What it measures</ChapterLabel>
        <RevealLines
          as="h2"
          className="headline mt-8 max-w-[18ch]"
          lines={["Bend. Force. Balance.", "Measured between visits."]}
        />
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {METRICS.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 0.12} className="h-full">
              <Card className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{m.title}</h3>
                  <span className="text-[12px] text-muted">Example</span>
                </div>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{m.body}</p>
                <div role="img" aria-label={m.alt} className="mt-auto flex min-h-[150px] items-end pt-8 [&>*]:w-full">
                  {m.viz}
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <p className="mt-10 text-center text-[16px] text-muted">
            <span className="font-medium text-ink">Works anywhere:</span> at home, at practice, in the gym.
          </p>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
