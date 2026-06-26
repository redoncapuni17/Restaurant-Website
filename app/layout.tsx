import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUPA Restaurant & Bar | Mediterranean Charcoal Grill - Manchester",
  description:
    "Mediterranean Charcoal Grill Restaurant in Manchester. Serving freshly grilled meats marinated in rich flavours. Book a table today!",
  keywords: "pupa restaurant, mediterranean grill, manchester restaurant, charcoal grill, steakhouse manchester",
  openGraph: {
    title: "PUPA Restaurant & Bar",
    description: "Mediterranean Charcoal Grill Restaurant in Manchester",
    url: "https://www.puparestaurant.com",
    siteName: "PUPA Restaurant & Bar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
