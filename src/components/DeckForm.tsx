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

interface DeckFormProps<T extends DeckForCreation | DeckForUpdate> {
  deck: T;
  actionButtonText: string;
  onSubmit(data: T): void;
}

const DeckForm = <T extends DeckForCreation | DeckForUpdate>({
  actionButtonText,
  onSubmit,
  deck,
}: DeckFormProps<T>) => {
  const router = useRouter();
  const [name, setName] = useState<string>(deck.name);
  const [description, setDescription] = useState<string>(
    deck.description ?? ""
  );

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
              setName(event.target.value);
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
              setDescription(event.target.value);
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button
          size="medium"
          onClick={async (event) => {
            event.preventDefault();
            await onSubmit({ ...deck, name, description });
            setDescription("");
            setName("");
            router.refresh();
          }}
        >
          {actionButtonText}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default DeckForm;
