// Redix UI Toolbar uses Context so it needs to be client side only
"use client";

import "client-only";
import { FC, useState } from "react";
import NavigationToolbarOpenCloseButton from "./NavigationToolbarOpenCloseButton";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface ToolbarProps extends VariantProps<typeof navigationToolbarVariants> {}

const navigationToolbarVariants = cva("w-full h-full bg-slate-700", {
  variants: {
    open: {
      true: "translate-x-0",
      false: "translate-x-[-100%]",
    },
  },
  defaultVariants: {
    open: false,
  },
});

const Toolbar: FC<ToolbarProps> = ({ open }) => {
  open = open ?? false;
  const [isOpen, setOpen] = useState<boolean>(open);
  return (
    <>
      <RadixToolbar.Root
        orientation="vertical"
        className={twMerge(navigationToolbarVariants({ open }))}
      >
        <RadixToolbar.Button
          className="bg-fray-100 w-12
	  h-12"
        ></RadixToolbar.Button>
      </RadixToolbar.Root>
    </>
  );
};

export default Toolbar;
