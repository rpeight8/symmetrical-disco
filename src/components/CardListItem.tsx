import type { Card } from "@/types/types";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import CardItemCollapsible from "@/components/CardItemCollapsible";

interface CardListItemProps extends HTMLAttributes<HTMLLIElement> {
  card: Card;
}

const CardListItem: FC<CardListItemProps> = ({ card, className }) => {
  return (
    <li className={twMerge("flex justify-between w-full", className)}>
      <CardItemCollapsible {...card} />
    </li>
  );
};

export default CardListItem;
