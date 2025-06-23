import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["raw.githubusercontent.com", "assets.aceternity.com"], 
  },
};

export default nextConfig;
