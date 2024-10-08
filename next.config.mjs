import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const bundleAnalyzer = withBundleAnalyzer({
    enabled: false,
  });

export default bundleAnalyzer(nextConfig);
