"use client";

import "client-only";
import { FC, forwardRef } from "react";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

interface SignOffButtonProps {}

const SignOffButton = forwardRef<HTMLButtonElement, SignOffButtonProps>(
  ({}, ref) => {
    return (
      <Button
        onClick={() => {
          signOut();
        }}
        ref={ref}
      >
        Sign Out
      </Button>
    );
  }
);

SignOffButton.displayName = "SignOffButton";

export default SignOffButton;
