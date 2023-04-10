"use client";

import "client-only";
import { FC, useState } from "react";
import NavigationToolbar from "@/components/NavigationToolbar/NavigationToolbar";
import NavigationToolbarOpenCloseButton from "@/components/NavigationToolbar/NavigationToolbarOpenCloseButton";
import { cva, VariantProps } from "class-variance-authority";

const headerVariants = cva("fixed", {
  variants: {
    open: {
      true: "w-full h-full",
      false: "w-6 h-6",
    },
  },
  defaultVariants: {
    open: false,
  },
});

interface HeaderProps extends VariantProps<typeof headerVariants> {}

const Header: FC<HeaderProps> = ({}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <header className={headerVariants({ open: isOpen })}>
      <NavigationToolbarOpenCloseButton isOpen={isOpen} onClick={setOpen} />
      <NavigationToolbar open={isOpen} />
    </header>
  );
};

export default Header;
