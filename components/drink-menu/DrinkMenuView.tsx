"use client";

import FadeIn from "@/components/motion/FadeIn";
import PageHero from "@/components/motion/PageHero";
import {
  MenuCard,
  MenuItemRow,
  MenuPageShell,
  MenuSectionHeader,
  MenuSubsection,
} from "@/components/menu/MenuLayout";
import {
  BEER_BOTTLES_SECTION,
  COCKTAIL_SECTIONS,
  DRAUGHT_BEER_SECTION,
  SOFT_DRINKS_SECTION,
  SPIRITS_SECTIONS,
} from "@/lib/drinkMenu";

import { SITE_IMAGES } from "@/lib/siteConfig";

export default function DrinkMenuView() {
  const spiritsLeft = SPIRITS_SECTIONS.slice(0, 2);
  const spiritsRight = SPIRITS_SECTIONS.slice(2);

  return (
    <>
      <PageHero
        eyebrow="Cocktails & Spirits"
        title="Drink Menu"
        backgroundImage={SITE_IMAGES.drink}
      />

      <MenuPageShell footer="All prices in GBP (£). Please drink responsibly.">
        <FadeIn>
          <MenuSectionHeader eyebrow="Bar" title="Cocktails" />
          <MenuCard>
            {COCKTAIL_SECTIONS.map((section, i) => (
              <MenuSubsection
                key={section.id}
                title={section.title}
                showDivider={i > 0}
              >
                {section.items.map((item) => (
                  <MenuItemRow
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                  />
                ))}
              </MenuSubsection>
            ))}
          </MenuCard>
        </FadeIn>

        <FadeIn delay={0.05}>
          <MenuSectionHeader eyebrow="Refreshments" title="Soft Drinks & Beer" />
          <MenuCard>
            <MenuSubsection title={SOFT_DRINKS_SECTION.title}>
              {SOFT_DRINKS_SECTION.items.map((item) => (
                <MenuItemRow
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </MenuSubsection>
            <MenuSubsection
              title={BEER_BOTTLES_SECTION.title}
              note={BEER_BOTTLES_SECTION.note}
              showDivider
            >
              {BEER_BOTTLES_SECTION.items.map((item) => (
                <MenuItemRow
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </MenuSubsection>
            <MenuSubsection
              title={DRAUGHT_BEER_SECTION.title}
              priceNote={DRAUGHT_BEER_SECTION.priceNote}
              showDivider
            >
              {DRAUGHT_BEER_SECTION.items.map((item) => (
                <MenuItemRow
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </MenuSubsection>
          </MenuCard>
        </FadeIn>

        <FadeIn delay={0.1}>
          <MenuSectionHeader eyebrow="Spirits" title="Spirits & Liqueurs" />
          <MenuCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-6 sm:space-y-8">
                {spiritsLeft.map((section, i) => (
                  <MenuSubsection
                    key={section.id}
                    title={section.title}
                    priceNote={section.priceNote}
                    showDivider={i > 0}
                  >
                    {section.items.map((item) => (
                      <MenuItemRow
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                      />
                    ))}
                  </MenuSubsection>
                ))}
              </div>
              <div className="space-y-6 sm:space-y-8">
                {spiritsRight.map((section, i) => (
                  <MenuSubsection
                    key={section.id}
                    title={section.title}
                    priceNote={section.priceNote}
                    showDivider={i > 0}
                  >
                    {section.items.map((item) => (
                      <MenuItemRow
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                      />
                    ))}
                  </MenuSubsection>
                ))}
              </div>
            </div>
          </MenuCard>
        </FadeIn>
      </MenuPageShell>
    </>
  );
}
