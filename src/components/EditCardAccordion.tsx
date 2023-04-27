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
import { updateCard } from "@/lib/fetch-data";
import { CardForUpdate } from "@/types/types";

interface EditCardAccordionProps extends CardForUpdate {}

const onSubmit = (card: CardForUpdate) => {
  updateCard({ data: card });
};

const EditCardAccordion: FC<EditCardAccordionProps> = ({
  answer = "",
  question = "",
  id,
}) => {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Add Card</Button>
        </AccordionTrigger>
        <AccordionContent>
          <CardForm<CardForUpdate>
            onSubmit={onSubmit}
            card={{ answer, id, question }}
            actionButtonText="Create Card"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EditCardAccordion;
