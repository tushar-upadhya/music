/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.saavncdn.com",
      },
    ],
  },
};

export default nextConfig;
