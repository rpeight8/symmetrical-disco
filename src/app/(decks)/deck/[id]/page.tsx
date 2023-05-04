import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDeck } from "@/lib/fetch-data";
import CardsList from "@/components/CardsList";

import Heading from "@/components/ui/Heading";
import DeckToolbar from "@/components/DeckToolbar";
import ReviewButton from "@/components/ReviewButton";

interface deckPageProps {
  params: {
    id: string;
  };
}

/* @ts-expect-error Async Server Component */
const DeckPage: FC<deckPageProps> = async ({ params }) => {
  const deck = await getDeck({
    headers: { cookie: headers().get("cookie") ?? "" },
    data: { id: params.id },
  });

  return (
    <section>
      <Heading importance="h2" size="large">
        {deck.name}
      </Heading>
      <DeckToolbar deck={deck}></DeckToolbar>
      <div></div>
      <div className="flex flex-col mt-5">
        <ReviewButton deck={deck} />
        <CardsList cards={deck.cards} className="mt-5"></CardsList>
      </div>
    </section>
  );
};

export default DeckPage;
