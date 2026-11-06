import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-[var(--elevation-1)] hover:bg-primary/90 hover:shadow-[var(--elevation-2)]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-[var(--elevation-1)] hover:bg-destructive/90 hover:shadow-[var(--elevation-2)]",
        outline:
          "text-foreground border-border hover:bg-surface-elevated hover:border-border-emphasis",
        premium: "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        "premium-gold": "border-transparent bg-gold/10 text-gold hover:bg-gold/20",
        "premium-terracotta":
          "border-transparent bg-terracotta/10 text-terracotta hover:bg-terracotta/20",
        "premium-sage": "border-transparent bg-sage/10 text-sage hover:bg-sage/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
