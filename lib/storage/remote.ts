import type { WaitlistEntry, WaitlistStore } from "./types";

/**
 * Hosted adapters using plain fetch (no SDK dependencies).
 * Each one reads its keys from env — see .env.example and README.
 */

function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

/**
 * Supabase: `waitlist` table with a UNIQUE constraint on `email`
 * (see supabase/migrations). Uses the server-only secret key, which bypasses RLS.
 */
export class SupabaseStore implements WaitlistStore {
  async add(entry: WaitlistEntry) {
    const url = required("NEXT_PUBLIC_SUPABASE_URL");
    const key = required("SUPABASE_SECRET_KEY");
    const table = process.env.SUPABASE_WAITLIST_TABLE || "waitlist";

    const headers: Record<string, string> = {
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    };
    // New-style keys (sb_secret_…) go in `apikey` only; legacy JWT keys also need a Bearer header.
    if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: entry.email,
        role: entry.role,
        created_at: entry.createdAt,
        source: entry.source ?? null,
        utm_source: entry.utmSource ?? null,
        utm_medium: entry.utmMedium ?? null,
        utm_campaign: entry.utmCampaign ?? null,
        user_agent: entry.userAgent ?? null,
      }),
    });
    if (res.status === 409) return { created: false };
    if (!res.ok) throw new Error(`Supabase error ${res.status}: ${await res.text()}`);
    return { created: true };
  }
}

/** Resend Audiences: role is stored in the contact's first_name field as a lightweight tag. */
export class ResendAudienceStore implements WaitlistStore {
  async add(entry: WaitlistEntry) {
    const key = required("RESEND_API_KEY");
    const audience = required("RESEND_AUDIENCE_ID");

    const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email: entry.email, first_name: entry.role ?? "", unsubscribed: false }),
    });
    if (res.status === 409) return { created: false };
    if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
    return { created: true };
  }
}

/** Airtable: checks for an existing Email before creating a record. */
export class AirtableStore implements WaitlistStore {
  async add(entry: WaitlistEntry) {
    const key = required("AIRTABLE_API_KEY");
    const base = required("AIRTABLE_BASE_ID");
    const table = encodeURIComponent(process.env.AIRTABLE_TABLE || "Waitlist");
    const endpoint = `https://api.airtable.com/v0/${base}/${table}`;
    const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

    const formula = encodeURIComponent(`{Email} = '${entry.email.replace(/'/g, "\\'")}'`);
    const existing = await fetch(`${endpoint}?maxRecords=1&filterByFormula=${formula}`, { headers });
    if (!existing.ok) throw new Error(`Airtable error ${existing.status}: ${await existing.text()}`);
    if ((await existing.json()).records?.length) return { created: false };

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        records: [{ fields: { Email: entry.email, Role: entry.role ?? "", Created: entry.createdAt } }],
      }),
    });
    if (!res.ok) throw new Error(`Airtable error ${res.status}: ${await res.text()}`);
    return { created: true };
  }
}
