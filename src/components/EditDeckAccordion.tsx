"use client";

import "client-only";
import { FC, useCallback, useState } from "react";
import Accordion, {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import DeckForm from "@/components/DeckForm";
import { updateDeck } from "@/lib/fetch-data";
import type { DeckForUpdate } from "@/types/types";
import { useRouter } from "next/navigation";

interface EditDeckAccordionProps extends DeckForUpdate {}

const onSubmit = (deck: DeckForUpdate) => {
  return updateDeck({ data: deck });
};

const EditDeckAccordion: FC<EditDeckAccordionProps> = ({ id }) => {
  const router = useRouter();
  const [newName, setNewName] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Add Deck</Button>
        </AccordionTrigger>
        <AccordionContent>
          <DeckForm
            name={newName}
            description={newDescription}
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
            }}
            onNameChange={useCallback((event) => {
              setNewName(event.target.value);
            }, [])}
            onDescriptionChange={useCallback((event) => {
              setNewDescription(event.target.value);
            }, [])}
            actionButtonText="Create Deck"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EditDeckAccordion;
