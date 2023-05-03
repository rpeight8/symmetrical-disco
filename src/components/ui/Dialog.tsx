// "use client";

// import "client-only";
import { FC } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import Button from "@/components/ui/Button";

interface DialogProps extends RadixDialog.DialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: string;
  buttons?: React.ReactElement<typeof Button>[];
  description?: string;
}

const Dialog: FC<DialogProps> = ({
  isOpen,
  onOpenChange,
  children,
  title,
  buttons,
  description,
}) => {
  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {title && (
            <RadixDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              {title}
            </RadixDialog.Title>
          )}
          {description && (
            <RadixDialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              {description}
            </RadixDialog.Description>
          )}
          {children}
          {buttons && (
            <div className="mt-[25px] flex justify-end">
              <RadixDialog.Close>
                {buttons.map((button) => button)}
              </RadixDialog.Close>
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
