/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // E nevojshme për Docker production build
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
