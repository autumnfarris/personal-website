const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/personal-website' : '',
  assetPrefix: isProd ? '/personal-website/' : '',
};

export default nextConfig;
