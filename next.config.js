import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  turbopack: {},
  webpack: (config) => {
    if (config.snapshot) {
      const projectNodeModules = path.resolve(__dirname, 'node_modules')
      config.snapshot.managedPaths = [projectNodeModules]
    }
    return config
  },
  async rewrites() {
    return []
  },
  async headers() {
    return [
      {
        // Static hero/industry media is never mutated in place — cache it hard
        // so production doesn't re-download every webp/mp4 on each visit or
        // industry-tab switch (the dev server serves these instantly from
        // localhost, which is why slowness only shows up in production).
        source: '/hero/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Hash-named media (carousel/cards/wallism) can never change meaning
        // under a given filename, so it is safe to cache these forever.
        source: '/:dir(carousel|cards|wallism)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Human-named media (logos, ads, images, ugc). These CAN be replaced in
        // place under the same filename, so deliberately NOT `immutable`:
        // a month of caching with revalidation, so swapping an asset actually
        // reaches returning visitors instead of being pinned for a year.
        source: '/:dir(logos|ads|images|about|team|sig)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig