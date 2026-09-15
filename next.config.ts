import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";
const customDomain = (
  process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ??
  process.env.CUSTOM_DOMAIN ??
  ""
)
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const basePath = customDomain
  ? ""
  : (process.env.NEXT_PUBLIC_BASE_PATH ?? (isPages ? "/hydrate-hit" : ""));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isPages ? "export" : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: isPages,
  images: isPages
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
