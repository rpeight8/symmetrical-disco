"use client";

import "client-only";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import Button from "@/components/ui/Button";
import CardForm from "@/components/CardForm";
import { twMerge } from "tailwind-merge";
import Collapsible from "@/components/ui/Collapsible";
import Span from "@/components/ui/Span";
import { CardForUpdate } from "@/types/types";
import { updateCard } from "@/lib/fetch-data";

interface CardItemCollapsibleProps {
  question: string;
  answer: string;
  id: string;
}

const onSubmit = async (card: CardForUpdate) => {
  return updateCard({ data: card });
};

const CardItemCollapsible: FC<CardItemCollapsibleProps> = ({
  question,
  answer,
  id,
}) => {
  const router = useRouter();

  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [newQuestion, setNewQuestion] = useState<string>(question);
  const [newAnswer, setNewAnswer] = useState<string>(answer);

  const handleNewAsnwer = useCallback((event) => {
    setNewAnswer(event.target.value);
  }, []);

  const handleNewQuestion = useCallback((event) => {
    setNewQuestion(event.target.value);
  }, []);

  const editButton = (
    <Button
      size="medium"
      onClick={() => {
        setEdit(!isEdit);
        setAnswerVisible(false);
      }}
    >
      Edit
    </Button>
  );
  const answerButton = (
    <Button
      size="medium"
      className="ml-auto"
      onClick={() => {
        setAnswerVisible(!isAnswerVisible);
        setEdit(false);
      }}
    >
      Answer
    </Button>
  );

  let collapsibleContent = null;

  if (isEdit) {
    collapsibleContent = (
      <CardForm
        onSubmit={async (event) => {
          event.preventDefault();
          await onSubmit({
            id,
            question: newQuestion,
            answer: newAnswer,
          });
          router.refresh();
        }}
        onAnswerChange={handleNewAsnwer}
        onQuestionChange={handleNewQuestion}
        question={newQuestion}
        answer={newAnswer}
        actionButtonText="Save Card"
      />
    );
  } else if (isAnswerVisible) {
    collapsibleContent = (
      <Span size="large" key="answer">
        {answer}
      </Span>
    );
  }

  return (
    <Collapsible
      isOpen={isEdit || isAnswerVisible}
      className="w-full"
      triggerWrapperClassName="flex"
      triggerSiblings={[
        <Span key={"title"} size="large">
          {question}
        </Span>,
      ]}
      triggerComponents={[answerButton, editButton]}
    >
      {collapsibleContent}
    </Collapsible>
  );
};

export default CardItemCollapsible;
