// Redix UI Toolbar uses Context so it needs to be client side only
"use client";

import "client-only";
import { FC, forwardRef, useState } from "react";
import NavigationToolbarOpenCloseButton from "./NavigationToolbarOpenCloseButton";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface ToolbarProps extends VariantProps<typeof navigationToolbarVariants> {
  open?: boolean;
  setOpen?: (isOpen: boolean) => void;
}

const navigationToolbarVariants = cva(" transition-all");

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ setOpen, ...props }, ref) => {
    return (
      <>
        <RadixToolbar.Root
          orientation="vertical"
          className={twMerge(navigationToolbarVariants())}
          {...props}
          asChild
        >
          <nav>
            <ul className="flex flex-col">
              <li className="flex">
                <RadixToolbar.Button className="flex-1" asChild>
                  <Link href="/decks" passHref legacyBehavior>
                    <Button
                      size="large"
                      className="flex-1"
                      onClick={() => {
                        setOpen && setOpen(false);
                      }}
                    >
                      Decks
                    </Button>
                  </Link>
                </RadixToolbar.Button>
              </li>
            </ul>
          </nav>
        </RadixToolbar.Root>
      </>
    );
  }
);

Toolbar.displayName = "Toolbar";

export default Toolbar;
