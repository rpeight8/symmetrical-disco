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
import { updateCard } from "@/lib/fetch-data";
import { CardForUpdate } from "@/types/types";
import Span from "@/components/ui/Span";
import { useRouter } from "next/navigation";

interface EditCardAccordionProps extends CardForUpdate {}

const onSubmit = async (card: CardForUpdate) => {
  return updateCard({ data: card });
};

const EditCardAccordion: FC<EditCardAccordionProps> = ({
  question,
  answer,
  id,
}) => {
  const router = useRouter();
  const titleComponent = (
    <Span size="large" key="title">
      {question}
    </Span>
  );
  
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);

  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="flex flex-row justify-between items-center"
          siblings={[titleComponent]}
          asChild
        >
          <Button size="medium">Edit Card</Button>
        </AccordionTrigger>
        <AccordionContent>
          <CardForm
            onSubmit={async (event) => {
              event.preventDefault();
              await onSubmit({ id, question: newQuestion, answer: newAnswer });
              router.refresh();
            }}
            onAnswerChange={useCallback((event) => {
              setNewAnswer(event.target.value);
            }, [])}
            onQuestionChange={useCallback((event) => {
              setNewQuestion(event.target.value);
            }, [])}
            question={newQuestion}
            answer={newAnswer}
            actionButtonText="Save Card"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EditCardAccordion;
