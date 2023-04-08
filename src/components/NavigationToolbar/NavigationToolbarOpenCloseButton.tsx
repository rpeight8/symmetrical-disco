import { FC } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface NavigationToolbarOpenCloseButtonProps {
  isOpen: boolean;
  onClick: (isOpen: boolean) => void;
}

const NavigationToolbarOpenCloseButton: FC<
  NavigationToolbarOpenCloseButtonProps
> = ({ onClick, isOpen }) => {
  console.log(isOpen);
  return (
    <Button
      position="over"
      onClick={() => {
        console.log("click");
        onClick(!isOpen);
      }}
    >
      <Icon
        name="SidebarOpen"
        className={`absolute ${
          isOpen ? "opacity-0" : "opacity-100"
        } transition-all`}
      />
      <Icon
        name="SidebarClose"
        className={`absolute ${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-all`}
      />
    </Button>
  );
};

export default NavigationToolbarOpenCloseButton;
