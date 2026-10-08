/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/visit",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
