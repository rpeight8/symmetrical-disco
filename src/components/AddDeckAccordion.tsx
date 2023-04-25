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
import { createDeck } from "@/lib/fetch-data";

interface AddDeckAccordionProps {}

const AddDeckAccordion: FC<AddDeckAccordionProps> = ({}) => {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Add Deck</Button>
        </AccordionTrigger>
        <AccordionContent>
          <DeckForm onSubmit={createDeck} actionButtonText="Create Deck" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddDeckAccordion;
