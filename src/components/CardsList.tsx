import Span from "@/components/ui/Span";
import { FC, HTMLAttributes } from "react";
import type { Cards } from "@/types/types";
import Button from "@/components/ui/Button";

interface CardsListProps extends HTMLAttributes<HTMLUListElement> {
  cards: Cards;
}

const CardsList: FC<CardsListProps> = ({ cards }) => {
  return (
    <ul>
      {cards.map((card) => {
        return (
          <li key={card.id}>
            <Span>{card.question}</Span>
            <Button>Edit</Button>
          </li>
        );
      })}
    </ul>
  );
};

export default CardsList;
