/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  transpilePackages: ["engine"],
  async redirects() {
    return [
      {
        source: "/cost",
        destination: "/companies-cost",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
