/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/editor"],
  images: {
    domains: ["ui.aceternity.com"],
  },
};

export default nextConfig;
