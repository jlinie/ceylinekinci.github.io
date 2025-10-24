import type { NextConfig } from "next";

const repo = "ceylinekinci.github.io";

const nextConfig: NextConfig = {
  output: "export",          
  images: { unoptimized: true },
  trailingSlash: true,        
};

export default nextConfig;