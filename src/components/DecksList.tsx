import { FC, HTMLAttributes } from "react";
import type { Deck } from "@/lib/schemas";
import Link from "next/link";

interface DecksListProps extends HTMLAttributes<HTMLUListElement> {
  items: Deck[];
}

const DecksList: FC<DecksListProps> = ({ items }) => {
  return (
    <ul>
      {items.map((deck) => {
        return (
          <li key={deck.id} className="flex">
            <Link href={`/decks/${deck.id}`} className="flex-1">
              {deck.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DecksList;
