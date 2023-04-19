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

const buttonVariants = cva(
  "text-primary-complimentary-500 rounded-md font-medium",
  {
    variants: {
      position: {
        over: "absolute z-50",
      },
      variant: {
        contained: "bg-secondary-500 shadow-sm enabled:hover:bg-secondary-400",
        outlined:
          "bg-transparent border border-primary-complimentary-500 enabled:hover:border-primary-complimentary-600 enabled:hover:text-primary-complimentary-700",
        ghost: "bg-transparent enabled:hover:bg-primary-400",
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
    compoundVariants: [
      {
        variant: "contained",
        disabled: true,
        class: "bg-secondary-disabled-600",
      },
    ],
    defaultVariants: {
      isLoading: false,
      variant: "contained",
      disabled: false,
      size: "small",
    },
  }
);

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
      size,
      className,
      ...props
    },
    ref
  ) => {
    disabled = disabled ?? false;
    const classes = twMerge(
      buttonVariants({ position, isLoading, variant, disabled, size }),
      className
    );
    return (
      <button
        className={classes}
        onClick={onClick}
        {...props}
        ref={ref}
        disabled={disabled}
      >
        {text ? <span>{text}</span> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
