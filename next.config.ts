import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // npm run build → static HTML in out/
  trailingSlash: true, // /blog → out/blog/index.html

  // No image server on S3: next/image asks Sanity's image CDN for each size instead
  images: {
    loader: "custom",
    loaderFile: "./lib/sanity-image-loader.ts",
  },

  // Tailwind CSS v4 via Turbopack (added by create-next-app)
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
