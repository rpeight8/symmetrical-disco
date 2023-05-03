import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDeck } from "@/lib/fetch-data";
import Button from "@/components/ui/Button";
import CardsList from "@/components/CardsList";

import Heading from "@/components/ui/Heading";
import CardToolbar from "@/components/CardToolbar";

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
      <CardToolbar deck={deck}></CardToolbar>
      <div></div>
      <div className="flex flex-col mt-5">
        <Button size="medium">Practice</Button>
        <CardsList cards={deck.cards} className="mt-5"></CardsList>
      </div>
    </section>
  );
};

export default DeckPage;
