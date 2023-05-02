"use client";

import "client-only";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useCallback, useState } from "react";
import Button from "@/components/ui/Button";
import CardForm from "@/components/CardForm";
import { twMerge } from "tailwind-merge";
import Collapsible from "@/components/ui/Collapsible";
import Span from "@/components/ui/Span";
import { Card, CardForUpdate } from "@/types/types";
import { deleteCard, updateCard } from "@/lib/fetch-data";
import Icon from "@/components/ui/Icon";

interface CardItemCollapsibleProps extends Card {}

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

  const handleNewAsnwer = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewAnswer(event.target.value);
    },
    []
  );

  const handleNewQuestion = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewQuestion(event.target.value);
    },
    []
  );

  const editButton = (
    <Button
      size="small"
      screenReaderText="Edit Card"
      onClick={useCallback(() => {
        setEdit(!isEdit);
        setAnswerVisible(false);
      }, [isEdit])}
    >
      <Icon name="Edit3" size="small" />
    </Button>
  );
  const answerButton = (
    <Button
      size="small"
      screenReaderText="Show Answer for Card"
      className="ml-auto"
      onClick={useCallback(() => {
        setAnswerVisible(!isAnswerVisible);
        setEdit(false);
      }, [isAnswerVisible])}
    >
      <Icon name="Eye" size="small" />
    </Button>
  );

  const deleteButton = (
    <Button
      size="small"
      screenReaderText="Delete Card"
      onClick={useCallback(async () => {
        await deleteCard({ data: { id } });
        router.refresh();
      }, [id, router])}
    >
      <Icon name="Trash2" size="small" />
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
      triggerWrapperClassName="flex gap-x-2"
      triggerSiblings={[
        <Span key={"title"} size="large">
          {question}
        </Span>,
      ]}
      triggerComponents={[answerButton, editButton, deleteButton]}
    >
      {collapsibleContent}
    </Collapsible>
  );
};

export default CardItemCollapsible;
