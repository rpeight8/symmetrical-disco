import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDeck } from "@/lib/fetch-data";
import Button from "@/components/ui/Button";
import CardsList from "@/components/CardsList";
import AddCardCollapsible from "@/components/AddCardCollapsible";
// import AddCardAccordion from "@/components/AddCardAccordion";

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
      <AddCardCollapsible deckId={deck.id}></AddCardCollapsible>
      <div className="flex flex-col mt-5 bg-primary-500 relative z-10">
        <Button size="medium">Practice</Button>
        <CardsList cards={deck.cards} className="mt-5"></CardsList>
      </div>
    </section>
  );
};

export default DeckPage;
