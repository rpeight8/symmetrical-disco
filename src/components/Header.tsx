import { VariantProps, cva } from "class-variance-authority";
import { getServerSession } from "next-auth";
import { FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import SignOutButton from "@/components/SignOutButton";
import Button from "@/components/ui/Button";
import { options } from "@/lib/auth";
import Span from "@/components/ui/Span";

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  text?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const headerVariants = cva("flex justify-end items-center gap-x-3");
const Header = async ({ className }: HeaderProps) => {
  const session = await getServerSession(options);

  return (
    <header className={twMerge(headerVariants(), className)}>
      {session ? (
        <Span size="large" variant="underline">
          {session.user.name}
        </Span>
      ) : null}
      {session ? (
        <SignOutButton
          size="medium"
          className="shadow-lg drop-shadow-lg backdrop-invert-1"
        />
      ) : (
        <GoogleSignInButton
          size="medium"
          className="shadow-lg drop-shadow-lg backdrop-invert-1"
        />
      )}
    </header>
  );
};

export default Header;
