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
}

export default nextConfig