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
  try {
    const decks = await getDecks();
    console.log(`decks: ${decks}`);
  } catch (error) {
    console.error(error);
  }
  return <div>decksPageProps</div>;
};

export default decksPage;
