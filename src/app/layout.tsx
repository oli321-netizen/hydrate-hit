import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { CAN_LINE, SITE_NAME, SITE_URL, TAGLINE, asset } from "@/lib/site";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BuyBar } from "@/components/BuyBar";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const ibm = IBM_Plex_Mono({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: `${TAGLINE} ${CAN_LINE}. Five flavours. From £12.99 a can. UK.`,
  applicationName: SITE_NAME,
  keywords: [
    "Hydrate Hit",
    "caffeine pouch",
    "electrolyte pouch",
    "Blue Razz",
    "Frost Mint",
    "caffeine electrolyte pouch UK",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: CAN_LINE,
    images: [{ url: asset("/og.jpg"), width: 1200, height: 630, alt: "Hydrate Hit 5-pack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: CAN_LINE,
    images: [asset("/og.jpg")],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: asset("/favicon.svg"), type: "image/svg+xml" }, { url: asset("/icon.png") }],
    apple: asset("/icon.png"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${outfit.variable} ${ibm.variable} h-full antialiased`}>
      <body className="crystal-cursor min-h-full bg-bg text-ink">
        <JsonLd />
        <Providers>
          <Nav />
          {children}
          <Footer />
          <BuyBar />
        </Providers>
      </body>
    </html>
  );
}
