/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/matrius-summer-school',
  assetPrefix: '/matrius-summer-school',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
