"use client";

import "client-only";
import { FC, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import AddCardCollapsible from "@/components/AddCardCollapsible";
import { Deck } from "@/types/types";
import EditDeckCollapsible from "@/components/EditDeckCollapsible";
import Button from "@/components/ui/Button";

interface CardToolbarProps {
  deck: Deck;
}

const portalId = "card-toolbar-portal";

const CardToolbar: FC<CardToolbarProps> = ({ deck }) => {
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
  return (
    <div>
      <div className="flex justify-between">
        <AddCardCollapsible
          isOpen={isAddCardOpen}
          setOpen={openAddCard}
          deckId={deck.id}
          Portal={Portal.Root}
          portalId={portalId}
        ></AddCardCollapsible>
        <EditDeckCollapsible
          {...deck}
          isOpen={isEditDeckOpen}
          setOpen={openEditDeck}
          Portal={Portal.Root}
          portalId={portalId}
        ></EditDeckCollapsible>
        <Button size="medium" onClick={() => {}}>
          Delete Deck
        </Button>
      </div>
      <div id={portalId}></div>
    </div>
  );
};

export default CardToolbar;
