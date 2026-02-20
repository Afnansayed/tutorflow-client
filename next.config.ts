import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/:path*`,
      },
      // {
      //   source: "/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_API_BASE_API}/:path*`,
      // },
    ];
  },
};

export default nextConfig;
