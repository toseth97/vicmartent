/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["bcryptjs"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
