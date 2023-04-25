import { FC, HTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const headingVariants = cva(
  "flex items-center text-primary-complimentary-500",
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  importance: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading: FC<HeadingProps> = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, importance, children, size, ...props }, ref) => {
    const HeadingTag = importance;

    return (
      <HeadingTag
        className={twMerge(headingVariants({ size }), className)}
        {...props}
        ref={ref}
      >
        {children}
      </HeadingTag>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
