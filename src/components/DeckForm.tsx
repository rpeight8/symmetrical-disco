"use client";

import "client-only";
import { FC, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { createDeck } from "@/lib/fetch-data";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import type { DeckForCreation, DeckForUpdate } from "@/types/types";

interface DeckFormProps {
  name: string;
  description: string;
  actionButtonText: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
}

const DeckForm = ({
  actionButtonText,
  onSubmit,
  onNameChange,
  onDescriptionChange,
  name,
  description,
}: DeckFormProps) => {
  return (
    <Form.Root className="text-primary-complimentary-500 flex flex-col gap-y-5">
      <Form.Field name="name" className="flex flex-col items-start">
        <Form.Label asChild>
          <Label text="Name" size="large" />
        </Form.Label>
        <Form.Control asChild>
          <Input
            value={name}
            onChange={(event) => {
              onNameChange(event);
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="description" className="flex flex-col items-start">
        <Form.Label asChild>
          <Label text="Description" size="large" />
        </Form.Label>
        <Form.Control asChild>
          <Input
            value={description}
            onChange={(event) => {
              onDescriptionChange(event);
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

export default DeckForm;
