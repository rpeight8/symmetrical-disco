import { deckSchema, cardSchema, decksSchema } from "@/lib/schemas";
import { headers as THeaders } from "next/headers";

export const getDeck = async ({
  deckId,
  headers,
}: {
  deckId: string;
  headers?: { [key: string]: string };
}) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v2/decks/${deckId}`, {
      headers,
    });
    if (!res.ok) throw new Error(`Failed to fetch deck: ${res.statusText}`);
    const deck = await res.json();
    console.log(`Deck: ${JSON.stringify(deck)}`);
    return deckSchema.parse(deck);
  } catch (error: unknown) {
    throw error;
  }
};

export const getDecks = async ({
  headers,
}: {
  headers?: { [key: string]: string };
} = {}) => {
  try {
    const res = await fetch("http://localhost:3000/api/v2/decks", {
      headers,
    });
    if (!res.ok) throw new Error(`Failed to fetch decks: ${res.statusText}`);
    const decks = await res.json();
    return decksSchema.parse(decks);
  } catch (error: unknown) {
    throw error;
  }
};

export const createDeck = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const res = await fetch("http://localhost:3000/api/v2/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
  } catch (error: unknown) {
    throw error;
  }
};

export const getCards = async ({
  deckId,
  headers,
}: {
  deckId: string;
  headers?: Record<string, string>;
}) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v2/decks/${deckId}/cards`,
      {
        headers,
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch cards: ${res.statusText}`);
    const cards = await res.json();
    return cardSchema.parse(cards);
  } catch (error: unknown) {
    throw error;
  }
};
