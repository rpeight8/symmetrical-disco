"use client";

import "client-only";
import { FC, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
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
    <Collapsible.Root open={isOpen} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <NavigationToolbarOpenCloseButton isOpen={isOpen} onClick={setOpen} />
      </Collapsible.Trigger>
      <Collapsible.Content asChild>
        <NavigationToolbar open={isOpen} />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default Header;
