import { Why } from "@/components/Why";
import { Stack } from "@/components/Stack";
import { HowToUse } from "@/components/HowToUse";
import { FlavourPreview } from "@/components/FlavourPreview";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { WaitlistBand } from "@/components/WaitlistForm";
import { Hero } from "@/components/Hero";

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
