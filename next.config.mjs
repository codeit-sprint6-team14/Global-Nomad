/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    unoptimized: process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED === 'true', // 환경 변수에 따라 설정
  },
};

export default nextConfig;
