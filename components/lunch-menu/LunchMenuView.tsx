import PageHero from "@/components/motion/PageHero";
import {
  MenuCatalogShell,
  type CatalogCard,
} from "@/components/menu/MenuCatalog";
import {
  BIG_PLATES_SECTION,
  LUNCH_ADDONS,
  LUNCH_MENU_FOOTER,
  SMALL_PLATES_SECTION,
} from "@/lib/lunchMenu";
import { SITE_IMAGES } from "@/lib/siteConfig";

const LUNCH_CARDS: CatalogCard[] = [
  {
    id: SMALL_PLATES_SECTION.id,
    pillLabel: "Small Plates",
    title: SMALL_PLATES_SECTION.title,
    note: SMALL_PLATES_SECTION.note,
    items: SMALL_PLATES_SECTION.items,
  },
  {
    id: BIG_PLATES_SECTION.id,
    pillLabel: "Big Plates",
    title: BIG_PLATES_SECTION.title,
    items: BIG_PLATES_SECTION.items,
  },
  {
    id: "add",
    pillLabel: "Add",
    title: "Add",
    items: LUNCH_ADDONS,
  },
];

export default function LunchMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Midday Mediterranean"
        title="Lunch Menu"
        subtitle="Available from 12:00 – 16:00"
        backgroundImage={SITE_IMAGES.lunch}
      />

      <MenuCatalogShell
        cards={LUNCH_CARDS}
        footer={LUNCH_MENU_FOOTER}
        navLabel="Lunch categories"
      />
    </>
  );
}
