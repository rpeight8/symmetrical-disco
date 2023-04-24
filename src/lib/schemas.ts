import { z } from "zod";

export const cardSchema = z.object({
  id: z.string(),
  deckId: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const cardsSchema = z.array(cardSchema);

export const deckSchema = z.object({
  id: z.string(),
  description: z.string().nullable(),
  name: z.string(),
  authorId: z.string(),
  cards: cardsSchema,
});

export const decksSchema = z.array(deckSchema);

export type Deck = z.infer<typeof deckSchema>;
export type Decks = z.infer<typeof decksSchema>;
export type Card = z.infer<typeof cardSchema>;
export type Cards = z.infer<typeof cardsSchema>;
