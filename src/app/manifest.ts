import type { MetadataRoute } from "next";
import { SITE_NAME, TAGLINE, asset } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "FluxHit",
    description: TAGLINE,
    start_url: asset("/"),
    display: "standalone",
    background_color: "#f3f4f6",
    theme_color: "#1f6fe5",
    icons: [{ src: asset("/icon.png"), sizes: "512x512", type: "image/png" }],
  };
}
