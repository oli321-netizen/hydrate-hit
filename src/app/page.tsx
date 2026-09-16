import type { Metadata } from "next";
import { CAN_LINE, SITE_NAME, TAGLINE } from "@/lib/site";
import { Why } from "@/components/Why";
import { Stack } from "@/components/Stack";
import { HowToUse } from "@/components/HowToUse";
import { FlavourPreview } from "@/components/FlavourPreview";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { WaitlistBand } from "@/components/WaitlistForm";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} · ${TAGLINE}` },
  description: `${TAGLINE} Nicotine-free caffeine and theanine pouches with light electrolytes. ${CAN_LINE}. Frost Mint, Citrus Ice, Blue Razz. From £12.99. UK.`,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: `${SITE_NAME} · ${TAGLINE}` },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Why />
      <Stack />
      <HowToUse />
      <FlavourPreview />
      <Reviews />
      <FAQ />
      <WaitlistBand />
    </main>
  );
}
