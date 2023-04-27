"use client";

import "client-only";
import { FC, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { createDeck } from "@/lib/fetch-data";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import type { Card, CardForCreation, CardForUpdate } from "@/types/types";

interface CardFormProps {
  question: string;
  answer: string;
  actionButtonText: string;
  onAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQuestionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

const CardForm = ({
  actionButtonText,
  onSubmit,
  onQuestionChange,
  onAnswerChange,
  question,
  answer,
}: CardFormProps) => {
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
              onQuestionChange(event);
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
              onAnswerChange(event);
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button
          size="medium"
          onClick={async (event) => {
            onSubmit(event);
          }}
        >
          {actionButtonText}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default CardForm;
