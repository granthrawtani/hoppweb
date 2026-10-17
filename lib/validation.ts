import { z } from "zod";

export const ROLES = ["recovering", "clinic"] as const;
export type Role = (typeof ROLES)[number];

/** Trims and lowercases, so the stored email is always normalized. */
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .max(254, "That email is too long.")
  .email("Enter a valid email address.")
  .transform((v) => v.toLowerCase());

const utmSchema = z
  .string()
  .trim()
  .max(200)
  .nullish()
  .transform((v) => v || null);

/** Shared by the client form and the /api/waitlist route. */
export const waitlistSchema = z.object({
  email: emailSchema,
  role: z.enum(ROLES, { errorMap: () => ({ message: "Invalid role." }) }).nullish(),
  utm_source: utmSchema,
  utm_medium: utmSchema,
  utm_campaign: utmSchema,
  // Honeypot: real users never see or fill this.
  company: z.string().max(200).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
