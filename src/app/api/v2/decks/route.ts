import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";

// @ts-ignore
export async function GET() {
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
}

export async function POST(request: Request) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, description } = (await request.json()) as {
    name: string;
    description: string;
  };

  const dbDeck = await db.deck.findUnique({
    where: {
      name_authorId: {
        name: name,
        authorId: session.user.id,
      },
    },
  });

  console.log(dbDeck);

  if (dbDeck) {
    return new Response("Deck already exists", { status: 400 });
  }

  await db.deck.create({
    data: {
      name,
      description,
      authorId: session.user.id,
    },
  });

  return new Response("Ok");
}
