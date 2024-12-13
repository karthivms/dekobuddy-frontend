import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ec2-13-201-230-68.ap-south-1.compute.amazonaws.com',
        port: '8002',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  }
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: false,
});

export default bundleAnalyzer(nextConfig);
