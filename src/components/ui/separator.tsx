import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      subtle: "bg-border-subtle",
      emphasis: "bg-border-emphasis",
      gold: "bg-gold",
      gradient: "bg-gradient-to-r from-transparent via-gold to-transparent",
    },
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
  },
});

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> &
    VariantProps<typeof separatorVariants>
>(({ className, orientation = "horizontal", decorative = true, variant, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(separatorVariants({ variant, orientation }), className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
