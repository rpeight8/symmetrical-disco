"use client";

import "client-only";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import DeckForm from "@/components/CardForm";
import { createDeck } from "@/lib/fetch-data";
import type { DeckForCreation } from "@/types/types";
import * as RadixPortal from "@radix-ui/react-portal";

interface AddCardCollapsibleProps {
  Portal?: typeof RadixPortal.Root;
  portalRef?: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
}

const onSubmit = async (deck: DeckForCreation) => {
  return createDeck({ data: deck });
};

const AddDeckCollapsible: FC<AddCardCollapsibleProps> = ({
  Portal,
  portalRef,
  isOpen: outerIsOpen,
  setOpen: outerSetOpen,
}) => {
  const router = useRouter();
  const [innerIsOpen, innerSetOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const isOpen = outerIsOpen ?? innerIsOpen;
  const setOpen = outerSetOpen ?? innerSetOpen;

  const content = (
    <DeckForm
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({
          name,
          description,
        });
        router.refresh();
        setName("");
        setDescription("");
        setOpen(false);
      }}
      onAnswerChange={useCallback((event) => {
        setDescription(event.target.value);
      }, [])}
      onQuestionChange={useCallback((event) => {
        setName(event.target.value);
      }, [])}
      question={name}
      answer={description}
      actionButtonText="Add Card"
    />
  );

  return (
    <Collapsible
      isOpen={isOpen}
      setOpen={setOpen}
      triggerWrapperClassName="flex flex-end"
      triggerComponents={[
        <Button key="addCard" size="medium">
          Add Deck
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

export default AddDeckCollapsible;
