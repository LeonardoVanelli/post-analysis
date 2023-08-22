/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram.fbnu1-1.fna.fbcdn.net',
        port: '',
        pathname: '/v/**',
      },
    ],
  },
}

module.exports = nextConfig
