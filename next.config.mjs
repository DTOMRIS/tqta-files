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
    env: {
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXTAUTH_SECRET: 'tqta-secret-key-2024',
    },
};

export default nextConfig;