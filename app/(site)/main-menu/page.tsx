import MainMenuView from "@/components/main-menu/MainMenuView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Menu | PUPA Restaurant & Bar",
  description:
    "Starters, grill, dry-aged steaks, burgers, sharing platters and sides at PUPA Restaurant & Bar, Manchester.",
};

export default function MainMenuPage() {
  return <MainMenuView />;
}
