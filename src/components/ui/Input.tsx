"use client";

import "client-only";
import { FC, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, value, ...props }, ref) => {
    return (
      <input value={value} onChange={onChange} ref={ref} {...props}></input>
    );
  }
);

Input.displayName = "Input";

export default Input;
