const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/matrius-russian-diagnostika' : '',
  assetPrefix: isProd ? '/matrius-russian-diagnostika/' : '',
  images: { unoptimized: true },
};
export default nextConfig;
