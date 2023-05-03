"use client";

import "client-only";
import { FC, useCallback, useState } from "react";
import Button from "@/components/ui/Button";
import Collapsible from "@/components/ui/Collapsible";
import * as RadixPortal from "@radix-ui/react-portal";
import Span from "@/components/ui/Span";
import Icon from "@/components/ui/Icon";

interface ShowAnswerCollapsibleProps {
  answer: string;
  Portal?: typeof RadixPortal.Root;
  portalRef?: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
}

const ShowAnswerCollapsible: FC<ShowAnswerCollapsibleProps> = ({
  Portal,
  portalRef,
  answer,
  isOpen: outerIsOpen,
  setOpen: outerSetOpen,
}) => {
  const [innerIsOpen, innerSetOpen] = useState<boolean>(false);

  const isOpen = outerIsOpen ?? innerIsOpen;
  const setOpen = outerSetOpen ?? innerSetOpen;

  const content = (
    <Span size="large" key="answer">
      {answer}
    </Span>
  );

  return (
    <Collapsible
      isOpen={isOpen}
      setOpen={setOpen}
      triggerWrapperClassName="flex flex-end"
      triggerComponents={[
        <Button
          key="showAnswer"
          size="small"
          screenReaderText="Show Answer for Card"
          className="ml-auto"
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          <Icon name="Eye" size="small" />
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

export default ShowAnswerCollapsible;
