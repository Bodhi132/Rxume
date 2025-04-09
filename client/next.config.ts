import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Ignore hydration mismatches caused by extensions
  onHydrationMismatch: () => {
    console.warn('Hydration mismatch detected, likely due to browser extensions.');
  },
  experimental: {
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;

export default nextConfig;
