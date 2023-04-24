import { Decks } from "@/lib/schemas";
import { FC, HTMLAttributes } from "react";
import Span from "@/components/ui/Span";

interface DecksTableProps extends HTMLAttributes<HTMLTableElement> {
  decks: Decks;
}

const DecksTable: FC<DecksTableProps> = ({ decks, className, ...props }) => {
  console.log(decks);
  return (
    <table>
      <caption>Decks</caption>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {decks.map((deck) => {
          return (
            <tr key={deck.id}>
              <td>
                <Span size="large">{deck.name}</Span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DecksTable;
