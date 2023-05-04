import { headers } from "next/headers";
import { getCardsForReview } from "@/lib/fetch-data";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

/* @ts-expect-error Async Server Component */
const page: FC<pageProps> = async ({ params }) => {
  const cards = await getCardsForReview({
    data: {
      deckId: params.id,
    },
    headers: { cookie: headers().get("cookie") ?? "" },
  });
  const card = cards[0];
  console.log(card);

  return <div>page</div>;
};

export default page;
