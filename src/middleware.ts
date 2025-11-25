export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/',
        '/telebeler/:path*',
        '/telebe-qeydiyyat',
        '/akademik-takip/:path*',
        '/cth-panel/:path*',
        '/api/students/:path*',
        '/api/stats',
        '/api/activities',
        '/api/cth/:path*',
    ],
};
