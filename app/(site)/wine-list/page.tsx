import WineMenuView from "@/components/wine-menu/WineMenuView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wine List | PUPA Restaurant & Bar",
  description:
    "Red, white, rosé and sparkling wines at PUPA Restaurant & Bar, Manchester.",
};

export default function WineListPage() {
  return <WineMenuView />;
}
