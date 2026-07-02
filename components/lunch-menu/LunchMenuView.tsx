"use client";

import FadeIn from "@/components/motion/FadeIn";
import PageHero from "@/components/motion/PageHero";
import {
  MenuCard,
  MenuItemRow,
  MenuNote,
  MenuPageShell,
  MenuSectionHeader,
} from "@/components/menu/MenuLayout";
import {
  BIG_PLATES_SECTION,
  LUNCH_ADDONS,
  LUNCH_MENU_FOOTER,
  SMALL_PLATES_SECTION,
} from "@/lib/lunchMenu";

import { SITE_IMAGES } from "@/lib/siteConfig";

function LunchSectionCard({ section }: { section: typeof SMALL_PLATES_SECTION }) {
  return (
    <MenuCard className="h-full">
      <h3 className="font-serif text-xl sm:text-2xl text-pupa-brown mb-1">{section.title}</h3>
      {section.note && <MenuNote>{section.note}</MenuNote>}
      <div className={section.note ? "" : "mt-4"}>
        {section.items.map((item) => (
          <MenuItemRow
            key={item.name}
            name={item.name}
            price={item.price}
            description={item.description}
            dietary={item.dietary}
          />
        ))}
      </div>
    </MenuCard>
  );
}

export default function LunchMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Midday Mediterranean"
        title="Lunch Menu"
        subtitle="Available from 12:00 – 16:00"
        backgroundImage={SITE_IMAGES.lunch}
      />

      <MenuPageShell footer={LUNCH_MENU_FOOTER}>
        <FadeIn>
          <MenuSectionHeader eyebrow="Lunch" title="Small Plates & Big Plates" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <LunchSectionCard section={SMALL_PLATES_SECTION} />
            <LunchSectionCard section={BIG_PLATES_SECTION} />
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <MenuSectionHeader eyebrow="Extras" title="Add" />
          <MenuCard>
            {LUNCH_ADDONS.map((item) => (
              <MenuItemRow
                key={item.name}
                name={item.name}
                price={item.price}
                dietary={item.dietary}
              />
            ))}
          </MenuCard>
        </FadeIn>
      </MenuPageShell>
    </>
  );
}
