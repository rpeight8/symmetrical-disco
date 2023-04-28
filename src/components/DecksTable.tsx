import { Decks } from "@/types/types";
import { FC, HTMLAttributes } from "react";
import Span from "@/components/ui/Span";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface DecksTableProps extends HTMLAttributes<HTMLTableElement> {
  decks: Decks;
  tbodyClassName?: string;
}

const DecksTable: FC<DecksTableProps> = ({
  decks,
  className,
  tbodyClassName,
  ...props
}) => {
  return (
    <div className={twMerge("overflow-x-hidden overflow-y-auto", className)}>
      <table className="table-fixed flex flex-col">
        <caption className="sr-only">Decks</caption>
        <thead>
          <tr>
            <th className="sr-only">Deck Name</th>
          </tr>
        </thead>
        <tbody className={twMerge("flex flex-col gap-y-3", tbodyClassName)}>
          {decks.map((deck) => {
            return (
              <Link
                key={deck.id}
                href={`/deck/${deck.id}`}
                className="flex-1 "
                passHref
                legacyBehavior
              >
                <tr className="p-3 cursor-pointer bg-secondary-500 rounded-md overflow-x-auto">
                  <td className="">
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
