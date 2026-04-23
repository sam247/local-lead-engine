/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  transpilePackages: ["engine"],
  /** Match default App Router behaviour; canonical URLs omit trailing slash. */
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/cost",
        destination: "/companies-cost",
        permanent: true,
      },
      {
        source: "/services/:serviceBase([^/]+)-:suffix(\\d+)",
        destination: "/services/:serviceBase",
        permanent: true,
      },
      {
        source: "/:serviceSlug/:locationBase([^/]+)-:suffix(\\d+)",
        destination: "/:serviceSlug/:locationBase",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
