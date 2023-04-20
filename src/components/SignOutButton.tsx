"use client";

import "client-only";
import { FC, forwardRef } from "react";
import Button from "@/components/ui/Button";
import type { ButtonProps } from "@/components/ui/Button";
import { signOut } from "next-auth/react";

interface SignOffButtonProps extends ButtonProps {}

const SignOffButton = forwardRef<HTMLButtonElement, SignOffButtonProps>(
  ({ ...props }, ref) => {
    return (
      <Button
        onClick={() => {
          signOut();
        }}
        {...props}
        ref={ref}
      >
        Sign Out
      </Button>
    );
  }
);

SignOffButton.displayName = "SignOffButton";

export default SignOffButton;
