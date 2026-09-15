import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isPages ? "export" : "standalone",
  // Keep pg out of the traced bundle so standalone Docker can load it at runtime.
  serverExternalPackages: ["pg"],
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
        source: "/api/maintenance",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0, must-revalidate",
          },
        ],
      },
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
