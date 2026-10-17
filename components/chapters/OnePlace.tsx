"use client";

import { motion, useScroll, type MotionValue } from "framer-motion";
import { useRange } from "@/lib/use-range";
import { useRef } from "react";
import { RevealLines } from "@/components/ui/Reveal";
import { ChapterLabel, SectionFrame } from "@/components/ui/SectionFrame";
import { BRAND } from "@/lib/site";

type Chip = { x: number; y: number; w: number; label: string };

const INPUTS = ["Apple Watch", "Whoop", `${BRAND} band`];
const OUTPUTS = ["Daily update", "PT weekly report"];

function Diagram({
  progress,
  width,
  height,
  inputs,
  outputs,
  hub,
  link,
  className,
}: {
  progress: MotionValue<number>;
  width: number;
  height: number;
  inputs: Chip[];
  outputs: Chip[];
  hub: { x: number; y: number; w: number; h: number };
  link: (from: Chip, to: "in" | "out") => string;
  className?: string;
}) {
  const lines = useRange(progress, [0.1, 0.6], [0, 1]);
  const hubIn = useRange(progress, [0.45, 0.65], [0, 1]);
  const outs = useRange(progress, [0.6, 0.9], [0, 1]);
  const chipsIn = useRange(progress, [0, 0.2], [0, 1]);

  const chip = (c: Chip, opacity: MotionValue<number>) => (
    <motion.g key={c.label} data-motion style={{ opacity }}>
      <rect x={c.x} y={c.y} width={c.w} height="36" rx="18" fill="#fff" stroke="#E2E2E2" />
      <text x={c.x + c.w / 2} y={c.y + 23} textAnchor="middle" fontSize="13" fill="#0F0F0F">
        {c.label}
      </text>
    </motion.g>
  );

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      {inputs.map((c) => (
        <motion.path key={c.label} data-motion d={link(c, "in")} fill="none" stroke="#CFCFCF" style={{ pathLength: lines }} />
      ))}
      {outputs.map((c) => (
        <motion.path key={c.label} data-motion d={link(c, "out")} fill="none" stroke="#CFCFCF" style={{ pathLength: outs }} />
      ))}
      {inputs.map((c) => chip(c, chipsIn))}
      <motion.g data-motion style={{ opacity: hubIn }}>
        <rect x={hub.x} y={hub.y} width={hub.w} height={hub.h} rx="14" fill="#0F0F0F" />
        <text x={hub.x + hub.w / 2} y={hub.y + hub.h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff">
          {BRAND}
        </text>
      </motion.g>
      {outputs.map((c) => chip(c, outs))}
    </svg>
  );
}

// Wide layout: inputs left → hub → outputs right
const W = { w: 800, h: 300 };
const wHub = { x: 330, y: 122, w: 140, h: 56 };
const wIn: Chip[] = INPUTS.map((label, i) => ({ label, x: 30, y: 52 + i * 80, w: 170 }));
const wOut: Chip[] = OUTPUTS.map((label, i) => ({ label, x: 600, y: 92 + i * 80, w: 170 }));
const wLink = (c: Chip, dir: "in" | "out") => {
  const cy = c.y + 18;
  const hy = wHub.y + wHub.h / 2;
  return dir === "in"
    ? `M ${c.x + c.w} ${cy} C ${c.x + c.w + 70} ${cy}, ${wHub.x - 70} ${hy}, ${wHub.x} ${hy}`
    : `M ${wHub.x + wHub.w} ${hy} C ${wHub.x + wHub.w + 70} ${hy}, ${c.x - 70} ${cy}, ${c.x} ${cy}`;
};

// Narrow layout: inputs top → hub → outputs bottom
const N = { w: 340, h: 420 };
const nHub = { x: 110, y: 182, w: 120, h: 52 };
const nIn: Chip[] = [
  { label: INPUTS[0], x: 4, y: 20, w: 104 },
  { label: INPUTS[1], x: 118, y: 20, w: 104 },
  { label: INPUTS[2], x: 232, y: 20, w: 104 },
];
const nOut: Chip[] = OUTPUTS.map((label, i) => ({ label, x: 10 + i * 170, y: 360, w: 150 }));
const nLink = (c: Chip, dir: "in" | "out") => {
  const cx = c.x + c.w / 2;
  const hx = nHub.x + nHub.w / 2;
  return dir === "in"
    ? `M ${cx} ${c.y + 36} C ${cx} ${c.y + 110}, ${hx} ${nHub.y - 70}, ${hx} ${nHub.y}`
    : `M ${hx} ${nHub.y + nHub.h} C ${hx} ${nHub.y + nHub.h + 60}, ${cx} ${c.y - 60}, ${cx} ${c.y}`;
};

export function OnePlace() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.6"] });

  return (
    <SectionFrame id="one-place" chapter={6} label="Everything in one place" innerClassName="py-28 sm:py-32">
      <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />
      <div className="relative">
        <ChapterLabel n={6}>One place</ChapterLabel>
        <RevealLines as="h2" className="headline mt-8 max-w-[16ch]" lines={["Everything", "in one place."]} />
        <RevealLines
          className="lede mt-8 max-w-[42ch]"
          lines={[
            `Already wear an Apple Watch or Whoop? ${BRAND} can pull that data in too, so your whole recovery lives in one view.`,
          ]}
        />
        <div
          ref={ref}
          role="img"
          aria-label={`Diagram: Apple Watch, Whoop, and the ${BRAND} band feed into ${BRAND}, which produces a daily update and a weekly PT report.`}
          className="mt-16"
        >
          <Diagram
            progress={scrollYProgress}
            width={W.w}
            height={W.h}
            inputs={wIn}
            outputs={wOut}
            hub={wHub}
            link={wLink}
            className="mx-auto hidden h-auto w-full max-w-[860px] md:block"
          />
          <Diagram
            progress={scrollYProgress}
            width={N.w}
            height={N.h}
            inputs={nIn}
            outputs={nOut}
            hub={nHub}
            link={nLink}
            className="mx-auto h-auto w-full max-w-[400px] md:hidden"
          />
        </div>
      </div>
    </SectionFrame>
  );
}
