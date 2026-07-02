"use client";

import FadeIn from "@/components/motion/FadeIn";
import PageHero from "@/components/motion/PageHero";
import {
  MenuCard,
  MenuItemRow,
  MenuNote,
  MenuPageShell,
  MenuSectionHeader,
  MenuSectionIntro,
} from "@/components/menu/MenuLayout";
import { MAIN_MENU_FOOTER, MAIN_MENU_SECTIONS } from "@/lib/mainMenu";

import { SITE_IMAGES } from "@/lib/siteConfig";

function MenuSectionBlock({
  section,
  delay = 0,
  twoColumn = false,
}: {
  section: (typeof MAIN_MENU_SECTIONS)[number];
  delay?: number;
  twoColumn?: boolean;
}) {
  return (
    <FadeIn delay={delay}>
      <MenuSectionHeader eyebrow={section.eyebrow} title={section.title} />
      <MenuCard>
        {section.intro && <MenuSectionIntro>{section.intro}</MenuSectionIntro>}
        {section.note && <MenuNote>{section.note}</MenuNote>}
        <div className={twoColumn ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8" : undefined}>
          {section.items.map((item) => (
            <MenuItemRow
              key={item.name}
              name={item.name}
              price={item.price}
              description={item.description}
              dietary={item.dietary}
              favorite={item.favorite}
              note={item.note}
            />
          ))}
        </div>
      </MenuCard>
    </FadeIn>
  );
}

export default function MainMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Charcoal Grilled"
        title="Main Menu"
        subtitle="Signature Mediterranean dishes, dry-aged steaks and charcoal-grilled favourites."
        backgroundImage={SITE_IMAGES.mainMenu}
      />

      <MenuPageShell footer={MAIN_MENU_FOOTER}>
        {MAIN_MENU_SECTIONS.map((section, i) => (
          <MenuSectionBlock
            key={section.id}
            section={section}
            delay={i * 0.04}
            twoColumn={section.id === "sauces"}
          />
        ))}
      </MenuPageShell>
    </>
  );
}
