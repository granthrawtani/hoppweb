import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-[14px] font-medium transition-colors duration-150 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-[#2a2a2a] disabled:bg-[#3a3a3a]",
  secondary: "border border-line bg-white text-ink hover:border-[#cfcfcf] hover:bg-subtle",
};

const sizes = {
  sm: "h-9 px-3.5",
  md: "h-11 px-5",
};

type Common = { variant?: Variant; size?: keyof typeof sizes; className?: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
