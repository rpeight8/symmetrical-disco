"use client";

import "client-only";
import { FC, useRef, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import AddDeckCollapsible from "@/components/AddDeckCollapsible";

interface DecksToolbarProps {}

const DecksToolbar: FC<DecksToolbarProps> = ({}) => {
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

export default DecksToolbar;
