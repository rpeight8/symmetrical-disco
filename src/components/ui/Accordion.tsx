import { FC, ReactElement, forwardRef } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import React from "react";

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion: FC<AccordionProps> = ({ children }) => {
  return (
    <RadixAccordion.Root type="single" collapsible>
      {children}
    </RadixAccordion.Root>
  );
};

export default Accordion;

export const AccordionItem = forwardRef<
  HTMLDivElement,
  RadixAccordion.AccordionItemProps
>(({ children, className, ...props }, ref) => (
  <RadixAccordion.Item className={className} {...props} ref={ref}>
    {children}
  </RadixAccordion.Item>
));

AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends RadixAccordion.AccordionTriggerProps {
  titleComponent?: React.ReactNode;
}
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ titleComponent, children, className, ...props }, ref) => (
  <RadixAccordion.Header className={className}>
    {titleComponent}
    <RadixAccordion.Trigger {...props} ref={ref}>
      {children}
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  HTMLDivElement,
  RadixAccordion.AccordionContentProps
>(({ children, className, ...props }, ref) => (
  <RadixAccordion.Content
    className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
    {...props}
    ref={ref}
  >
    <div className={className}>{children}</div>
  </RadixAccordion.Content>
));

AccordionContent.displayName = "AccordionContent";
