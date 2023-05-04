"use client";

import "client-only";
import { Deck } from "@/types/types";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Button from "@/components/ui/Button";

interface ReviewButtonProps {
  deck: Deck;
}

const ReviewButton: FC<ReviewButtonProps> = ({ deck }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/deck/${deck.id}/review`);
      }}
    >
      Review
    </Button>
  );
};

export default ReviewButton;
