"use client";

import "client-only";
import { FC } from "react";
import Accordion, {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import DeckForm from "@/components/DeckForm";

interface EditDeckAccordion {
  deckId: string;
  deckName: string;
  deckDescription: string;
}

const EditDeckAccordion: FC<EditDeckAccordion> = ({
  deckId,
  deckName,
  deckDescription,
}) => {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Edit Deck</Button>
        </AccordionTrigger>
        <AccordionContent>
          <DeckForm
            onSubmit={() => {}}
            actionButtonText="Save Deck"
            initialValues={{ name: deckName, description: deckDescription }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EditDeckAccordion;
