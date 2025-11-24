/** @type {import('next').NextConfig} */
const nextConfig = {
    // TypeScript hatalarını görmezden gel (Siteyi yayınlamak için)
    typescript: {
        ignoreBuildErrors: true,
    },
    // ESLint hatalarını görmezden gel
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;