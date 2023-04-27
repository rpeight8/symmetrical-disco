"use client";

import "client-only";
import { FC } from "react";
import Accordion, {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import DeckForm from "@/components/DeckForm";
import { DeckForUpdate } from "@/types/types";

interface EditDeckAccordion extends DeckForUpdate {}

const EditDeckAccordion: FC<EditDeckAccordion> = ({
  id,
  name,
  description,
}) => {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex flex-row justify-end" asChild>
          <Button size="medium">Edit Deck</Button>
        </AccordionTrigger>
        <AccordionContent>
          <DeckForm<DeckForUpdate>
            onSubmit={() => {}}
            actionButtonText="Save Deck"
            deck={{ id, name, description }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EditDeckAccordion;
