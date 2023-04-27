import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(options);
  const { id } = params;

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const dbDeck = await db.deck.findUnique({
    where: {
      id,
    },
    include: {
      cards: true,
    },
  });

  if (!dbDeck) {
    return new Response("Deck not found", { status: 404 });
  }

  if (dbDeck.authorId !== session.user.id) {
    return new Response("Unauthorized to load this deck", { status: 401 });
  }
  return new Response(JSON.stringify(dbDeck));
}
