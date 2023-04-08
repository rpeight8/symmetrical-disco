import { FC, SVGAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { SidebarOpen, SidebarClose } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const Icons = {
  SidebarOpen,
  SidebarClose,
};

type Icon = LucideIcon;
type IconName = keyof typeof Icons;
export type Icons = Record<IconName, Icon>;

const iconVariants = cva("", {
  variants: {
    variant: {
      primary: "stroke-red-950 text-red-950",
      secondary: "text-secondary-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface IconProps
  extends SVGAttributes<SVGElement>,
    VariantProps<typeof iconVariants> {
  name: IconName;
}

const Icon: FC<IconProps> = ({ name, variant, className }) => {
  if (!(name in Icons)) throw new Error(`Icon ${name} not found!`);

  const Icon = Icons[name];

  const classes = twMerge(iconVariants({ variant }), className);

  return <Icon className={classes} />;
};

export default Icon;
