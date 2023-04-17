import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDecks } from "@/lib/fetch-data";

interface decksPageProps {}

const decksPage = async ({}) => {
  const decks = await getDecks({
    headers: { cookie: headers().get("cookie") ?? "" },
  });

  console.log(decks);

  return (
    <div>
      <ul>
        {decks.map((deck) => {
          return (
            <li key={deck.id}>
              <span>{deck.name}</span>
              <ul>
                {deck.cards.map((card) => {
                  return (
                    <li key={card.id}>
                      <span>{card.question}</span>
                      <span>{card.answer}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default decksPage;
