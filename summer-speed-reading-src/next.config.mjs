/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true'

const nextConfig = {
  reactStrictMode: true,
  // Прод-билд под /summer-speed-reading/ на web.matrius.online
  ...(isStaticExport && {
    output: 'export',
    basePath: '/summer-speed-reading',
    assetPrefix: '/summer-speed-reading/',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
}

export default nextConfig
