import { CAN_LINE, SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";
import { OG_IMAGE_URL } from "@/lib/seo";
import { DOSE, LAUNCH_FLAVOURS, PRICE } from "@/lib/products";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        description: `${TAGLINE} Nicotine-free caffeine and theanine oral pouches with light electrolytes. No tobacco. No nicotine.`,
        logo: OG_IMAGE_URL,
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: TAGLINE,
        inLanguage: "en-GB",
      },
      {
        "@type": "Product",
        name: `${SITE_NAME} nicotine-free pouch can`,
        description: `${TAGLINE} Nicotine-free oral pouch with ${CAN_LINE}. Not snus. Not a nicotine pouch.`,
        brand: { "@type": "Brand", name: SITE_NAME },
        category: "Food supplement",
        countryOfOrigin: "GB",
        image: OG_IMAGE_URL,
        offers: [
          {
            "@type": "Offer",
            price: PRICE.single,
            priceCurrency: "GBP",
            availability: "https://schema.org/PreOrder",
            url: `${SITE_URL}/shop`,
            name: "Single can, 20 pouches",
          },
          {
            "@type": "Offer",
            price: PRICE.variety3,
            priceCurrency: "GBP",
            availability: "https://schema.org/PreOrder",
            url: `${SITE_URL}/shop`,
            name: "3-can variety",
          },
          {
            "@type": "Offer",
            price: PRICE.pack5,
            priceCurrency: "GBP",
            availability: "https://schema.org/PreOrder",
            url: `${SITE_URL}/shop`,
            name: "5-pack",
          },
        ],
        additionalProperty: [
          { "@type": "PropertyValue", name: "Caffeine", value: `${DOSE.caffeineMg} mg` },
          { "@type": "PropertyValue", name: "L-Theanine", value: `${DOSE.theanineMg} mg` },
          { "@type": "PropertyValue", name: "Sodium", value: `${DOSE.sodiumMg} mg` },
          { "@type": "PropertyValue", name: "Potassium", value: `${DOSE.potassiumMg} mg` },
          { "@type": "PropertyValue", name: "Vitamin B6", value: `${DOSE.b6Mg} mg` },
          { "@type": "PropertyValue", name: "Vitamin B12", value: `${DOSE.b12Ug} µg` },
          { "@type": "PropertyValue", name: "Nicotine", value: "None" },
          { "@type": "PropertyValue", name: "Tobacco", value: "None" },
        ],
      },
      {
        "@type": "ItemList",
        name: `${SITE_NAME} launch flavours`,
        itemListElement: LAUNCH_FLAVOURS.map((flavour, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: flavour.name,
          url: `${SITE_URL}/flavours/${flavour.slug}`,
          image: `${SITE_URL}${flavour.heroSrc}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
