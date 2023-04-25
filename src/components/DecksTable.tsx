import { Decks } from "@/lib/schemas";
import { FC, HTMLAttributes } from "react";
import Span from "@/components/ui/Span";
import Link from "next/link";

interface DecksTableProps extends HTMLAttributes<HTMLTableElement> {
  decks: Decks;
}

const DecksTable: FC<DecksTableProps> = ({ decks, className, ...props }) => {
  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <table className="table-fixed flex flex-col">
        <caption className="sr-only">Decks</caption>
        <thead>
          <tr>
            <th>Deck Name</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-y-3">
          {decks.map((deck) => {
            return (
              <Link
                key={deck.id}
                href={`/decks/${deck.id}`}
                className="flex-1 "
                passHref
                legacyBehavior
              >
                <tr className="p-3 cursor-pointer bg-secondary-500 rounded-md">
                  <td className="overflow-hidden ">
                    <Span size="large">{deck.name}</Span>
                  </td>
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DecksTable;
