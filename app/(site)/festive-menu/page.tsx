import FestiveMenuView from "@/components/festive-menu/FestiveMenuView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Festive Menu | PUPA Restaurant & Bar",
  description:
    "Pupa's sharing festive menu — starter selection, main platters, sides and dessert boards. Minimum 10 guests.",
};

export default function FestiveMenuPage() {
  return <FestiveMenuView />;
}
