import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import type { DeckForCreation } from "@/types/types";

// @ts-ignore
export async function GET() {
  try {
    const session = await getServerSession(options);
    console.log(`V2 Session in Decks route: ${JSON.stringify(session)}`);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const dbDecks = await db.deck.findMany({
      where: {
        authorId: session.user.id,
      },
      include: {
        cards: true,
      },
    });
    console.log(`Found ${dbDecks.length} decks for user ${session.user.id}`);
    return new Response(JSON.stringify(dbDecks));
  } catch (err) {
    console.log(`Error in GET /decks: ${err}`);
    return new Response("Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, description } = (await request.json()) as DeckForCreation;

  const dbDeck = await db.deck.findUnique({
    where: {
      name_authorId: {
        name: name,
        authorId: session.user.id,
      },
    },
  });

  if (dbDeck) {
    console.log(`Deck already exsists`);
    return new Response("Deck already exists", { status: 400 });
  }

  const createdDeck = await db.deck.create({
    data: {
      name,
      description,
      authorId: session.user.id,
    },
  });

  return new Response(JSON.stringify(createdDeck), { status: 201 });
}
