import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // important for GitHub Pages routing
  basePath: "/personal-website"
};

export default nextConfig;
