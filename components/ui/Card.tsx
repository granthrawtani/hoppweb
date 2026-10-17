import { cn } from "@/lib/cn";

type CardProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Card<T extends React.ElementType = "div">({ as, className, children, ...rest }: CardProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag className={cn("rounded-2xl border border-line bg-white p-6 sm:p-8", className)} {...rest}>
      {children}
    </Tag>
  );
}
