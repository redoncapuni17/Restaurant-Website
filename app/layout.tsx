import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Cormorant_Garamond } from "next/font/google";
import TableGoTracking from "@/components/TableGoTracking";
import { TABLEGO_IFRAME_RESIZER_URL } from "@/lib/booking-widget";
import "./globals.css";

const GTM_ID = "GTM-TMMS3NDD";

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
        <link rel="dns-prefetch" href="https://tablego.uk" />
        <link rel="preconnect" href="https://tablego.uk" crossOrigin="" />
        <link rel="preload" href={TABLEGO_IFRAME_RESIZER_URL} as="script" />
      </head>
      <body>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TableGoTracking />
        {children}
      </body>
    </html>
  );
}
