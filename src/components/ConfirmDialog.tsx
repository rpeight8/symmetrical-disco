import { FC } from "react";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
  confirmButtonText: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  setOpen,
  title,
  description,
  onConfirm,
  confirmButtonText,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={setOpen}
      title={title}
      buttons={[
        <Button
          key="delete"
          size="medium"
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
        >
          {" "}
          {confirmButtonText}
        </Button>,
      ]}
      description={description}
    />
  );
};

export default ConfirmDialog;
