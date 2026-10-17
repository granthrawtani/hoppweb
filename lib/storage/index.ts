import path from "node:path";
import { JsonFileStore } from "./json-file";
import { AirtableStore, ResendAudienceStore, SupabaseStore } from "./remote";
import type { WaitlistStore } from "./types";

export type { WaitlistEntry, WaitlistStore } from "./types";

let store: WaitlistStore | undefined;

/**
 * Picks the storage backend from WAITLIST_STORAGE. If unset, uses Supabase
 * when its URL and secret key are configured, otherwise the local JSON file.
 */
export function getWaitlistStore(): WaitlistStore {
  if (store) return store;

  const fallback =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY ? "supabase" : "json";

  switch ((process.env.WAITLIST_STORAGE || fallback).toLowerCase()) {
    case "supabase":
      store = new SupabaseStore();
      break;
    case "resend":
      store = new ResendAudienceStore();
      break;
    case "airtable":
      store = new AirtableStore();
      break;
    default:
      store = new JsonFileStore(
        process.env.WAITLIST_JSON_PATH
          ? path.resolve(/*turbopackIgnore: true*/ process.env.WAITLIST_JSON_PATH)
          : path.join(process.cwd(), "data", "waitlist.json"),
      );
  }
  return store;
}
