/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dzptscged/**', // Replace "dzptscged" with your Cloudinary cloud name
      },
    ],
  },
};

export default nextConfig;
