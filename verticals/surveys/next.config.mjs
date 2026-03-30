/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  transpilePackages: ["engine"],
  async redirects() {
    const canonicalNearMe = "/topographical-survey-near-me";
    const legacyDrainNearMe = [
      "/drain-collapse-near-me",
      "/drain-survey-near-me",
      "/emergency-drain-engineer-near-me",
      "/drain-unblocking-near-me",
      "/collapsed-drain-repair-near-me",
    ];
    const nearMeRedirects = legacyDrainNearMe.map((source) => ({
      source,
      destination: canonicalNearMe,
      permanent: true,
    }));
    return [
      ...nearMeRedirects,
      {
        source: "/drainage-guides/:path*",
        destination: "/survey-guides/:path*",
        permanent: true,
      },
      {
        source: "/cost",
        destination: "/companies-cost",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
