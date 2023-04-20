"use client";

import "client-only";
import { FC, InputHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputVariants = cva(
  "w-full h-10 px-3 rounded-md border border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
  {
    variants: {
      inputDisabled: {
        true: "bg-primary-disabled-600 cursor-not-allowed",
        false: "bg-primary-50",
      },
      inputSize: {
        small: "h-8 text-sm",
        medium: "h-10 text-base",
        large: "h-12 text-lg",
      },
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, value, inputDisabled, inputSize, ...props }, ref) => {
    return (
      <input
        className={twMerge(inputVariants({ inputSize, inputDisabled }))}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      ></input>
    );
  }
);

Input.displayName = "Input";

export default Input;
