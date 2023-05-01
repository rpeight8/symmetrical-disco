import Span from "@/components/ui/Span";
import { FC, HTMLAttributes } from "react";
import type { Cards } from "@/types/types";
import Button from "@/components/ui/Button";
import CardListItem from "@/components/CardListItem";

interface CardsListProps extends HTMLAttributes<HTMLUListElement> {
  cards: Cards;
}

const CardsList: FC<CardsListProps> = ({ cards, className }) => {
  return (
    <ul className={className}>
      {cards.map((card) => {
        return <CardListItem key={card.id} card={card} className="mt-5" />;
      })}
    </ul>
  );
};

export default CardsList;
