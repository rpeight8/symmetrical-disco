"use client";

import "client-only";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import type { ButtonProps } from "@/components/ui/Button";

interface GoogleSignInButtonProps extends ButtonProps {}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInHandler = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      debugger;
      console.log({
        title: "Error signing in",
        message: "Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signInHandler} isLoading={isLoading} {...props}>
      Sign In using Google
    </Button>
  );
};

export default GoogleSignInButton;
