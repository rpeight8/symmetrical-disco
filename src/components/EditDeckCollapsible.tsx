"use client";

import "client-only";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import CardForm from "@/components/CardForm";
import { updateDeck } from "@/lib/fetch-data";
import type { DeckForUpdate } from "@/types/types";
import * as RadixPortal from "@radix-ui/react-portal";
import DeckForm from "@/components/DeckForm";

interface EditDeckCollapsibleProps extends DeckForUpdate {
  Portal?: typeof RadixPortal.Root;
  portalRef?: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
}

const onSubmit = async (deck: DeckForUpdate) => {
  return updateDeck({ data: deck });
};

const AddCardCollapsible: FC<EditDeckCollapsibleProps> = ({
  id,
  name,
  description,
  Portal,
  portalRef,
  isOpen: outerIsOpen,
  setOpen: outerSetOpen,
}) => {
  const router = useRouter();
  const [innerIsOpen, innerSetOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const [newDescription, setNewDescription] = useState<string | null>(
    description
  );

  const isOpen = outerIsOpen ?? innerIsOpen;
  const setOpen = outerSetOpen ?? innerSetOpen;

  const content = (
    <DeckForm
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({
          id,
          name: newName,
          description: newDescription,
        });
        router.refresh();
        setNewName("");
        setNewDescription("");
        setOpen(false);
      }}
      onNameChange={useCallback((event) => {
        setNewName(event.target.value);
      }, [])}
      onDescriptionChange={useCallback((event) => {
        setNewDescription(event.target.value);
      }, [])}
      name={newName}
      description={newDescription}
      actionButtonText="Save Deck"
    />
  );

  return (
    <Collapsible
      isOpen={isOpen}
      setOpen={setOpen}
      triggerWrapperClassName="flex flex-end"
      triggerComponents={[
        <Button key="editDeck" size="medium">
          Edit Deck
        </Button>,
      ]}
    >
      {(Portal && portalRef && (
        <Portal container={portalRef.current}>{content}</Portal>
      )) ||
        content}
    </Collapsible>
  );
};

export default AddCardCollapsible;
