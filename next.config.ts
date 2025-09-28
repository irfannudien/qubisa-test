import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "qubisastorage.blob.core.windows.net",
      "qubisa.azureedge.net",
      "qubisastorage.azureedge.net",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
