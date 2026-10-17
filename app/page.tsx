import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, businessId, personId } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Tells Google who this is: a photography business in San Diego run by Natalie.
// Helps the site show up for searches like "food photographer San Diego".
const business = {
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: `${site.name} Photography`,
      description: site.description,
      url: site.url,
      image: absoluteUrl("/opengraph-image.jpg"),
      logo: absoluteUrl("/icon.png"),
      address: { "@type": "PostalAddress", addressLocality: "San Diego", addressRegion: "CA", addressCountry: "US" },
      areaServed: [
        { "@type": "City", name: "San Diego" },
        { "@type": "State", name: "California" },
      ],
      knowsAbout: ["Food photography", "Product photography", "Still life photography", "Portrait photography"],
      founder: { "@id": personId },
      ...(site.instagram && { sameAs: [`https://instagram.com/${site.instagram}`] }),
    },
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      jobTitle: "Food, product and portrait photographer",
      worksFor: { "@id": businessId },
      url: absoluteUrl("/contact/"),
    },
    {
      "@type": "WebSite",
      name: `${site.name} Photography`,
      url: site.url,
      publisher: { "@id": businessId },
    },
  ],
};

// Home page → served at /
// A one-screen landing: full-screen photo with links to the portfolio and contacts.
// Prices and contact details live on their own pages (/prices/, /contact/).
export default function HomePage() {
  return (
    <>
      <JsonLd data={business} />
      <Hero />
    </>
  );
}
