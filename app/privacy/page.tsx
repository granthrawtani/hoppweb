import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, SITE } from "@/lib/site";

export const metadata: Metadata = { title: `Privacy · ${BRAND}` };

export default function Privacy() {
  return (
    <main className="mx-auto min-h-svh max-w-[var(--frame)] border-x border-line px-5 py-24 sm:px-10 lg:px-16">
      <Link href="/" className="text-[14px] text-muted hover:text-ink">
        ← Back
      </Link>
      <h1 className="headline mt-10">Privacy</h1>
      <div className="mt-8 max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-muted">
        <p>
          This is a placeholder policy. When you join the waitlist we store your email address and, if you choose,
          whether you&apos;re recovering or a PT/clinic. We use it only to contact you about {BRAND} early access.
        </p>
        <p>
          To be removed, email <a className="text-ink underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
      </div>
    </main>
  );
}
