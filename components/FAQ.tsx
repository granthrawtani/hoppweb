import { SectionFrame } from "@/components/ui/SectionFrame";
import { BRAND } from "@/lib/site";

const FAQS = [
  {
    q: "Does it replace my physical therapist?",
    a: `No. ${BRAND} gives your PT better information between visits, so your time together goes further. Your PT still leads your recovery.`,
  },
  {
    q: "What injuries does it work for?",
    a: "Any leg injury: knee (ACL, MCL, meniscus, patellar tendon, knee replacement), ankle and foot (sprains, Achilles injuries, fractures), and upper leg and hip (hamstring and quad strains, hip surgery).",
  },
  {
    q: "Do I need a new brace?",
    a: `No. ${BRAND} clips onto the brace, sleeve, or strap you already wear.`,
  },
  {
    q: "Which devices does it connect to?",
    a: `${BRAND} can pull in data from devices you already use, like Apple Watch or Whoop, so everything lives in one place. We'll share the full list closer to launch.`,
  },
  {
    q: "When does it launch?",
    a: "We're opening early access in stages. Join the waitlist and we'll email you when it's your turn.",
  },
];

export function FAQ() {
  return (
    <SectionFrame id="faq" innerClassName="py-24 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <h2 className="headline">Questions</h2>
        <div className="border-t border-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium sm:text-[18px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="relative size-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-current" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 text-[17px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
