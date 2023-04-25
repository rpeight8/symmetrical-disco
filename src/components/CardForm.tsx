"use client";

import "client-only";
import { FC, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { createDeck } from "@/lib/fetch-data";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import type { CardForCreation, CardForUpdate } from "@/types/types";

interface CardFormProps<T extends CardForCreation | CardForUpdate> {
  card: T;
  actionButtonText: string;
  onSubmit(card: T): void;
}

const CardForm = <T extends CardForCreation | CardForUpdate>({
  actionButtonText,
  onSubmit,
  card,
}: CardFormProps<T>) => {
  const router = useRouter();
  const [question, setQuestion] = useState<string>(card.question);
  const [answer, setAnswer] = useState<string>(card.answer);

  return (
    <Form.Root className="text-primary-complimentary-500 flex flex-col gap-y-5">
      <Form.Field name="name" className="flex flex-col items-start">
        <Form.Label asChild>
          <Label text="Question" size="large" />
        </Form.Label>
        <Form.Control asChild>
          <Input
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="description" className="flex flex-col items-start">
        <Form.Label asChild>
          <Label text="Answer" size="large" />
        </Form.Label>
        <Form.Control asChild>
          <Input
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button
          size="medium"
          onClick={async (event) => {
            event.preventDefault();
            await onSubmit({ ...card, question, answer });
            setAnswer("");
            setQuestion("");
            router.refresh();
          }}
        >
          {actionButtonText}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default CardForm;
