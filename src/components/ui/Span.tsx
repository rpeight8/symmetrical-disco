import { FC, HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const spanVariants = cva("text-primary-complimentary-500", {
  variants: {
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
  variant,
  ...props
}) => {
  return (
    <span
      className={twMerge(spanVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Span;
