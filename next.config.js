/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Optimize fonts
  optimizeFonts: true,
  webpack: (config, { isServer }) => {
    // Suppress webpack cache warnings for SWC binaries in global node_modules
    // by configuring snapshot.managedPaths to only include project node_modules
    if (config.snapshot) {
      const path = require('path');
      const projectNodeModules = path.resolve(__dirname, 'node_modules');
      config.snapshot.managedPaths = [projectNodeModules];
    }
    return config;
  },
  // Copy assets to public during build
  async rewrites() {
    return [];
  },
}

module.exports = nextConfig
