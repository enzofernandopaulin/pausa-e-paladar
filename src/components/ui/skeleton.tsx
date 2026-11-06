import { cn } from "@/lib/utils";

function Skeleton({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "subtle" | "elevated";
}) {
  const variantStyles = {
    default: "animate-pulse rounded-lg bg-primary/10",
    subtle: "animate-pulse rounded-lg bg-border-subtle",
    elevated: "animate-pulse rounded-lg bg-surface-elevated shadow-[var(--elevation-1)]",
  };

  return <div className={cn(variantStyles[variant], className)} {...props} />;
}

export { Skeleton };
