import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDecks } from "@/lib/fetch-data";
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
  const decks = await getDecks({
    headers: { cookie: headers().get("cookie") ?? "" },
  });

  console.log(decks);

  return (
    <section>
      <AddDeckAccordion />
      <DecksList items={decks} />
    </section>
  );
};

export default decksPage;
