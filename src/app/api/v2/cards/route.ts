import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Card } from "@/types/types";

export async function POST(request: Request) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const card = (await request.json()) as Card;

  const dbDeck = await db.deck.findUnique({
    where: {
      id: card.deckId,
    },
  });

  if (!dbDeck) {
    return new Response("Deck not found", { status: 404 });
  }

  if (dbDeck.authorId !== session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const createdCard = await db.card.create({
    data: card,
  });

  return new Response(JSON.stringify(createdCard), { status: 201 });
}
