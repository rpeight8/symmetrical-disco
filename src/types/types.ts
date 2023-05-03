import {
  deckSchema,
  cardSchema,
  decksSchema,
  cardsSchema,
} from "@/lib/schemas";
import * as z from "zod";

export type Deck = z.infer<typeof deckSchema>;
export type Decks = z.infer<typeof decksSchema>;
export type Card = z.infer<typeof cardSchema>;
export type Cards = z.infer<typeof cardsSchema>;

export type CardForCreation = Omit<Card, "id">;
export type CardForUpdate = Omit<Card, "deckId">;
export type CardForDeletion = Pick<Card, "id">;

export type DeckForCreation = Omit<Deck, "id" | "cards" | "authorId">;
export type DeckForUpdate = Omit<Deck, "cards" | "authorId">;
export type DeckForDeletion = Pick<Deck, "id">;

export type RequestHeaders = { [key: string]: string };

export interface RequestWithHeaders<T> {
  data: T;
  headers?: RequestHeaders;
}
