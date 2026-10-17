import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ChapterLabel, SectionFrame } from "@/components/ui/SectionFrame";

const INJURIES = [
  { group: "Knee", items: ["ACL", "MCL", "Meniscus", "Patellar tendon", "Knee replacement"] },
  { group: "Ankle & foot", items: ["Ankle sprains", "Achilles injuries", "Fractures"] },
  { group: "Upper leg & hip", items: ["Hamstring strains", "Quad strains", "Hip surgery"] },
];

const AUDIENCES = [
  {
    title: "Athletes",
    body: "See your bend, landing force, and balance from practice and the gym, not just the clinic.",
  },
  {
    title: "Patients recovering from surgery or injury",
    body: "A short daily update in plain language, so you know how today went without guessing.",
  },
  {
    title: "PTs, athletic trainers, and clinics",
    body: "A weekly report for each patient with the numbers and any warning signs from between visits.",
  },
];

export function ForEveryone() {
  return (
    <SectionFrame id="who" chapter={7} label="Who it's for" innerClassName="py-28 sm:py-32">
      <ChapterLabel n={7}>Who it&apos;s for</ChapterLabel>
      <div className="mt-8">
        <Pill>Built for every leg injury</Pill>
      </div>
      <RevealLines
        as="h2"
        className="headline mt-6 max-w-[22ch]"
        lines={["Built for every leg injury, and everyone in the recovery."]}
      />

      <h3 className="sr-only">Injuries</h3>
      <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {INJURIES.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.1}>
            <h4 className="text-[14px] font-medium text-muted">{g.group}</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item}>
                  <Pill className="px-3.5 py-1.5 text-[14px] font-normal">{item}</Pill>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <h3 className="sr-only">Who it&apos;s for</h3>
      <ul className="mt-20 grid gap-5 md:grid-cols-3">
        {AUDIENCES.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.12} className="h-full">
            <Card className="h-full">
              <p className="text-[12px] font-medium tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h4 className="mt-6 text-[20px] font-semibold leading-tight tracking-[-0.02em]">{a.title}</h4>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{a.body}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </SectionFrame>
  );
}
