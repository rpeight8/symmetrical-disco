"use client";

import "client-only";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import CardForm from "@/components/CardForm";
import { createCard } from "@/lib/fetch-data";
import type { CardForCreation } from "@/types/types";

interface AddCardCollapsibleProps {
  deckId: string;
}

const onSubmit = async (card: CardForCreation) => {
  return createCard({ data: card });
};

const AddCardCollapsible: FC<AddCardCollapsibleProps> = ({ deckId }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  return (
    <Collapsible
      isOpen={isOpen}
      setOpen={setOpen}
      className="w-full"
      triggerWrapperClassName="flex flex-end"
      triggerComponents={[
        <Button key="addCard" className="ml-auto" size="medium">
          Create Card
        </Button>,
      ]}
    >
      <CardForm
        onSubmit={async (event) => {
          event.preventDefault();
          await onSubmit({
            deckId,
            question,
            answer,
          });
          router.refresh();
          setQuestion("");
          setAnswer("");
          setOpen(false);
        }}
        onAnswerChange={useCallback((event) => {
          setAnswer(event.target.value);
        }, [])}
        onQuestionChange={useCallback((event) => {
          setQuestion(event.target.value);
        }, [])}
        question={question}
        answer={answer}
        actionButtonText="Save Card"
      />
    </Collapsible>
  );
};

export default AddCardCollapsible;
