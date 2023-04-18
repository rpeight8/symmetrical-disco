import { z } from "zod";
import { headers as THeaders } from "next/headers";

const cardSchema = z.object({
  id: z.string(),
  deckId: z.string(),
  question: z.string(),
  answer: z.string(),
});

const deckSchema = z.array(
  z.object({
    id: z.string(),
    description: z.string().nullable(),
    name: z.string(),
    authorId: z.string(),
    cards: z.array(cardSchema),
  })
);

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
    return deckSchema.parse(decks);
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
