import Link from "next/link";
import { Wordmark } from "@/components/Nav";
import { BRAND, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[var(--frame)] border-x border-line px-5 py-12 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark />
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted">
            <li>
              <Link href="/privacy" className="rounded hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <a href={`mailto:${SITE.contactEmail}`} className="rounded hover:text-ink">
                {SITE.contactEmail}
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND}
          </p>
          <p>{BRAND} is not a medical device and does not replace professional medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
