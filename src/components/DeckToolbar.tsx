"use client";

import "client-only";
import { FC, useRef, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import AddCardCollapsible from "@/components/AddCardCollapsible";
import { Deck } from "@/types/types";
import EditDeckCollapsible from "@/components/EditDeckCollapsible";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { deleteDeck } from "@/lib/fetch-data";
import { useRouter } from "next/navigation";

interface DeckToolbarProps {
  deck: Deck;
}

const DeckToolbar: FC<DeckToolbarProps> = ({ deck }) => {
  const router = useRouter();
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [isDelete, setDelete] = useState<boolean>(false);
  const [isAddCardOpen, setAddCardOpen] = useState<boolean>(false);
  const [isEditDeckOpen, setEditDeckOpen] = useState<boolean>(false);

  const openEditDeck = (isOpen: boolean) => {
    setAddCardOpen(false);
    setEditDeckOpen(!isEditDeckOpen);
  };

  const openAddCard = (isOpen: boolean) => {
    setEditDeckOpen(false);
    setAddCardOpen(!isAddCardOpen);
  };

  const onDeleteConfirm = async () => {
    await deleteDeck({ data: deck });
    router.push("/decks");
  };

  return (
    <>
      <ConfirmDialog
        title="Confirm"
        description="Are you sure you want to delete this deck?"
        isOpen={isDelete}
        setOpen={setDelete}
        onConfirm={onDeleteConfirm}
        confirmButtonText="Delete Deck"
      ></ConfirmDialog>
      <div>
        <div className="flex justify-between">
          <AddCardCollapsible
            isOpen={isAddCardOpen}
            setOpen={openAddCard}
            deckId={deck.id}
            Portal={Portal.Root}
            portalRef={portalRef}
          ></AddCardCollapsible>
          <EditDeckCollapsible
            {...deck}
            isOpen={isEditDeckOpen}
            setOpen={openEditDeck}
            Portal={Portal.Root}
            portalRef={portalRef}
          ></EditDeckCollapsible>
          <Button
            size="medium"
            onClick={() => {
              setDelete(true);
            }}
          >
            Delete Deck
          </Button>
        </div>
        <div ref={portalRef}></div>
      </div>
    </>
  );
};

export default DeckToolbar;
