"use client";

import "client-only";
import { FC, useRef, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import { Deck } from "@/types/types";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import AddDeckCollapsible from "@/components/AddDeckCollapsible";

interface DeckToolbarProps {}

const DeckToolbar: FC<DeckToolbarProps> = ({}) => {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [isAddDeckOpen, setAddDeckOpen] = useState<boolean>(false);

  const openAddDeck = (isOpen: boolean) => {
    setAddDeckOpen(!isAddDeckOpen);
  };

  return (
    <div>
      <div className="flex justify-end">
        <AddDeckCollapsible portalRef={portalRef} Portal={Portal.Root} />
      </div>
      <div ref={portalRef}></div>
    </div>
  );
};

export default DeckToolbar;
