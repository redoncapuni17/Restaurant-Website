"use client";

import { useState } from "react";
import FadeIn from "@/components/motion/FadeIn";
import PageHero from "@/components/motion/PageHero";
import {
  WINE_CATEGORIES,
  WINE_MENU_FOOTER,
  type SparklingWineItem,
  type StandardWineItem,
  type WineCategory,
} from "@/lib/wineMenu";
import { SITE_IMAGES } from "@/lib/siteConfig";

const PILL_LABELS: Record<string, string> = {
  red: "Red",
  white: "White",
  rose: "Rosé",
  sparkling: "Sparkling",
};

const CARD_TITLES: Record<string, string> = {
  red: "Red",
  white: "White",
  rose: "Rosé",
  sparkling: "Sparkling",
};

function formatPrice(value?: string) {
  return value ? `£${value}` : "—";
}

function VineDecoration({ side }: { side: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 520"
      className={`pointer-events-none absolute top-24 hidden lg:block h-[70%] w-28 text-[#8B5A3C]/[0.14] ${
        side === "left" ? "left-2 xl:left-6" : "right-2 xl:right-6 scale-x-[-1]"
      }`}
      fill="none"
    >
      <path
        d="M58 20c-4 48-22 72-22 120s18 78 18 128-20 80-18 140 22 90 22 90"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <ellipse cx="42" cy="90" rx="14" ry="9" stroke="currentColor" strokeWidth="1.2" transform="rotate(-28 42 90)" />
      <ellipse cx="78" cy="130" rx="15" ry="9" stroke="currentColor" strokeWidth="1.2" transform="rotate(32 78 130)" />
      <ellipse cx="40" cy="200" rx="16" ry="10" stroke="currentColor" strokeWidth="1.2" transform="rotate(-20 40 200)" />
      <ellipse cx="76" cy="250" rx="14" ry="9" stroke="currentColor" strokeWidth="1.2" transform="rotate(24 76 250)" />
      <ellipse cx="44" cy="320" rx="15" ry="9" stroke="currentColor" strokeWidth="1.2" transform="rotate(-30 44 320)" />
      <ellipse cx="74" cy="380" rx="16" ry="10" stroke="currentColor" strokeWidth="1.2" transform="rotate(18 74 380)" />
      <circle cx="52" cy="160" r="4.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="64" cy="168" r="4" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="56" cy="176" r="3.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="58" cy="290" r="4.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="68" cy="298" r="4" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="50" cy="300" r="3.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="60" cy="430" r="4.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="70" cy="438" r="4" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="54" cy="442" r="3.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function StandardRows({ items }: { items: StandardWineItem[] }) {
  return (
    <ul>
      {items.map((wine) => (
        <li
          key={wine.name}
          className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3.5 border-b border-pupa-brown/10 last:border-0"
        >
          <p className="font-serif text-pupa-brown text-xl sm:text-2xl leading-snug min-w-0">
            {wine.name}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0 font-sans text-base sm:text-lg tabular-nums text-pupa-brown/80">
            <span className="w-12 sm:w-16 text-right">{formatPrice(wine.ml175)}</span>
            <span className="w-12 sm:w-16 text-right">{formatPrice(wine.ml250)}</span>
            <span className="w-12 sm:w-16 text-right font-medium text-pupa-brown">
              {formatPrice(wine.bottle)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SparklingRows({ items }: { items: SparklingWineItem[] }) {
  return (
    <ul>
      {items.map((wine) => (
        <li
          key={wine.name}
          className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3.5 border-b border-pupa-brown/10 last:border-0"
        >
          <p className="font-serif text-pupa-brown text-xl sm:text-2xl leading-snug min-w-0">
            {wine.name}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 font-sans text-base sm:text-lg tabular-nums text-pupa-brown/80">
            <span className="w-14 sm:w-16 text-right">{formatPrice(wine.small)}</span>
            <span className="w-14 sm:w-16 text-right font-medium text-pupa-brown">
              {formatPrice(wine.bottle)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function WineCard({ category, index }: { category: WineCategory; index: number }) {
  const isSparkling = category.type === "sparkling";
  const title = CARD_TITLES[category.id] ?? category.title;

  return (
    <FadeIn delay={index * 0.08} className="h-full">
      <article
        id={`wine-${category.id}`}
        className="h-full scroll-mt-28 bg-[#FBF4EA] border border-pupa-brown/10 rounded-xl shadow-[0_8px_28px_rgba(61,42,31,0.06)] p-5 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#6B2E2E] font-medium tracking-wide">
              {title}
            </h2>
            <div className="mt-2.5 h-px w-12 bg-[#6B2E2E]/70" />
          </div>
          <div
            className={`hidden sm:grid gap-2 sm:gap-3 font-sans text-xs uppercase tracking-[0.16em] text-pupa-warm/80 pt-2 ${
              isSparkling ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {(isSparkling ? ["175ml", "Bottle"] : ["175ml", "250ml", "Bottle"]).map(
              (label) => (
                <span key={label} className="w-12 sm:w-16 text-right">
                  {label}
                </span>
              )
            )}
          </div>
        </div>

        {isSparkling ? (
          <SparklingRows items={category.items as SparklingWineItem[]} />
        ) : (
          <StandardRows items={category.items as StandardWineItem[]} />
        )}
      </article>
    </FadeIn>
  );
}

export default function WineMenuView() {
  const [active, setActive] = useState(WINE_CATEGORIES[0].id);

  return (
    <>
      <PageHero
        eyebrow="Curated Selection"
        title="Wine List"
        subtitle="Mediterranean wines by the glass or bottle."
        backgroundImage={SITE_IMAGES.wine}
      />

      <section className="relative bg-[#F3E0C8] overflow-hidden">
        <VineDecoration side="left" />
        <VineDecoration side="right" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
          <FadeIn>
            <nav
              aria-label="Wine categories"
              className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-14"
            >
              {WINE_CATEGORIES.map((category) => {
                const isActive = active === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActive(category.id)}
                    className={`inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-sans text-sm tracking-[0.22em] uppercase transition-colors duration-300 ${
                      isActive
                        ? "bg-[#6B2E2E] text-pupa-cream shadow-sm"
                        : "bg-[#FBF4EA] text-pupa-brown border border-pupa-brown/15 hover:border-[#6B2E2E]/40"
                    }`}
                  >
                    {PILL_LABELS[category.id] ?? category.title}
                  </button>
                );
              })}
            </nav>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {WINE_CATEGORIES.map((category, i) => (
              <WineCard key={category.id} category={category} index={i} />
            ))}
          </div>

          <FadeIn delay={0.2} className="text-center pt-12 sm:pt-14">
            <p className="font-sans text-pupa-warm text-sm tracking-wide">
              {WINE_MENU_FOOTER}
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
