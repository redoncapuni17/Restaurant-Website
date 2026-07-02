import DrinkMenuView from "@/components/drink-menu/DrinkMenuView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drink Menu | PUPA Restaurant & Bar",
  description: "Cocktails, spirits, beers and soft drinks at PUPA Restaurant & Bar, Manchester.",
};

export default function DrinkMenuPage() {
  return <DrinkMenuView />;
}
