import { deckSchema, cardSchema, decksSchema } from "@/lib/schemas";
import { CardForCreation, DeckForCreation } from "@/types/types";

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

export const createCard = async ({
  question,
  answer,
  deckId,
}: CardForCreation) => {
  try {
    const res = await fetch("http://localhost:3000/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
        deckId,
      }),
    });

    if (!res.ok) throw new Error(`Failed to create card: ${res.statusText}`);
  } catch (error: unknown) {
    throw error;
  }
};

export const createDeck = async ({ name, description }: DeckForCreation) => {
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

    if (!res.ok) throw new Error(`Failed to create deck: ${res.statusText}`);
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
