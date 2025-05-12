/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig 