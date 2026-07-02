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
  ALCOHOLIC_COFFEE_ITEMS,
  COFFEE_ITEMS,
  DESSERT_ITEMS,
  DESSERT_WINE_ITEMS,
} from "@/lib/dessertMenu";

import { SITE_IMAGES } from "@/lib/siteConfig";

export default function DessertMenuView() {
  return (
    <>
      <PageHero
        eyebrow="Sweet Endings"
        title="Dessert Menu"
        backgroundImage={SITE_IMAGES.dessert}
      />

      <MenuPageShell footer="All prices in GBP (£). Please inform staff of any allergies.">
        <FadeIn>
          <MenuSectionHeader
            eyebrow="Homemade"
            title="Desserts"
          />
          <MenuCard>
            <p className="font-sans text-pupa-brown/60 text-sm mb-5 sm:mb-6">
              All desserts are homemade.
            </p>
            {DESSERT_ITEMS.map((item) => (
              <MenuItemRow
                key={item.name}
                name={item.name}
                price={item.price}
                description={item.description}
              />
            ))}
          </MenuCard>
        </FadeIn>

        <FadeIn delay={0.05}>
          <MenuSectionHeader eyebrow="To Finish" title="Coffee & More" />
          <MenuCard>
            <MenuSubsection title="Coffee & Tea">
              {COFFEE_ITEMS.map((item) => (
                <MenuItemRow
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </MenuSubsection>

            <MenuSubsection title="Alcoholic Coffees" showDivider>
              {ALCOHOLIC_COFFEE_ITEMS.map((item) => (
                <MenuItemRow
                  key={item.name}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </MenuSubsection>

            <MenuSubsection title="Dessert Wines" priceNote="50ml / Bottle" showDivider>
              {DESSERT_WINE_ITEMS.map((item) => (
                <MenuItemRow
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  priceBottle={item.priceBottle}
                  description={item.description}
                  showBottleColumns
                />
              ))}
            </MenuSubsection>
          </MenuCard>
        </FadeIn>
      </MenuPageShell>
    </>
  );
}
