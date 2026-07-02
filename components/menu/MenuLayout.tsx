"use client";

import type { ReactNode } from "react";
import FadeIn from "@/components/motion/FadeIn";

function formatPrice(price: string): string {
  if (price.includes("/")) {
    return price
      .split("/")
      .map((part) => `£${part.trim()}`)
      .join(" / ");
  }
  return `£${price}`;
}

export function MenuSectionHeader({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      {eyebrow && (
        <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-2 sm:mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl text-pupa-brown font-medium">{title}</h2>
      <div className="w-12 h-px bg-pupa-gold mt-3 sm:mt-4" />
    </div>
  );
}

export function MenuCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white border border-pupa-warm rounded-sm p-5 sm:p-6 md:p-8 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function MenuItemRow({
  name,
  price,
  priceBottle,
  description,
  showBottleColumns,
  dietary,
  favorite,
  note,
}: {
  name: string;
  price?: string;
  priceBottle?: string;
  description?: string;
  showBottleColumns?: boolean;
  dietary?: ("V" | "VG" | "GF")[];
  favorite?: boolean;
  note?: string;
}) {
  return (
    <div className="py-3 sm:py-3.5 border-b border-pupa-warm/60 last:border-0 group">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="font-serif text-pupa-brown text-base sm:text-lg leading-snug group-hover:text-pupa-accent transition-colors">
              {name}
            </p>
            {dietary?.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-wider uppercase px-1.5 py-0.5 border border-pupa-warm text-pupa-brown/55 rounded-sm"
              >
                {tag}
              </span>
            ))}
            {favorite && (
              <span className="font-serif italic text-pupa-gold text-xs sm:text-sm">
                Pupa&apos;s Favourite
              </span>
            )}
          </div>
        </div>
        {showBottleColumns ? (
          <div className="flex gap-4 sm:gap-6 shrink-0 font-sans text-sm sm:text-base text-pupa-gold font-medium tabular-nums">
            <span className="w-10 text-right">{price ? `£${price}` : "—"}</span>
            <span className="w-12 text-right">{priceBottle ? `£${priceBottle}` : "—"}</span>
          </div>
        ) : (
          <p className="font-sans text-sm sm:text-base text-pupa-gold font-medium shrink-0 tabular-nums">
            {formatPrice(price ?? "")}
          </p>
        )}
      </div>
      {note && (
        <p className="mt-1 font-sans text-xs text-pupa-gold/90 italic">{note}</p>
      )}
      {description && (
        <p className="mt-1.5 font-sans text-pupa-brown/55 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export function MenuSectionIntro({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-pupa-brown/60 text-sm leading-relaxed mb-5 sm:mb-6">
      {children}
    </p>
  );
}

export function MenuNote({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-xs text-pupa-gold uppercase tracking-wider mb-4 leading-relaxed">
      {children}
    </p>
  );
}

export function MenuPageShell({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: string;
}) {
  return (
    <section className="relative py-14 sm:py-20 bg-pupa-beige overflow-hidden">
      <div className="absolute -top-32 right-0 w-[28rem] h-[28rem] glow-gold blur-3xl opacity-[0.08] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 space-y-6 sm:space-y-8">
        {children}
        {footer && (
          <FadeIn className="text-center pt-2">
            <p className="font-sans text-pupa-brown/40 text-xs sm:text-sm">{footer}</p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

export function WineColumnHeaders({
  col1 = "175ml",
  col2 = "250ml",
  col3 = "Bottle",
  showCol2 = true,
}: {
  col1?: string;
  col2?: string;
  col3?: string;
  showCol2?: boolean;
}) {
  return (
    <div className="hidden sm:flex gap-5 shrink-0 font-sans text-[0.65rem] uppercase tracking-widest text-pupa-brown/45 mb-3 pb-2 border-b border-pupa-warm/40">
      <p className="flex-1" />
      <span className="w-14 text-right">{col1}</span>
      {showCol2 && <span className="w-14 text-right">{col2}</span>}
      <span className="w-14 text-right">{col3}</span>
    </div>
  );
}

export function WineItemRow({
  name,
  ml175,
  ml250,
  bottle,
  small,
  smallLabel = "175ml",
}: {
  name: string;
  ml175?: string;
  ml250?: string;
  bottle?: string;
  small?: string;
  smallLabel?: string;
}) {
  const format = (value?: string) => (value ? `£${value}` : "—");

  return (
    <div className="py-3 sm:py-3.5 border-b border-pupa-warm/60 last:border-0 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <p className="font-serif text-pupa-brown text-base sm:text-lg leading-snug group-hover:text-pupa-accent transition-colors sm:min-w-0 sm:flex-1">
          {name}
        </p>
        <div className="flex gap-3 sm:gap-5 shrink-0 font-sans text-xs sm:text-sm text-pupa-gold font-medium tabular-nums">
          {small !== undefined || ml175 !== undefined || ml250 !== undefined ? (
            <>
              {(small !== undefined || ml175 !== undefined) && (
                <span className="w-14 text-right">
                  <span className="sm:hidden text-pupa-brown/40 font-normal mr-1">{smallLabel}</span>
                  {format(small ?? ml175)}
                </span>
              )}
              {ml250 !== undefined && (
                <span className="w-14 text-right">
                  <span className="sm:hidden text-pupa-brown/40 font-normal mr-1">250ml</span>
                  {format(ml250)}
                </span>
              )}
              <span className="w-14 text-right">
                <span className="sm:hidden text-pupa-brown/40 font-normal mr-1">Bottle</span>
                {format(bottle)}
              </span>
            </>
          ) : (
            <span className="text-right">
              <span className="sm:hidden text-pupa-brown/40 font-normal mr-1">Bottle</span>
              {format(bottle)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function MenuSubsection({
  title,
  note,
  priceNote,
  children,
  showDivider = false,
}: {
  title: string;
  note?: string;
  priceNote?: string;
  children: ReactNode;
  showDivider?: boolean;
}) {
  return (
    <div className={showDivider ? "pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-pupa-warm" : ""}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-serif text-xl sm:text-2xl text-pupa-brown">{title}</h3>
        {priceNote && (
          <span className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-widest text-pupa-brown/45 shrink-0 pt-1">
            {priceNote}
          </span>
        )}
      </div>
      {note && (
        <p className="font-sans text-xs text-pupa-gold uppercase tracking-wider mb-4 -mt-2">
          {note}
        </p>
      )}
      {children}
    </div>
  );
}
