/** Single source for brand details. Rename the product here. */
export const BRAND = "HOPP";

export const SITE = {
  name: BRAND,
  title: `${BRAND}: recovery tracking that doesn't stop when you leave the clinic`,
  description: `${BRAND} is a small band that clips onto the brace, sleeve, or strap you already wear after a leg injury. It tracks bend, landing force, and left-vs-right balance anywhere, and turns it into plain language for you and your physical therapist.`,
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "hello@example.com",
};

export const CHAPTERS = [
  { id: "moment", label: "The moment" },
  { id: "gap", label: "The gap" },
  { id: "meet", label: `Meet ${BRAND}` },
  { id: "measures", label: "What it measures" },
  { id: "plain-language", label: "Plain language" },
  { id: "one-place", label: "One place" },
  { id: "who", label: "Who it's for" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
