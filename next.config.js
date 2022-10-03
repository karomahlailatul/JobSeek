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


  // async rewrites() {
  //   return [
  //     {
  //       source: '/verification:path*',
  //       has: [
  //         {
  //           type: 'query',
  //           key: 'type',
  //         },
        
  //       ],
  //       destination: '/',
  //     },
      
  //   ]
  // },
}

module.exports = nextConfig
