import { FC } from "react";
import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { twMerge } from "tailwind-merge";

interface CollapsibleProps extends RadixCollapsible.CollapsibleProps {
  isOpen: boolean;
  setOpen?: (isOpen: boolean) => void;
  triggerComponents: JSX.Element[];
  triggerSiblings?: JSX.Element[];
  triggerWrapperClassName?: string;
}

const Collapsible: FC<CollapsibleProps> = ({
  children,
  className,
  triggerWrapperClassName,
  triggerComponents = [],
  triggerSiblings = [],
  isOpen,
  setOpen,
}) => {
  return (
    <RadixCollapsible.Root
      open={isOpen}
      onOpenChange={setOpen}
      className={twMerge(className)}
    >
      <div className={twMerge(triggerWrapperClassName)}>
        {triggerSiblings}
        {triggerComponents.map((triggerComponent, index) => {
          return (
            <RadixCollapsible.Trigger key={index} asChild>
              {triggerComponent}
            </RadixCollapsible.Trigger>
          );
        })}
      </div>
      <RadixCollapsible.Content>{children}</RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
};

export default Collapsible;
