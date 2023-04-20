import { VariantProps, cva } from "class-variance-authority";
import { getServerSession } from "next-auth";
import { FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import SignOutButton from "@/components/SignOutButton";
import Button from "@/components/ui/Button";
import { options } from "@/lib/auth";

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  text?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const headerVariants = cva("flex justify-end");
const Header = async ({ className }: HeaderProps) => {
  const session = await getServerSession(options);

  return (
    <header className={twMerge(headerVariants(), className)}>
      {session ? (
        <SignOutButton size="medium" />
      ) : (
        <GoogleSignInButton size="medium" />
      )}
    </header>
  );
};

export default Header;
