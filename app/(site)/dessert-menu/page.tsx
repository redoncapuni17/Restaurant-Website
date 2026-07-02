import DessertMenuView from "@/components/dessert-menu/DessertMenuView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dessert Menu | PUPA Restaurant & Bar",
  description: "Homemade desserts, coffee and dessert wines at PUPA Restaurant & Bar, Manchester.",
};

export default function DessertMenuPage() {
  return <DessertMenuView />;
}
