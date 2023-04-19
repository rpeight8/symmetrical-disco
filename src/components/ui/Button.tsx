"use client";

import "client-only";
import { VariantProps, cva } from "class-variance-authority";
import { FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const buttonVariants = cva("rounded-md font-medium", {
  variants: {
    position: {
      over: "absolute z-50",
    },
    variant: {
      contained: "bg-secondary text-primary-complimentary",
      outlined:
        "bg-transparent text-primary-complimentary border border-primary-complimentary",
      ghost: "bg-transparent text-primary-complimentary",
    },
    isLoading: {
      true: "opacity-50",
      false: "opacity-100",
    },
    disabled: {
      true: "cursor-not-allowed opacity-70",
      false: "cursor-pointer",
    },
    size: {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    isLoading: false,
    variant: "contained",
    disabled: false,
    size: "small",
  },
});

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      position,
      variant,
      disabled,
      children,
      onClick,
      isLoading,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      buttonVariants({ position, isLoading, variant, disabled })
    );
    return (
      <button className={classes} onClick={onClick} {...props} ref={ref}>
        {text ? <span>{text}</span> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
