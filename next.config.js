/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_API_BACKEND: process.env.REACT_APP_API_BACKEND,
  },
  images: {
    domains: ['drive.google.com'],
  },

}


module.exports = nextConfig