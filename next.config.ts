import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",              // npm run build → static HTML in out/
  trailingSlash: true,           // /food → out/food/index.html
  images: { unoptimized: true }, // no image optimization server on S3
  
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
