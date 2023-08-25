/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.*.fna.fbcdn.net',
        port: '',
        pathname: '/v/**',
      },
    ],
  },
}

module.exports = nextConfig
