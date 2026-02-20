import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/car-animation",
  assetPrefix: "/car-animation/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
