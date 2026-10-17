import { NextResponse, type NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getWaitlistStore } from "@/lib/storage";
import { waitlistSchema } from "@/lib/validation";

export const runtime = "nodejs";

function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(`waitlist:${clientIp(req)}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid request.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  // `email` is already trimmed and lowercased by the schema.
  const { email, role, company, utm_source, utm_medium, utm_campaign } = parsed.data;

  // Honeypot filled: pretend success so bots don't learn anything.
  if (company) return NextResponse.json({ ok: true });

  try {
    const { created } = await getWaitlistStore().add({
      email,
      role: role ?? null,
      createdAt: new Date().toISOString(),
      source: "landing",
      utmSource: utm_source,
      utmMedium: utm_medium,
      utmCampaign: utm_campaign,
      userAgent: req.headers.get("user-agent")?.slice(0, 500) || null,
    });
    // Same response either way so the endpoint can't be used to probe the list.
    if (!created) console.info("[waitlist] duplicate signup ignored");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] storage error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }
}
