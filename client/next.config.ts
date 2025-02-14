import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Ignore hydration mismatches caused by extensions
  onHydrationMismatch: () => {
    console.warn('Hydration mismatch detected, likely due to browser extensions.');
  },
};

module.exports = nextConfig;

export default nextConfig;
