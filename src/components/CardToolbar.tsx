import { FC, useState } from "react";
import EditCardCollapsible from "@/components/EditCardCollapsible";
import { Card } from "@/types/types";
import * as RadixPortal from "@radix-ui/react-portal";
import ShowAnswerCollapsible from "@/components/ShowAnswerCollapsible";
import { useRouter } from "next/navigation";
import { deleteCard } from "@/lib/fetch-data";
import Button from "@/components/ui/Button";
import ConfirmDialog from "./ConfirmDialog";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/ui/Icon";

interface CardToolbarProps {
  card: Card;
  Portal: typeof RadixPortal.Root;
  portalRef: React.RefObject<HTMLDivElement>;
}

const CardToolbar: FC<CardToolbarProps> = ({
  card,
  Portal,
  portalRef,
  className,
}) => {
  const router = useRouter();
  const [isDelete, setDelete] = useState<boolean>(false);
  const [isShowAnswerOpen, setShowAnswerOpen] = useState<boolean>(false);
  const [isEditCardOpen, setEditCardOpen] = useState<boolean>(false);

  const openEditCard = (isOpen: boolean) => {
    setShowAnswerOpen(false);
    setEditCardOpen(!isEditCardOpen);
  };

  const openShowAnswer = (isOpen: boolean) => {
    setEditCardOpen(false);
    setShowAnswerOpen(!isShowAnswerOpen);
  };

  const onDeleteConfirm = async () => {
    await deleteCard({ data: card });
    router.refresh();
  };

  return (
    <>
      <ConfirmDialog
        title="Delete Card"
        description="Are you sure you want to delete this card?"
        confirmButtonText="Delete"
        isOpen={isDelete}
        setOpen={setDelete}
        onConfirm={onDeleteConfirm}
      />
      <div className={twMerge("flex gap-x-2", className)}>
        <ShowAnswerCollapsible
          isOpen={isShowAnswerOpen}
          setOpen={openShowAnswer}
          answer={card.answer}
          Portal={Portal}
          portalRef={portalRef}
        />
        <EditCardCollapsible
          isOpen={isEditCardOpen}
          setOpen={openEditCard}
          {...card}
          Portal={Portal}
          portalRef={portalRef}
        />
        <Button size="small" onClick={() => setDelete(!isDelete)}>
          <Icon size="small" name="Trash2" />
        </Button>
      </div>
    </>
  );
};

export default CardToolbar;
