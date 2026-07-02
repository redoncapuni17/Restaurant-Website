import LunchMenuView from "@/components/lunch-menu/LunchMenuView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lunch Menu | PUPA Restaurant & Bar",
  description:
    "Small plates and big plates for lunch at PUPA Restaurant & Bar, Manchester. Available 12:00 – 16:00.",
};

export default function LunchMenuPage() {
  return <LunchMenuView />;
}
