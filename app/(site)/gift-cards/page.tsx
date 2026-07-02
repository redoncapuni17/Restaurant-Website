import GiftCardsView from "@/components/gift-cards/GiftCardsView";
import { GIFT_CARD_CONTENT, GIFT_CARD_IMAGES } from "@/lib/giftCards";

export default function GiftCardsPage() {
  return <GiftCardsView content={GIFT_CARD_CONTENT} images={GIFT_CARD_IMAGES} />;
}
