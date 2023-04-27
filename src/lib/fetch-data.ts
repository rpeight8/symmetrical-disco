import { deckSchema, cardSchema, decksSchema } from "@/lib/schemas";
import {
  CardForCreation,
  DeckForCreation,
  CardForUpdate,
  RequestWithHeaders,
} from "@/types/types";

export const getDeck = async ({
  data,
  headers = {},
}: RequestWithHeaders<{ id: string }>) => {
  try {
    const { id } = data;
    const res = await fetch(`http://localhost:3000/api/v2/decks/${id}`, {
      headers,
    });
    if (!res.ok) throw new Error(`Failed to fetch deck: ${res.statusText}`);
    const deck = await res.json();
    return deckSchema.parse(deck);
  } catch (error: unknown) {
    throw error;
  }
};

export const getDecks = async ({ headers = {} }: RequestWithHeaders<{}>) => {
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
  data,
  headers = {},
}: RequestWithHeaders<CardForCreation>) => {
  try {
    const { question, answer, deckId } = data;
    const res = await fetch("http://localhost:3000/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
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

export const createDeck = async ({
  data,
  headers = {},
}: RequestWithHeaders<DeckForCreation>) => {
  try {
    const { name, description } = data;
    const res = await fetch("http://localhost:3000/api/v2/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
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
  data,
  headers = {},
}: RequestWithHeaders<{ deckId: string }>) => {
  try {
    const { deckId } = data;
    const res = await fetch(
      `http://localhost:3000/api/v2/decks/${deckId}/cards`,
      {
        ...headers,
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch cards: ${res.statusText}`);
    const cards = await res.json();
    return cardSchema.parse(cards);
  } catch (error: unknown) {
    throw error;
  }
};

export const updateCard = async ({
  data,
  headers,
}: RequestWithHeaders<CardForUpdate>) => {
  try {
    const { question, answer, id } = data;
    const res = await fetch(`http://localhost:3000/api/v2/cards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        question,
        answer,
      }),
    });

    if (!res.ok) throw new Error(`Failed to update card: ${res.statusText}`);
  } catch (error: unknown) {
    throw error;
  }
};
