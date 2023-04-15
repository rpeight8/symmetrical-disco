import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { deckName } = (await request.json()) as { deckName: string };

  const dbDeck = await db.deck.findFirst({
    where: {
      name: deckName,
      authorId: session.user.id,
    },
  });

  console.log(dbDeck);

  if (dbDeck) {
    return new Response("Deck already exists", { status: 400 });
  }

  await db.deck.create({
    data: {
      name: deckName,
      authorId: session.user.id,
    },
  });

  return new Response("Ok");
}
