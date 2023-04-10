// Redix UI Toolbar uses Context so it needs to be client side only
"use client";

import "client-only";
import { FC, forwardRef, useState } from "react";
import NavigationToolbarOpenCloseButton from "./NavigationToolbarOpenCloseButton";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface ToolbarProps extends VariantProps<typeof navigationToolbarVariants> {}

const navigationToolbarVariants = cva(
  "fixed w-full h-full bg-slate-700 transition-all",
  {
    variants: {
      open: {
        true: "translate-x-0",
        false: "translate-x-[-100%]",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ open, ...props }, ref) => {
    open = open ?? false;
    const [isOpen, setOpen] = useState<boolean>(open);
    return (
      <>
        <RadixToolbar.Root
          orientation="vertical"
          className={twMerge(navigationToolbarVariants({ open }))}
          {...props}
          asChild
        >
          <aside>
            <nav>
              <ul>
                <li>
                  <RadixToolbar.Button
                    className="bg-fray-100 w-12
	  h-12"
                  >
                    BUTTOn
                  </RadixToolbar.Button>
                </li>
              </ul>
            </nav>
          </aside>
        </RadixToolbar.Root>
      </>
    );
  }
);

Toolbar.displayName = "Toolbar";

export default Toolbar;
