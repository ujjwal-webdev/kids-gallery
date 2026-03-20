/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kids-gallery/shared'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

export default nextConfig;
