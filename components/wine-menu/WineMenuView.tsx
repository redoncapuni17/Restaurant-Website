"use client";

import FadeIn from "@/components/motion/FadeIn";
import PageHero from "@/components/motion/PageHero";
import {
  MenuCard,
  MenuPageShell,
  MenuSectionHeader,
  WineColumnHeaders,
  WineItemRow,
} from "@/components/menu/MenuLayout";
import {
  WINE_CATEGORIES,
  WINE_MENU_FOOTER,
  type SparklingWineItem,
  type StandardWineItem,
  type WineCategory,
} from "@/lib/wineMenu";

import { SITE_IMAGES } from "@/lib/siteConfig";

function StandardWineSection({ category }: { category: WineCategory }) {
  const items = category.items as StandardWineItem[];

  return (
    <MenuCard>
      <WineColumnHeaders />
      {items.map((wine) => (
        <WineItemRow
          key={wine.name}
          name={wine.name}
          ml175={wine.ml175}
          ml250={wine.ml250}
          bottle={wine.bottle}
        />
      ))}
    </MenuCard>
  );
}

function SparklingWineSection({ category }: { category: WineCategory }) {
  const items = category.items as SparklingWineItem[];

  return (
    <MenuCard>
      {items.map((wine) => (
        <WineItemRow
          key={wine.name}
          name={wine.name}
          small={wine.small}
          smallLabel={wine.smallLabel}
          bottle={wine.bottle}
        />
      ))}
    </MenuCard>
  );
}

export default function WineMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Curated Selection"
        title="Wine List"
        subtitle="Mediterranean wines by the glass or bottle."
        backgroundImage={SITE_IMAGES.wine}
      />

      <MenuPageShell footer={WINE_MENU_FOOTER}>
        {WINE_CATEGORIES.map((category, i) => (
          <FadeIn key={category.id} delay={i * 0.05}>
            <MenuSectionHeader eyebrow={category.eyebrow} title={category.title} />
            {category.type === "standard" ? (
              <StandardWineSection category={category} />
            ) : (
              <SparklingWineSection category={category} />
            )}
          </FadeIn>
        ))}
      </MenuPageShell>
    </>
  );
}
