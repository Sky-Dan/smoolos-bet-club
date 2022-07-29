/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.pinata.cloud', 'ipfs.io', ''],
    // path: '/_next/image',
    // loader: 'default',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
