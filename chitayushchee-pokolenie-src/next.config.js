/** @type {import('next').NextConfig} */
// STATIC_EXPORT=1 + NEXT_PUBLIC_BASE_PATH=/<репо>/<папка> — сборка под GitHub Pages.
// Без этих переменных собирается обычный Next (dev/start на 5231).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // без него относительные пути к картинкам ломаются на вложенном URL
  images: { unoptimized: true },
  ...(process.env.STATIC_EXPORT === '1' ? { output: 'export' } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
}
module.exports = nextConfig
