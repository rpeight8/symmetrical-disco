import { headers } from "next/headers";
import { FC } from "react";
import { getDecks } from "@/lib/fetch-data";
import DecksTable from "@/components/DecksTable";
import DeckToolbar from "@/components/DeckToolbar";

interface decksPageProps {
  params: {
    id: string;
  };
}

/* @ts-expect-error Async Server Component */
const DecksPage: FC<decksPageProps> = async ({ params }) => {
  const decks = await getDecks({
    data: {},
    headers: { cookie: headers().get("cookie") ?? "" },
  });

  return (
    <section>
      <DeckToolbar />
      <DecksTable
        decks={decks}
        className="mt-4"
        tbodyClassName="bg-primary-500"
      />
    </section>
  );
};

export default DecksPage;
