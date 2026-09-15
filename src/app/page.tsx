import { Why } from "@/components/Why";
import { Stack } from "@/components/Stack";
import { Flavours } from "@/components/Flavours";
import { HowToUse } from "@/components/HowToUse";
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
      <Flavours />
      <HowToUse />
      <Reviews />
      <FAQ />
      <WaitlistBand />
    </main>
  );
}
