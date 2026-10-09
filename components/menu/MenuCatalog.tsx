"use client";

import { useState, type ReactNode } from "react";
import FadeIn from "@/components/motion/FadeIn";
import type { DietaryTag } from "@/lib/menuTypes";

export type CatalogDietary = DietaryTag;

const DIETARY_LABELS: Record<CatalogDietary, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten free",
};

export interface CatalogItem {
  name: string;
  price?: string;
  priceSecondary?: string;
  description?: string;
  dietary?: CatalogDietary[];
  favorite?: boolean;
  note?: string;
}

export interface CatalogCard {
  id: string;
  pillLabel: string;
  title: string;
  note?: string;
  intro?: string;
  priceHeader?: string;
  dualPriceHeaders?: [string, string];
  items: CatalogItem[];
}

function formatPrice(value?: string) {
  if (!value) return "—";
  if (value.includes("/")) {
    return value
      .split("/")
      .map((part) => `£${part.trim()}`)
      .join(" / ");
  }
  if (value.startsWith("£")) return value;
  return `£${value}`;
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

function CatalogItemRow({
  item,
  dual,
}: {
  item: CatalogItem;
  dual?: boolean;
}) {
  const showPrice = dual || Boolean(item.price);

  return (
    <li className="py-3.5 border-b border-pupa-brown/10 last:border-0">
      <div
        className={
          showPrice ? "grid grid-cols-[minmax(0,1fr)_auto] gap-3" : undefined
        }
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="font-serif text-pupa-brown text-xl sm:text-2xl leading-snug">
              {item.name}
            </p>
            {item.dietary?.map((tag) => (
              <span
                key={tag}
                title={DIETARY_LABELS[tag]}
                aria-label={DIETARY_LABELS[tag]}
                className="font-sans text-xs tracking-wider uppercase px-1.5 py-0.5 border border-pupa-brown/20 text-pupa-warm rounded-sm"
              >
                <span aria-hidden="true">{tag}</span>
              </span>
            ))}
            {item.favorite && (
              <span className="font-serif italic text-[#6B2E2E]/80 text-base">
                Pupa&apos;s Favourite
              </span>
            )}
          </div>
          {item.note && (
            <p className="mt-1 font-sans text-sm text-[#6B2E2E]/75 italic">{item.note}</p>
          )}
          {item.description && (
            <p className="mt-1.5 font-sans text-pupa-warm text-base leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {dual ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 font-sans text-base sm:text-lg tabular-nums text-pupa-brown/80 self-start pt-0.5">
            <span className="w-14 sm:w-16 text-right">{formatPrice(item.price)}</span>
            <span className="w-14 sm:w-16 text-right font-medium text-pupa-brown">
              {formatPrice(item.priceSecondary)}
            </span>
          </div>
        ) : item.price ? (
          <p className="font-sans text-base sm:text-lg tabular-nums font-medium text-pupa-brown shrink-0 self-start pt-0.5">
            {formatPrice(item.price)}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function CatalogCardView({
  card,
  index,
  anchorId,
}: {
  card: CatalogCard;
  index: number;
  anchorId?: string;
}) {
  const dual = Boolean(card.dualPriceHeaders);

  return (
    <FadeIn delay={index * 0.06} className="h-full">
      <article
        id={anchorId}
        className="h-full scroll-mt-[calc(var(--site-header)+1.25rem)] bg-[#FBF4EA] border border-pupa-brown/10 rounded-xl shadow-[0_8px_28px_rgba(61,42,31,0.06)] p-5 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#6B2E2E] font-medium tracking-wide">
              {card.title}
            </h2>
            <div className="mt-2.5 h-px w-12 bg-[#6B2E2E]/70" />
          </div>
          {dual && card.dualPriceHeaders && (
            <div className="hidden sm:grid grid-cols-2 gap-3 sm:gap-4 font-sans text-xs uppercase tracking-[0.16em] text-pupa-warm/80 pt-2">
              {card.dualPriceHeaders.map((label) => (
                <span key={label} className="w-14 sm:w-16 text-right">
                  {label}
                </span>
              ))}
            </div>
          )}
          {!dual && card.priceHeader && (
            <span className="hidden sm:block font-sans text-xs uppercase tracking-[0.16em] text-pupa-warm/80 pt-2">
              {card.priceHeader}
            </span>
          )}
        </div>

        {card.intro && (
          <p className="font-sans text-pupa-warm text-base leading-relaxed mb-4">
            {card.intro}
          </p>
        )}
        {card.note && (
          <p className="font-sans text-sm text-[#6B2E2E]/80 uppercase tracking-wider mb-4">
            {card.note}
          </p>
        )}

        <ul>
          {card.items.map((item) => (
            <CatalogItemRow key={item.name} item={item} dual={dual} />
          ))}
        </ul>
      </article>
    </FadeIn>
  );
}

export function MenuCatalogShell({
  cards,
  footer,
  navLabel = "Menu categories",
  intro,
  scrollToSection = false,
}: {
  cards: CatalogCard[];
  footer?: string;
  navLabel?: string;
  intro?: ReactNode;
  scrollToSection?: boolean;
}) {
  const [active, setActive] = useState(cards[0]?.id ?? "");

  const jumpTo = (id: string) => {
    setActive(id);
    if (!scrollToSection) return;
    document.getElementById(`menu-course-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative bg-[#F3E0C8] overflow-hidden">
      <VineDecoration side="left" />
      <VineDecoration side="right" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
        {intro && (
          <FadeIn className="mb-8 sm:mb-10">{intro}</FadeIn>
        )}

        <FadeIn>
          <nav
            aria-label={navLabel}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-14"
          >
            {cards.map((card) => {
              const isActive = active === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => jumpTo(card.id)}
                  className={`inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-sans text-sm tracking-[0.22em] uppercase transition-colors duration-300 ${
                    isActive
                      ? "bg-[#6B2E2E] text-pupa-cream shadow-sm"
                      : "bg-[#FBF4EA] text-pupa-brown border border-pupa-brown/15 hover:border-[#6B2E2E]/40"
                  }`}
                >
                  {card.pillLabel}
                </button>
              );
            })}
          </nav>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {cards.map((card, i) => (
            <CatalogCardView
              key={card.id}
              card={card}
              index={i}
              anchorId={scrollToSection ? `menu-course-${card.id}` : undefined}
            />
          ))}
        </div>

        {footer && (
          <FadeIn delay={0.2} className="text-center pt-12 sm:pt-14">
            <p className="font-sans text-pupa-warm text-sm tracking-wide">
              {footer}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

export function MenuCatalogPage({
  hero,
  cards,
  footer,
  navLabel,
}: {
  hero: ReactNode;
  cards: CatalogCard[];
  footer?: string;
  navLabel?: string;
}) {
  return (
    <>
      {hero}
      <MenuCatalogShell cards={cards} footer={footer} navLabel={navLabel} />
    </>
  );
}
