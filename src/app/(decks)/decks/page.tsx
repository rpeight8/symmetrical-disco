import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDecks } from "@/lib/fetch-data";
import { useRouter, useParams } from "next/navigation";
import AddDeckAccordion from "@/components/AddDeckAccordion";
import DecksTable from "@/components/DecksTable";

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
      <AddDeckAccordion />
      <DecksTable
        decks={decks}
        className="mt-4"
        tbodyClassName="bg-primary-500"
      />
    </section>
  );
};

export default DecksPage;
