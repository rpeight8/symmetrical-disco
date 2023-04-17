import db from "@/lib/db";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";

// @ts-ignore
export async function POST(request) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await request.json();

  await db.card.create({
    data,
  });

  return new Response("Ok");
}
