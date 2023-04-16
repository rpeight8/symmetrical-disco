import { headers } from "next/headers";
import { FC, ReactElement } from "react";

interface decksPageProps {}

type TDeck = {
  id: number;
  name: string;
  description?: string;
  authorId: string;
};

const getDecks = async (): Promise<TDeck[]> => {
  const headersInstance = headers();
  const res = await fetch("http://localhost:3000/api/v2/decks", {
    method: "GET",
    headers: {
      cookie: headersInstance.get("cookie") + "",
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  const decks = await res.json();
  return decks;
};

const decksPage = async ({}) => {
  const decks = await getDecks();

  <div>
    {decks.map((deck) => {
      return <div key={deck.id}>{deck.name}</div>;
    })}
  </div>;
};

export default decksPage;
