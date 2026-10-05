import PageHero from "@/components/motion/PageHero";
import {
  MenuCatalogShell,
  type CatalogCard,
} from "@/components/menu/MenuCatalog";
import {
  BEER_BOTTLES_SECTION,
  COCKTAIL_SECTIONS,
  DRAUGHT_BEER_SECTION,
  SOFT_DRINKS_SECTION,
  SPIRITS_SECTIONS,
} from "@/lib/drinkMenu";
import { SITE_IMAGES } from "@/lib/siteConfig";

const PILL_LABELS: Record<string, string> = {
  signature: "Signature",
  classic: "Classic",
  "soft-drinks": "Soft Drinks",
  "beer-bottles": "Beer",
  "draught-beer": "Draught",
  whiskey: "Whiskey",
  cognac: "Cognac",
  vodka: "Vodka",
  gin: "Gin",
  rum: "Rum",
  liqueurs: "Liqueurs",
};

const CARD_TITLES: Record<string, string> = {
  signature: "Signature",
  classic: "Classic",
  "soft-drinks": "Soft Drinks",
  "beer-bottles": "Beer Bottles",
  "draught-beer": "Draught Beer",
  whiskey: "Whiskey",
  cognac: "Cognac",
  vodka: "Vodka",
  gin: "Gin",
  rum: "Rum",
  liqueurs: "Liqueurs",
};

const DRINK_CARDS: CatalogCard[] = [
  ...COCKTAIL_SECTIONS.map((section) => ({
    id: section.id,
    pillLabel: PILL_LABELS[section.id] ?? section.title,
    title: CARD_TITLES[section.id] ?? section.title,
    items: section.items,
  })),
  {
    id: SOFT_DRINKS_SECTION.id,
    pillLabel: PILL_LABELS[SOFT_DRINKS_SECTION.id],
    title: CARD_TITLES[SOFT_DRINKS_SECTION.id],
    items: SOFT_DRINKS_SECTION.items,
  },
  {
    id: BEER_BOTTLES_SECTION.id,
    pillLabel: PILL_LABELS[BEER_BOTTLES_SECTION.id],
    title: CARD_TITLES[BEER_BOTTLES_SECTION.id],
    note: BEER_BOTTLES_SECTION.note,
    items: BEER_BOTTLES_SECTION.items,
  },
  {
    id: DRAUGHT_BEER_SECTION.id,
    pillLabel: PILL_LABELS[DRAUGHT_BEER_SECTION.id],
    title: CARD_TITLES[DRAUGHT_BEER_SECTION.id],
    priceHeader: DRAUGHT_BEER_SECTION.priceNote,
    items: DRAUGHT_BEER_SECTION.items,
  },
  ...SPIRITS_SECTIONS.map((section) => ({
    id: section.id,
    pillLabel: PILL_LABELS[section.id] ?? section.title,
    title: CARD_TITLES[section.id] ?? section.title,
    priceHeader: section.priceNote,
    items: section.items,
  })),
];

export default function DrinkMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Cocktails & Spirits"
        title="Drink Menu"
        backgroundImage={SITE_IMAGES.drink}
      />

      <MenuCatalogShell
        cards={DRINK_CARDS}
        footer="All prices in GBP (£). Please drink responsibly."
        navLabel="Drink categories"
      />
    </>
  );
}
