import { FC, HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const spanVariants = cva("text-primary-complimentary-500", {
  variants: {
    screenReader: {
      only: "sr-only",
    },
    size: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    },
    variant: {
      underline: "underline underline-offset-4",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpanProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spanVariants> {}

const Span: FC<SpanProps> = ({
  children,
  className,
  size,
  screenReader,
  variant,
  ...props
}) => {
  return (
    <div className="overflow-x-auto">
      <span
        className={twMerge(
          spanVariants({ size, variant, screenReader }),
          className
        )}
        {...props}
      >
        {children}
      </span>
    </div>
  );
};

export default Span;
