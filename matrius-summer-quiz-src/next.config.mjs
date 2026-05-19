const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/matrius-summer-quiz' : '',
  assetPrefix: isProd ? '/matrius-summer-quiz/' : '',
  images: { unoptimized: true },
};
export default nextConfig;
