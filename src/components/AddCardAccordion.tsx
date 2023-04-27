"use client";

import "client-only";
import { FC, useCallback, useState } from "react";
import Accordion, {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import CardForm from "@/components/CardForm";
import { createCard } from "@/lib/fetch-data";
import { CardForCreation } from "@/types/types";
import Span from "@/components/ui/Span";
import { useRouter } from "next/navigation";

interface AddCardAccordionProps extends CardForCreation {}

const onSubmit = async (card: CardForCreation) => {
  return createCard({ data: card });
};

const AddCardAccordion: FC<AddCardAccordionProps> = ({ deckId }) => {
  const router = useRouter();
  const [question, setNewQuestion] = useState<string>("");
  const [answer, setNewAnswer] = useState<string>("");

  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="flex flex-row justify-end items-center"
          asChild
        >
          <Button size="medium">Add Card</Button>
        </AccordionTrigger>
        <AccordionContent>
          <CardForm
            onSubmit={async (event) => {
              event.preventDefault();
              await onSubmit({ deckId, question, answer });
              router.refresh();
              setNewQuestion("");
              setNewAnswer("");
            }}
            onAnswerChange={useCallback((event) => {
              setNewAnswer(event.target.value);
            }, [])}
            onQuestionChange={useCallback((event) => {
              setNewQuestion(event.target.value);
            }, [])}
            question={question}
            answer={answer}
            actionButtonText="Add"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddCardAccordion;
