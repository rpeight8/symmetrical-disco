import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDeck } from "@/lib/fetch-data";
import Heading from "@/components/ui/Heading";
import EditDeckAccordion from "@/components/EditDeckAccordion";
import DecksList from "@/components/DecksList";
import Button from "@/components/ui/Button";
import CardsList from "@/components/CardsList";
import AddCardAccordion from "@/components/AddCardAccordion";

interface decksPageProps {
  params: {
    id: string;
  };
}

/* @ts-expect-error Async Server Component */
const decksPage: FC<decksPageProps> = async ({ params }) => {
  const deck = await getDeck({
    headers: { cookie: headers().get("cookie") ?? "" },
    data: { id: params.id },
  });

  return (
    <section>
      {/* <Heading importance="h3" className="max-w-[70%] overflow-hidden">
          {deck.name}
        </Heading> */}
      <EditDeckAccordion
        id={deck.id}
        name={deck.name}
        description={deck.description ?? ""}
      />
      <div className="flex flex-col mt-5">
        <Button size="medium">Practice</Button>
        <AddCardAccordion
          deckId={deck.id}
          question={""}
          answer={""}
        ></AddCardAccordion>
        <CardsList cards={deck.cards}></CardsList>
      </div>
    </section>
  );
};

export default decksPage;
