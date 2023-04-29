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

const EditDeckAccordion: FC<EditDeckAccordionProps> = ({
  id,
  name,
  description,
}) => {
  const router = useRouter();
  const [newName, setNewName] = useState<string>(name);
  const [newDescription, setNewDescription] = useState<string>(
    description ?? ""
  );

  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Edit Deck</Button>
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
            }}
            onNameChange={useCallback((event) => {
              setNewName(event.target.value);
            }, [])}
            onDescriptionChange={useCallback((event) => {
              setNewDescription(event.target.value);
            }, [])}
            actionButtonText="Save Deck"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EditDeckAccordion;
