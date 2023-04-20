import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDecks } from "@/lib/fetch-data";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import DeckCreationForm from "@/components/DeckCreationForm";

interface decksPageProps {}

const decksPage = async ({}) => {
  const decks = await getDecks({
    headers: { cookie: headers().get("cookie") ?? "" },
  });

  console.log(decks);

  return (
    <section>
      <header className="flex justify-between">
        <Heading
          importance="h1"
          text={`Decks (${decks?.length ?? 0})`}
          size="large"
          className="font-semibold"
        />
        <Button size="medium">Add Deck</Button>
      </header>
      <DeckCreationForm />
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
    </section>
  );
};

export default decksPage;
