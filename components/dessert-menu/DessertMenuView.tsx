import PageHero from "@/components/motion/PageHero";
import {
  MenuCatalogShell,
  type CatalogCard,
} from "@/components/menu/MenuCatalog";
import {
  ALCOHOLIC_COFFEE_ITEMS,
  COFFEE_ITEMS,
  DESSERT_ITEMS,
  DESSERT_WINE_ITEMS,
} from "@/lib/dessertMenu";
import { SITE_IMAGES } from "@/lib/siteConfig";

const DESSERT_CARDS: CatalogCard[] = [
  {
    id: "desserts",
    pillLabel: "Desserts",
    title: "Desserts",
    intro: "All desserts are homemade.",
    items: DESSERT_ITEMS,
  },
  {
    id: "coffee",
    pillLabel: "Coffee",
    title: "Coffee & Tea",
    items: COFFEE_ITEMS,
  },
  {
    id: "alcoholic-coffee",
    pillLabel: "Spirited",
    title: "Alcoholic Coffees",
    items: ALCOHOLIC_COFFEE_ITEMS,
  },
  {
    id: "dessert-wines",
    pillLabel: "Wines",
    title: "Dessert Wines",
    dualPriceHeaders: ["50ml", "Bottle"],
    items: DESSERT_WINE_ITEMS.map((item) => ({
      name: item.name,
      price: item.price || undefined,
      priceSecondary: item.priceSecondary,
      description: item.description,
    })),
  },
];

export default function DessertMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Sweet Endings"
        title="Dessert Menu"
        backgroundImage={SITE_IMAGES.dessert}
      />

      <MenuCatalogShell
        cards={DESSERT_CARDS}
        footer="All prices in GBP (£). Please inform staff of any allergies."
        navLabel="Dessert categories"
      />
    </>
  );
}
