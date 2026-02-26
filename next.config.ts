import type { NextConfig } from 'next'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {}, // Enable Turbopack with empty config
}

module.exports = withPWA(nextConfig)
