import type { Role } from "@/lib/validation";

export type WaitlistEntry = {
  email: string;
  role: Role | null;
  createdAt: string; // ISO timestamp
  source?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  userAgent?: string | null;
};

export interface WaitlistStore {
  /** Store an entry. Resolves `created: false` if the email was already on the list. */
  add(entry: WaitlistEntry): Promise<{ created: boolean }>;
}
