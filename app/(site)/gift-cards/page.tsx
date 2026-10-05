import GiftCardsView from "@/components/gift-cards/GiftCardsView";
import { GIFT_CARD_CONTENT, GIFT_CARD_IMAGES } from "@/lib/giftCards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Cards | PUPA Restaurant & Bar",
  description:
    "Give the gift of Mediterranean charcoal dining — PUPA Restaurant & Bar gift cards available in store and by phone.",
};

export default function GiftCardsPage() {
  return <GiftCardsView content={GIFT_CARD_CONTENT} images={GIFT_CARD_IMAGES} />;
}
