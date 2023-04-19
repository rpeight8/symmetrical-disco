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

const headerVariants = cva("");
const Header = async ({ className }: HeaderProps) => {
  const session = await getServerSession(options);

  return (
    <header className={twMerge(headerVariants(), className)}>
      {session ? <SignOutButton /> : <GoogleSignInButton />}
      <div className="flex flex-col gap-2 my-2">
        <Button variant="contained" text="contained" size="large" />
        <Button
          variant="contained"
          text="contained"
          size="medium"
          disabled={true}
        />
        <Button variant="outlined" text="outlined" />
        <Button variant="outlined" text="outlined" disabled={true} />
        <Button variant="ghost" text="ghost" />
        <Button variant="ghost" text="ghost" disabled={true} />
      </div>
    </header>
  );
};

export default Header;
