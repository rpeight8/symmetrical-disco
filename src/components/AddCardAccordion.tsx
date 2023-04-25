"use client";

import "client-only";
import { FC } from "react";
import Accordion, {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import CardForm from "@/components/CardForm";
import { createCard } from "@/lib/fetch-data";
import { CardForCreation, CardForUpdate } from "@/types/types";

interface AddCardAccordionProps extends CardForCreation {}

const AddCardAccordion: FC<AddCardAccordionProps> = ({
  answer = "",
  question = "",
  deckId,
}) => {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Add Card</Button>
        </AccordionTrigger>
        <AccordionContent>
          <CardForm<CardForCreation>
            onSubmit={createCard}
            card={{ answer, deckId, question }}
            actionButtonText="Create Card"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddCardAccordion;
