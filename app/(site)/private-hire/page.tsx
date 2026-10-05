import PrivateHireView from "@/components/private-hire/PrivateHireView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Hire | PUPA Restaurant & Bar",
  description:
    "Book a private dining experience at PUPA for birthdays, engagements, corporate dinners and celebrations — up to 80 guests in Manchester NQ.",
};

export default function PrivateHirePage() {
  return <PrivateHireView />;
}
