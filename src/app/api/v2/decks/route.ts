import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";

// @ts-ignore
export async function GET(request, response) {
  const session = await getServerSession(options);
  console.log(`V2 Session in route: ${JSON.stringify(session)}`);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const dbDecks = await db.deck.findMany({
    where: {
      authorId: session.user.id,
    },
  });
  console.log(`Found ${dbDecks.length} decks for user ${session.user.id}`);
  return new Response(JSON.stringify(dbDecks));
}

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
