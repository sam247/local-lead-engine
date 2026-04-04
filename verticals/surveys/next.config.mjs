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

    const hubPrefixRedirects = [
      { source: "/drain-costs/:path*", destination: "/survey-costs/:path*" },
      { source: "/drain-problems/:path*", destination: "/survey-issues/:path*" },
      { source: "/drain-survey/:path*", destination: "/survey-services/:path*" },
      { source: "/drain-collapse/:path*", destination: "/survey-project-types/:path*" },
      { source: "/drain-inspection/:path*", destination: "/survey-methods/:path*" },
      { source: "/drain-causes/:path*", destination: "/survey-technology/:path*" },
      { source: "/commercial-drainage/:path*", destination: "/commercial-surveys/:path*" },
      { source: "/drain-repair-methods/:path*", destination: "/survey-deliverables/:path*" },
      { source: "/property-drainage/:path*", destination: "/property-surveys/:path*" },
      { source: "/drain-responsibility/:path*", destination: "/boundary-legal-surveys/:path*" },
      { source: "/homebuyer-drainage/:path*", destination: "/homebuyer-surveys/:path*" },
      { source: "/drain-insurance/:path*", destination: "/survey-costs/:path*" },
    ].map(({ source, destination }) => ({ source, destination, permanent: true }));

    return [
      ...nearMeRedirects,
      ...hubPrefixRedirects,
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
      {
        source: "/drain-survey-cost",
        destination: "/survey-costs",
        permanent: true,
      },
      {
        source: "/collapsed-drains-complete-guide",
        destination: "/survey-issues",
        permanent: true,
      },
      {
        source: "/drainage-faq",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/do-i-need-a-drain-survey",
        destination: "/do-i-need-a-land-survey",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
