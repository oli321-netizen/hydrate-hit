import { CAN_LINE, SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";
import { DOSE, FLAVOURS, PRICE } from "@/lib/products";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        description: TAGLINE,
      },
      {
        "@type": "Product",
        name: `${SITE_NAME} pouch can`,
        description: `${TAGLINE} ${CAN_LINE}.`,
        brand: { "@type": "Brand", name: SITE_NAME },
        category: "Food supplement",
        countryOfOrigin: "GB",
        offers: [
          {
            "@type": "Offer",
            price: PRICE.single,
            priceCurrency: "GBP",
            availability: "https://schema.org/PreOrder",
            name: "Single can, 20 pouches",
          },
          {
            "@type": "Offer",
            price: PRICE.variety3,
            priceCurrency: "GBP",
            availability: "https://schema.org/PreOrder",
            name: "3-can variety",
          },
          {
            "@type": "Offer",
            price: PRICE.pack5,
            priceCurrency: "GBP",
            availability: "https://schema.org/PreOrder",
            name: "5-pack",
          },
        ],
        additionalProperty: [
          { "@type": "PropertyValue", name: "Caffeine", value: `${DOSE.caffeineMg} mg` },
          {
            "@type": "PropertyValue",
            name: "Electrolytes",
            value: `${DOSE.electrolytesMg} mg`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Hydrate Hit flavours",
        itemListElement: FLAVOURS.map((flavour, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: flavour.name,
          url: `${SITE_URL}/flavours/${flavour.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is in a pouch?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "80 mg caffeine, 150 mg sodium, 100 mg potassium, 50 mg magnesium, B6 1.7 mg, B12 2.4 µg.",
            },
          },
          {
            "@type": "Question",
            name: "Is there nicotine?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No.",
            },
          },
        ],
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
