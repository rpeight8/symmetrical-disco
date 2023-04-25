import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDeck } from "@/lib/fetch-data";
import Heading from "@/components/ui/Heading";
import EditDeckAccordion from "@/components/EditDeckAccordion";
import DecksList from "@/components/DecksList";
import Button from "@/components/ui/Button";

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
    <section>
      {/* <Heading importance="h3" className="max-w-[70%] overflow-hidden">
          {deck.name}
        </Heading> */}
      <EditDeckAccordion
        deckId={deck.id}
        deckName={deck.name}
        deckDescription={deck.description ?? ""}
      />
    </section>
  );
};

export default decksPage;
