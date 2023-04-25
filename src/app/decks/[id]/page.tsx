import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDeck } from "@/lib/fetch-data";
import Heading from "@/components/ui/Heading";
import AddDeckAccordion from "@/components/AddDeckAccordion";
import DecksList from "@/components/DecksList";

interface decksPageProps {
  params: {
    id: string;
  };
}

/* @ts-expect-error Async Server Component */
const decksPage: FC<decksPageProps> = async ({ params }) => {
  const deck = await getDeck({
    headers: { cookie: headers().get("cookie") ?? "" },
    deckId: params.id,
  });


  return (
    <div>
      <span>{deck.name}</span>
      <span>{deck.description}</span>
    </div>
  );
};

export default decksPage;
