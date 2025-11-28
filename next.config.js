/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
