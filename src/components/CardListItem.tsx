"use client";

import "client-only";
import type { Card } from "@/types/types";
import { FC, HTMLAttributes, useRef } from "react";
import { twMerge } from "tailwind-merge";
import * as Portal from "@radix-ui/react-portal";
import Heading from "@/components/ui/Heading";
import CardToolbar from "@/components/CardToolbar";

interface CardListItemProps extends HTMLAttributes<HTMLLIElement> {
  card: Card;
}

const CardListItem: FC<CardListItemProps> = ({ card, className }) => {
  const portalRef = useRef<HTMLDivElement | null>(null);

  return (
    <li className={twMerge("flex flex-col w-full", className)}>
      <div className="w-full flex justify-between gap-x-2">
        <Heading importance="h3" size="large">
          {card.question}
        </Heading>
        <CardToolbar
          card={card}
          Portal={Portal.Root}
          portalRef={portalRef}
        ></CardToolbar>
      </div>
      <div ref={portalRef}></div>
      {/* <CardItemCollapsible {...card} /> */}
    </li>
  );
};

export default CardListItem;
