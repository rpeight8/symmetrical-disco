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
}

const navigationToolbarVariants = cva(" transition-all");

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ ...props }, ref) => {
    return (
      <>
        <RadixToolbar.Root
          orientation="vertical"
          className={twMerge(navigationToolbarVariants())}
          {...props}
          asChild
        >
          <nav>
            <ul>
              <li>
                <RadixToolbar.Button asChild>
                  <Button>
                    <Link href="/decks">Decks</Link>
                  </Button>
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
