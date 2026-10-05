import PageHero from "@/components/motion/PageHero";
import {
  MenuCatalogShell,
  type CatalogCard,
} from "@/components/menu/MenuCatalog";
import { MAIN_MENU_FOOTER, MAIN_MENU_SECTIONS } from "@/lib/mainMenu";
import { SITE_IMAGES } from "@/lib/siteConfig";

const PILL_LABELS: Record<string, string> = {
  starters: "Starters",
  grill: "Grill",
  steaks: "Steaks",
  burgers: "Burgers",
  sharing: "Sharing",
  sides: "Sides",
  sauces: "Sauces",
};

const CARD_TITLES: Record<string, string> = {
  starters: "Starters",
  grill: "Grill",
  steaks: "Steaks",
  burgers: "Burgers",
  sharing: "Sharing",
  sides: "Sides",
  sauces: "Sauces",
};

const MAIN_CARDS: CatalogCard[] = MAIN_MENU_SECTIONS.map((section) => ({
  id: section.id,
  pillLabel: PILL_LABELS[section.id] ?? section.title,
  title: CARD_TITLES[section.id] ?? section.title,
  intro: section.intro,
  note: section.note,
  items: section.items,
}));

export default function MainMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Charcoal Grilled"
        title="Main Menu"
        subtitle="Signature Mediterranean dishes, dry-aged steaks and charcoal-grilled favourites."
        backgroundImage={SITE_IMAGES.mainMenu}
      />

      <MenuCatalogShell
        cards={MAIN_CARDS}
        footer={MAIN_MENU_FOOTER}
        navLabel="Main menu categories"
      />
    </>
  );
}
