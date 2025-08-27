import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // important for GitHub Pages routing
  // Only apply basePath and assetPrefix for production builds
  ...(isDev ? {} : {
    basePath: "/personal-website",
    assetPrefix: "/personal-website"
  })
};

export default nextConfig;
