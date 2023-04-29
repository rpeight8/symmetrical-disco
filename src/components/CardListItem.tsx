import { Card } from "@/types/types";
import { FC, HTMLAttributes } from "react";
import Span from "@/components/ui/Span";
import EditCardAccordion from "@/components/EditCardAccordion";

interface CardListItemProps extends HTMLAttributes<HTMLLIElement> {
  card: Card;
}

const CardListItem: FC<CardListItemProps> = ({ card, className }) => {
  return (
    <li key={card.id} className={className}>
      <EditCardAccordion {...card} />
    </li>
  );
};

export default CardListItem;
