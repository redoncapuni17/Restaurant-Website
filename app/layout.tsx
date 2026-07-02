import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// Fontet ngarkohen me next/font: vetë-host + metrika fallback automatike, që
// eliminon "kërcimin"/ndryshimin e tekstit gjatë ngarkimit (pa FOUT).
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://booking.resdiary.com" />
        <link rel="preconnect" href="https://booking.resdiary.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
