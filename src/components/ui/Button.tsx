import { VariantProps, cva } from "class-variance-authority";
import { FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const buttonVariants = cva("", {
  variants: {
    position: {
      over: "absolute top-0 left-0 z-50",
    },
    isLoading: {
      true: "opacity-50",
      false: "opacity-100",
    },
  },
  defaultVariants: {
    isLoading: false,
  },
});

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, position, children, onClick, isLoading, ...props }, ref) => {
    const classes = twMerge(buttonVariants({ position, isLoading }));
    return (
      <button className={classes} onClick={onClick} {...props} ref={ref}>
        {text ? <span>{text}</span> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
