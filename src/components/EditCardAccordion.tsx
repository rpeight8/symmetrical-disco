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
import Span from "@/components/ui/Span";

interface EditCardAccordionProps extends CardForUpdate {}

const onSubmit = (card: CardForUpdate) => {
  updateCard({ data: card });
};

const EditCardAccordion: FC<EditCardAccordionProps> = ({
  answer = "",
  question = "",
  id,
}) => {
  const titleComponent = <Span size="large">{question}</Span>;
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="flex flex-row justify-between items-center"
          titleComponent={titleComponent}
          asChild
        >
          <Button size="medium">Edit Card</Button>
        </AccordionTrigger>
        <AccordionContent>
          <CardForm<CardForUpdate>
            onSubmit={onSubmit}
            card={{ answer, id, question }}
            actionButtonText="Save Card"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EditCardAccordion;
