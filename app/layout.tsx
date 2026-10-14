import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNav from "@/components/layout/SiteNav";
import { site } from "@/lib/site";
import "./globals.css";

// Fonts are downloaded at build time and self-hosted (no requests to Google from the browser)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const karla = Karla({ subsets: ["latin"], variable: "--font-karla" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name} Photography`, // pages set only their own part of the title
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: `${site.name} Photography`,
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable}`}>
      <body className="bg-cream text-ink font-sans antialiased">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
