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
import { createDeck } from "@/lib/fetch-data";
import type { DeckForCreation } from "@/types/types";
import { useRouter } from "next/navigation";

interface AddDeckAccordionProps {}

const onSubmit = (deck: DeckForCreation) => {
  return createDeck({ data: deck });
};

const AddDeckAccordion: FC<AddDeckAccordionProps> = ({}) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Add Deck</Button>
        </AccordionTrigger>
        <AccordionContent>
          <DeckForm
            name={name}
            description={description}
            onSubmit={async (event) => {
              event.preventDefault();
              await onSubmit({ name, description });
              router.refresh();
              setName("");
              setDescription("");
            }}
            onNameChange={useCallback((event) => {
              setName(event.target.value);
            }, [])}
            onDescriptionChange={useCallback((event) => {
              setDescription(event.target.value);
            }, [])}
            actionButtonText="Create Deck"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddDeckAccordion;
