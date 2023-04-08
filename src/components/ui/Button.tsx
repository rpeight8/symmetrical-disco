import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text?: string;
}

const buttonVariants = cva("", {
  variants: {
    position: {
      over: "absolute top-0 left-0 z-50",
    },
  },
});

const Button: FC<ButtonProps> = ({ text, position, children, ...props }) => {
  const classes = twMerge(buttonVariants({ position }));
  return (
    <button className={classes} {...props}>
      {text ? <span>{text}</span> : children}
    </button>
  );
};

export default Button;
