"use client";

import "client-only";
import { FC } from "react";
import Accordion, {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import DeckCreationForm from "@/components/DeckCreationForm";

interface AddDeckAccordionProps {}

const AddDeckAccordion: FC<AddDeckAccordionProps> = ({}) => {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Add Deck</Button>
        </AccordionTrigger>
        <AccordionContent>
          <DeckCreationForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddDeckAccordion;
