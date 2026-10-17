"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { emailSchema, type Role } from "@/lib/validation";
import { WAITLIST_ROLE_EVENT } from "@/lib/waitlist-events";

type Status = "idle" | "loading" | "success" | "error";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "recovering", label: "I'm recovering" },
  { value: "clinic", label: "I'm a PT or clinic" },
];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const ids = { email: useId(), error: useId(), honeypot: useId() };

  useEffect(() => {
    const onRole = (e: Event) => setRole((e as CustomEvent<Role>).detail);
    window.addEventListener(WAITLIST_ROLE_EVENT, onRole);
    return () => window.removeEventListener(WAITLIST_ROLE_EVENT, onRole);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus({ preventScroll: true });
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || status === "success") return;

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
      return;
    }

    const company = (new FormData(e.currentTarget).get("company") as string) || "";
    const params = new URLSearchParams(window.location.search);
    inFlight.current = true;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsed.data,
          role,
          company,
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "Couldn't connect. Please try again.");
    } finally {
      inFlight.current = false;
    }
  }

  const loading = status === "loading";

  return (
    <div className="relative min-h-[168px]">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center pt-4 text-center"
          >
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
              <motion.circle
                data-motion
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="#1F7A4D"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.path
                data-motion
                d="M14 22.5 L19.5 28 L30 16.5"
                fill="none"
                stroke="#1F7A4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
              />
            </svg>
            <h3 ref={successRef} tabIndex={-1} className="mt-5 text-[22px] font-semibold tracking-[-0.02em] outline-none">
              You&apos;re on the list.
            </h3>
            <p className="mt-1 text-[17px] text-muted">We&apos;ll be in touch.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            aria-busy={loading}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor={ids.email} className="sr-only">
                Email address
              </label>
              <input
                id={ids.email}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setError("");
                  }
                }}
                aria-invalid={status === "error"}
                aria-describedby={ids.error}
                disabled={loading}
                className={cn(
                  "h-12 w-full min-w-0 shrink-0 rounded-[10px] sm:flex-1 sm:shrink border bg-white px-4 text-[16px] text-ink placeholder:text-[#9a9a9a] outline-none transition-colors",
                  "focus:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/15",
                  status === "error" ? "border-[#B42318]" : "border-line hover:border-[#cfcfcf]",
                )}
              />
              <Button type="submit" disabled={loading} className="h-12 sm:w-28">
                {loading ? (
                  <>
                    <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span className="sr-only">Joining…</span>
                  </>
                ) : (
                  "Join"
                )}
              </Button>
            </div>

            {/* Reserved height so errors never shift the layout */}
            <p id={ids.error} role="alert" className="mt-2 min-h-5 text-left text-[13px] text-[#B42318]">
              {error}
            </p>

            <fieldset className="mt-2 flex flex-col items-center gap-2">
              <legend className="sr-only">Which describes you? (optional)</legend>
              <div className="inline-flex rounded-[10px] border border-line bg-subtle p-1">
                {ROLE_OPTIONS.map((o) => {
                  const checked = role === o.value;
                  return (
                    <label
                      key={o.value}
                      className={cn(
                        "relative cursor-pointer rounded-[7px] px-3.5 py-1.5 text-[13px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink",
                        checked ? "bg-white font-medium text-ink shadow-[0_0_0_1px_#E8E8E8]" : "text-muted hover:text-ink",
                      )}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={o.value}
                        checked={checked}
                        disabled={loading}
                        onChange={() => setRole(o.value)}
                        onClick={() => checked && setRole(null)}
                        className="sr-only"
                      />
                      {o.label}
                    </label>
                  );
                })}
              </div>
              <span className="text-[12px] text-muted">Optional</span>
            </fieldset>

            {/* Honeypot: hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={ids.honeypot}>Company</label>
              <input id={ids.honeypot} name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
