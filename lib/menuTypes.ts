/** Shared menu dish/drink shape used across lunch, main, dessert, drinks. */
export type DietaryTag = "V" | "VG" | "GF";

export interface MenuItem {
  name: string;
  price: string;
  /** Second price column (e.g. bottle / large). */
  priceSecondary?: string;
  description?: string;
  dietary?: DietaryTag[];
  favorite?: boolean;
  note?: string;
}
