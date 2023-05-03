"use client";

import "client-only";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import CardForm from "@/components/CardForm";
import { updateCard } from "@/lib/fetch-data";
import type { CardForUpdate } from "@/types/types";
import * as RadixPortal from "@radix-ui/react-portal";

interface EditDeckCollapsibleProps extends CardForUpdate {
  Portal?: typeof RadixPortal.Root;
  portalRef?: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
}

const onSubmit = async (card: CardForUpdate) => {
  return updateCard({ data: card });
};

const EditCardCollapsible: FC<EditDeckCollapsibleProps> = ({
  id,
  question,
  answer,
  Portal,
  portalRef,
  isOpen: outerIsOpen,
  setOpen: outerSetOpen,
}) => {
  const router = useRouter();
  const [innerIsOpen, innerSetOpen] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<string>(question);
  const [newAnswer, setNewAsnwer] = useState<string>(answer);

  const isOpen = outerIsOpen ?? innerIsOpen;
  const setOpen = outerSetOpen ?? innerSetOpen;

  const content = (
    <CardForm
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({
          id,
          answer: newAnswer,
          question: newQuestion,
        });
        router.refresh();
        setNewQuestion("");
        setNewAsnwer("");
        setOpen(false);
      }}
      onQuestionChange={useCallback((event) => {
        setNewQuestion(event.target.value);
      }, [])}
      onAnswerChange={useCallback((event) => {
        setNewAsnwer(event.target.value);
      }, [])}
      question={newQuestion}
      answer={newAnswer}
      actionButtonText="Save Card"
    />
  );

  return (
    <Collapsible
      isOpen={isOpen}
      setOpen={setOpen}
      triggerWrapperClassName="flex flex-end"
      triggerComponents={[
        <Button key="editCard" size="medium">
          Edit Deck
        </Button>,
      ]}
    >
      {(Portal && portalRef && (
        <Portal container={portalRef.current}>{content}</Portal>
      )) ||
        content}
    </Collapsible>
  );
};

export default EditCardCollapsible;
