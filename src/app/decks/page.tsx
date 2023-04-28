import { headers } from "next/headers";
import { FC, ReactElement } from "react";
import { getDecks } from "@/lib/fetch-data";
import { useRouter } from "next/navigation";
import AddDeckAccordion from "@/components/AddDeckAccordion";
import DecksTable from "@/components/DecksTable";

interface decksPageProps {
  params: {
    id: string;
  };
}

/* @ts-expect-error Async Server Component */
const DecksPage: FC<decksPageProps> = async ({ params }) => {
  const router = useRouter();
  const decks = await getDecks({
    data: {},
    headers: { cookie: headers().get("cookie") ?? "" },
  });

  return (
    <section>
      <AddDeckAccordion />
      <DecksTable decks={decks} className="mt-4" />
    </section>
  );
};

export default DecksPage;
