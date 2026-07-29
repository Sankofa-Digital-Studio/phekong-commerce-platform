import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
