/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'media.discordapp.net' },
      { protocol: 'https', hostname: 'i.imgur.com' }
    ]
  },
  experimental: {
    // Disabled for Netlify build: typedRoutes enforces RouteImpl types on router.
    // The login page uses a dynamic string from query for redirect, which is not
    // statically typed as a RouteImpl. Disabling avoids build-time type errors.
    typedRoutes: false
  }
};

export default nextConfig;
