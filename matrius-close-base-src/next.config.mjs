const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/matrius-close-base' : '',
  assetPrefix: isProd ? '/matrius-close-base/' : '',
  images: { unoptimized: true },
};
export default nextConfig;
