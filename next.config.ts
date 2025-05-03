import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Match the protocol of the image URL
        hostname: 'cdn.freecodecamp.org', // The hostname from the error message
        // You can optionally specify port and pathname if needed,
        // but hostname is usually sufficient.
        // port: '',
        // pathname: '/curriculum/js-music-player/**', // Example: More specific path
        pathname: '/**', // Allows any path under this hostname
      },
      // Add other domains you might need here
      // {
      //   protocol: 'https',
      //   hostname: 'another.example.com',
      //   pathname: '/**',
      // },
    ],
    // If you were using the older 'domains' configuration (less recommended now):
    // domains: ['cdn.freecodecamp.org', 'another.example.com'],
  },
};

export default nextConfig;
