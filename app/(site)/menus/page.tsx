import MenusView from "@/components/menus/MenusView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menus | PUPA Restaurant & Bar",
  description:
    "Explore our lunch, main, festive, dessert, drink and wine menus at PUPA Restaurant & Bar in Manchester's Northern Quarter.",
};

export default function MenusPage() {
  return <MenusView />;
}
