import { FC, SVGAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { SidebarOpen, SidebarClose, Trash2 } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const Icons = {
  SidebarOpen,
  SidebarClose,
  Trash2,
};

type Icon = LucideIcon;
type IconName = keyof typeof Icons;
export type Icons = Record<IconName, Icon>;

const iconVariants = cva("", {
  variants: {
    size: {
      small: "w-5 h-5",
      medium: "w-7 h-7",
      large: "w-9 h-9",
    },
    variant: {
      primary:
        "stroke-primary-complimentary-500 text-primary-complimentary-500",
      secondary: "text-primary-complimentary-500",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

interface IconProps
  extends SVGAttributes<SVGElement>,
    VariantProps<typeof iconVariants> {
  name: IconName;
}

const Icon: FC<IconProps> = ({ name, variant, size, className }) => {
  if (!(name in Icons)) throw new Error(`Icon ${name} not found!`);

  const Icon = Icons[name];

  return (
    <Icon className={twMerge(iconVariants({ variant, size }), className)} />
  );
};

export default Icon;
