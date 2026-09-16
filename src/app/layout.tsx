import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { BASE_PATH, CAN_LINE, SITE_NAME, SITE_URL, TAGLINE, asset } from "@/lib/site";
import { OG_IMAGE, OG_IMAGE_URL } from "@/lib/seo";
import { Providers } from "@/components/Providers";
import { InterestProvider } from "@/components/InterestModal";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BuyBar } from "@/components/BuyBar";
import { JsonLd } from "@/components/JsonLd";
import { Splash } from "@/components/Splash";
import { MaintenanceBanner } from "@/components/MaintenanceBanner";
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
  description: `${TAGLINE} Nicotine-free, sugar-free caffeine pouches with L-theanine and light electrolytes. ${CAN_LINE}. Five flavours. From £12.99 a can. UK.`,
  applicationName: SITE_NAME,
  keywords: [
    "FluxHit",
    "FLUXHIT",
    "caffeine pouch",
    "electrolyte pouch",
    "nicotine-free pouches",
    "oral pouches",
    "caffeine pouches",
    "electrolyte pouches",
    "snus alternative",
    "Blue Razz",
    "Frost Mint",
    "L-theanine pouch",
    "caffeine electrolyte pouch UK",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: `${TAGLINE} ${CAN_LINE}. No nicotine. No sugar.`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: `${TAGLINE} ${CAN_LINE}. No nicotine. No sugar.`,
    images: [OG_IMAGE_URL],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "rEylspFVWx6Bm1dmixQ5pW9s65bFkcrJu0V8mAyxD5M",
  },
  icons: {
    icon: [{ url: asset("/favicon.svg"), type: "image/svg+xml" }, { url: asset("/icon.png") }],
    apple: asset("/icon.png"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`${outfit.variable} ${ibm.variable} h-full antialiased`}>
      <body className="crystal-cursor min-h-full bg-bg text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=location.pathname.replace(/\\/$/,"")||"/";var home=${JSON.stringify((BASE_PATH || "").replace(/\/$/, "") || "/")};var isHome=p===home||p==="/";var bot=/googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|crawler|spider|bot/i.test(navigator.userAgent||"");if(bot||sessionStorage.getItem("hh-splash-seen")||!isHome)document.documentElement.classList.add("hh-splash-skip");else document.documentElement.classList.add("hh-splash")}catch(e){}`,
          }}
        />
        <JsonLd />
        <Providers>
          <InterestProvider>
            <Splash />
            <MaintenanceBanner />
            <Nav />
            {children}
            <Footer />
            <BuyBar />
          </InterestProvider>
        </Providers>
      </body>
    </html>
  );
}
