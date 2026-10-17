import { cn } from "@/lib/cn";

/**
 * The "page within the page": a centered column with hairline borders
 * on the left and right. Stacked frames read as one continuous frame.
 */
export function SectionFrame({
  id,
  chapter,
  className,
  innerClassName,
  children,
  label,
  ...rest
}: {
  id?: string;
  /** Chapter index (1-based); drives the progress counter. */
  chapter?: number;
  className?: string;
  innerClassName?: string;
  label?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "id" | "className" | "children">) {
  return (
    <section
      id={id}
      data-chapter={chapter}
      aria-label={label}
      className={cn("relative mx-auto w-full max-w-[var(--frame)] border-x border-line", className)}
      {...rest}
    >
      <div className={cn("relative px-5 sm:px-10 lg:px-16", innerClassName)}>{children}</div>
    </section>
  );
}

/** Small "01 — The moment" label shown at the top of each chapter. */
export function ChapterLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="text-ink">{String(n).padStart(2, "0")}</span>
      <span aria-hidden className="h-px w-6 bg-line" />
      <span>{children}</span>
    </p>
  );
}
