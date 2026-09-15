import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isPages ? "export" : "standalone",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: isPages,
  images: isPages
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  async headers() {
    if (isPages) return [];
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
