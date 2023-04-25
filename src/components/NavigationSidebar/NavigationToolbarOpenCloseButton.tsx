import { FC, HTMLAttributes, forwardRef, useRef } from "react";
import Button from "@/components/ui/Button";
import type { ButtonProps } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface NavigationToolbarOpenCloseButtonProps extends ButtonProps {
  isOpen: boolean;
}

const navigationToolbarOpenCloseButtonVariants = cva(
  "absolute grid grid-rows-1 shadow-lg drop-shadow-lg backdrop-invert-1"
);

const navigationToolbarOpenCloseButtonIconVariants = cva(
  "row-span-full col-span-full transition-all"
);

const NavigationToolbarOpenCloseButton = forwardRef<
  HTMLButtonElement,
  NavigationToolbarOpenCloseButtonProps
>(({ onClick, isOpen, className, ...props }, ref) => {
  return (
    <Button
      size="medium"
      rounded="full"
      variant="contained"
      className={twMerge(navigationToolbarOpenCloseButtonVariants(), className)}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      <Icon
        size="medium"
        name="SidebarOpen"
        className={twMerge(
          navigationToolbarOpenCloseButtonIconVariants(),
          `${isOpen ? "opacity-0" : "opacity-100"}`
        )}
      />
      <Icon
        size="medium"
        name="SidebarClose"
        className={twMerge(
          navigationToolbarOpenCloseButtonIconVariants(),
          `${isOpen ? "opacity-100" : "opacity-0"}`
        )}
      />
    </Button>
  );
});

NavigationToolbarOpenCloseButton.displayName =
  "NavigationToolbarOpenCloseButton";

export default NavigationToolbarOpenCloseButton;
