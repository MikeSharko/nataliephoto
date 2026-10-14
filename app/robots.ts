import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Generated once at build time → out/robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
