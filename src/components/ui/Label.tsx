import { FC, HTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelVariants = cva(
  "flex justify-center items-center text-primary-complimentary-500",
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

interface LabelProps
  extends HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  text?: string;
}

const Label: FC<LabelProps> = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size, className, text, ...props }, ref) => {
    if (!text) throw new Error("Label text is required!");
    return (
      <label
        className={twMerge(labelVariants({ size }), className)}
        {...props}
        ref={ref}
      >
        {text}:
      </label>
    );
  }
);

Label.displayName = "Label";

export default Label;
