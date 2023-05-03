"use client";

import "client-only";
import { FC, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import CardForm from "@/components/CardForm";
import { createCard } from "@/lib/fetch-data";
import type { CardForCreation } from "@/types/types";
import * as RadixPortal from "@radix-ui/react-portal";

interface AddCardCollapsibleProps {
  deckId: string;
  Portal?: typeof RadixPortal.Root;
  portalRef?: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
}

const onSubmit = async (card: CardForCreation) => {
  return createCard({ data: card });
};

const AddCardCollapsible: FC<AddCardCollapsibleProps> = ({
  deckId,
  Portal,
  portalRef,
  isOpen: outerIsOpen,
  setOpen: outerSetOpen,
}) => {
  const router = useRouter();
  const [innerIsOpen, innerSetOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const isOpen = outerIsOpen ?? innerIsOpen;
  const setOpen = outerSetOpen ?? innerSetOpen;

  const content = (
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
      actionButtonText="Add Card"
    />
  );

  return (
    <Collapsible
      isOpen={isOpen}
      setOpen={setOpen}
      triggerWrapperClassName="flex flex-end"
      triggerComponents={[
        <Button key="addCard" size="medium">
          Add Card
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

export default AddCardCollapsible;
