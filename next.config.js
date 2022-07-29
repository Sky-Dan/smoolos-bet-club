/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'gateway.pinata.cloud',
      'ipfs.io',
      'smoolos-bet-club.netlify.app',
    ],
    // path: '/_next/image',
    // loader: 'default',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
