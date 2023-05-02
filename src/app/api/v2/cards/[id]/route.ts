import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Card } from "@/types/types";

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = params;

  const card = (await request.json()) as Card;

  const dbCard = await db.card.findUnique({
    where: {
      id,
    },
  });

  if (!dbCard) {
    return new Response("Card not found", { status: 404 });
  }

  const dbDeck = await db.deck.findUnique({
    where: {
      id: dbCard.deckId,
    },
  });

  if (!dbDeck) {
    return new Response("Deck not found", { status: 404 });
  }

  if (dbDeck.authorId !== session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const updatedCard = await db.card.update({
    where: {
      id,
    },
    data: card,
  });

  return new Response(JSON.stringify(updatedCard), { status: 200 });
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = params;

  const dbCard = await db.card.findUnique({
    where: {
      id,
    },
  });

  if (!dbCard) {
    return new Response("Card not found", { status: 404 });
  }

  const dbDeck = await db.deck.findUnique({
    where: {
      id: dbCard.deckId,
    },
  });

  if (!dbDeck) {
    return new Response("Deck not found", { status: 404 });
  }

  if (dbDeck.authorId !== session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  await db.card.delete({
    where: {
      id,
    },
  });

  return new Response("Deleted", { status: 200 });
}
