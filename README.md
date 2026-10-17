# HOPP — landing page

Single-page, scroll-driven story with a waitlist signup.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · zod.

## Run it

```bash
npm install
cp .env.example .env.local   # optional; defaults work for local dev
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for a production build. `npm run typecheck` runs TypeScript.

Signups land in `data/waitlist.json` by default (gitignored).

## Rename the product

The brand name, contact email, and chapter labels live in [`lib/site.ts`](lib/site.ts). Change `BRAND` there and it updates everywhere, including metadata and the OG image.

## Switching signup storage

**Supabase is used automatically** when `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SECRET_KEY` are set in `.env.local` (see `.env.example`). Create the table once by running [`supabase/migrations/0001_waitlist.sql`](supabase/migrations/0001_waitlist.sql) in the Supabase SQL Editor. `SUPABASE_SECRET_KEY` is server-only: never prefix it with `NEXT_PUBLIC_`.

To force a specific backend, set `WAITLIST_STORAGE` and add the keys for that backend:

| `WAITLIST_STORAGE` | Keys | Notes |
| --- | --- | --- |
| `json` (default without Supabase keys) | `WAITLIST_JSON_PATH` (optional) | Local file. **Not for serverless hosts** (read-only/ephemeral filesystem). |
| `supabase` | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `SUPABASE_WAITLIST_TABLE` (optional, default `waitlist`) | Tested end to end. Schema in `supabase/migrations/`. |
| `resend` | `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` | Adds a contact to a Resend Audience; `role` goes in `first_name`. |
| `airtable` | `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE` (default `Waitlist`) | Fields: `Email`, `Role`, `Created`. Checks for an existing email first. |

The Resend and Airtable adapters are thin `fetch` wrappers written against those APIs' documented REST endpoints and haven't been run against real accounts. Do one test signup after you add keys.

To add another backend, implement `WaitlistStore` from [`lib/storage/types.ts`](lib/storage/types.ts) (one method: `add(entry) → { created }`) and register it in [`lib/storage/index.ts`](lib/storage/index.ts).

## How signups are handled

`POST /api/waitlist` with `{ email, role? }`, where `role` is `"recovering"` or `"clinic"`.

- **Validation:** one zod schema ([`lib/validation.ts`](lib/validation.ts)) is shared by the form and the route. Emails are trimmed and lowercased.
- **Duplicates:** ignored, but the response is the same `{ ok: true }` either way, so the endpoint can't be used to check who's on the list.
- **Spam:** a hidden `company` honeypot field. Bots that fill it get a fake success and nothing is stored.
- **Rate limiting:** 5 requests per IP per 10 minutes, in memory ([`lib/rate-limit.ts`](lib/rate-limit.ts)). This works for a single server. On Vercel or other multi-instance hosting, use a shared store such as Upstash Redis.

## Project layout

```
app/
  page.tsx                 Page composition
  layout.tsx               Inter font, metadata, Open Graph
  opengraph-image.tsx      Generated OG image
  api/waitlist/route.ts    Signup endpoint
components/
  chapters/                One component per story chapter (01–07)
  ui/                      Pill, Card, Button, SectionFrame, Reveal, CountUp
  StoryShell.tsx           Progress line + chapter counter
  WaitlistFinale.tsx       Frame-narrowing transition into the waitlist
  WaitlistForm.tsx         Form states: idle / loading / error / success
lib/
  site.ts                  Brand + copy constants
  storage/                 Storage interface + adapters
```

## Notes

- **Reduced motion:** every animated element carries `data-motion`. CSS in `globals.css` forces those elements to their final state under `prefers-reduced-motion`, so the page renders static without any hydration mismatch.
- **Scroll transforms:** use `useRange` ([`lib/use-range.ts`](lib/use-range.ts)) rather than `useTransform(value, [in], [out])`. Framer Motion 12 otherwise moves scroll-linked opacity onto a native ViewTimeline, which mis-maps target offsets in Chrome. On the pinned waitlist section, that left the form invisible.
- **Example data:** all numbers in the product previews are labeled as examples.
