/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: process.env.NEXT_EXPORT === 'true' ? 'export' : undefined,
};

export default nextConfig;

