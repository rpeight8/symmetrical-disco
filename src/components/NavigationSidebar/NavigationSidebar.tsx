"use client";

import "client-only";
import { FC, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import NavigationToolbar from "@/components/NavigationSidebar/NavigationToolbar";
import NavigationToolbarOpenCloseButton from "@/components/NavigationSidebar/NavigationToolbarOpenCloseButton";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const navigationSidebarVariants = cva("fixed z-50 flex", {
  variants: {
    open: {
      true: "w-full h-full",
      false: "w-auto h-auto",
    },
  },
  defaultVariants: {
    open: false,
  },
});

interface HeaderProps extends VariantProps<typeof navigationSidebarVariants> {}

const Header: FC<HeaderProps> = ({}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setOpen}
      className={twMerge(navigationSidebarVariants({ open: isOpen }))}
    >
      <Collapsible.Trigger className="mt-3 ml-3" asChild>
        <NavigationToolbarOpenCloseButton
          isOpen={isOpen}
          onClick={() => {
            setOpen(!isOpen);
          }}
        />
      </Collapsible.Trigger>
      <Collapsible.Content asChild>
        <aside className="w-full h-full bg-primary-700 pt-20 px-3">
          <NavigationToolbar open={isOpen} setOpen={setOpen} />
        </aside>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default Header;
