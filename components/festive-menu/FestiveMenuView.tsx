import PageHero from "@/components/motion/PageHero";
import {
  MenuCatalogShell,
  type CatalogCard,
} from "@/components/menu/MenuCatalog";
import {
  FESTIVE_DESSERTS,
  FESTIVE_MAINS,
  FESTIVE_MENU_FOOTER,
  FESTIVE_SIDES,
  FESTIVE_STARTERS,
} from "@/lib/festiveMenu";
import type { MenuItem } from "@/lib/menuTypes";
import { SITE_IMAGES } from "@/lib/siteConfig";

function toCatalog(items: MenuItem[]): CatalogCard["items"] {
  return items.map(({ price, ...item }) => ({
    ...item,
    price: price || undefined,
  }));
}

function FestiveNotice() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-serif text-xl sm:text-2xl leading-snug text-[#6B2E2E]">
        Your table receives all of the starters, all of the mains and all of
        the desserts.
      </p>
      <p className="mt-2 font-sans text-base sm:text-lg text-pupa-brown">
        This is not a menu to choose from.
      </p>
      <p className="mt-4 font-sans text-sm sm:text-base text-pupa-warm">
        Minimum 10 guests
        <span className="mx-2.5 text-[#6B2E2E]" aria-hidden>
          ·
        </span>
        Vegetarian and vegan options are available on request
      </p>
    </div>
  );
}

const FESTIVE_CARDS: CatalogCard[] = [
  {
    id: "starters",
    pillLabel: "Starters",
    title: "Starter Selection",
    items: toCatalog(FESTIVE_STARTERS),
  },
  {
    id: "mains",
    pillLabel: "Mains",
    title: "Main Platters",
    items: toCatalog(FESTIVE_MAINS),
  },
  {
    id: "sides",
    pillLabel: "Sides",
    title: "Sides",
    intro: "Served with the platters.",
    items: toCatalog(FESTIVE_SIDES),
  },
  {
    id: "desserts",
    pillLabel: "Desserts",
    title: "Dessert Boards",
    items: toCatalog(FESTIVE_DESSERTS),
  },
];

export default function FestiveMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Sharing"
        title="Festive Menu"
        backgroundImage={SITE_IMAGES.mainMenu}
      />

      <MenuCatalogShell
        cards={FESTIVE_CARDS}
        intro={<FestiveNotice />}
        footer={FESTIVE_MENU_FOOTER}
        navLabel="Festive menu categories"
        scrollToSection
      />
    </>
  );
}
