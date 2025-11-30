import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // 1. Admin olmayanlar 'ayarlar' ve 'users' sayfalarına giremez
        if (path.startsWith("/ayarlar") || path.startsWith("/api/users")) {
            if (token?.role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        // 2. Hoca Paneli'ne sadece admin ve teacher girebilir (Öğrenci giremez - gerçi öğrenci login yok ama olsun)
        if (path.startsWith("/hoca-panel")) {
            if (token?.role !== "admin" && token?.role !== "teacher") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (auth routes)
         * - api/users/register (registration)
         * - login (login page)
         * - register (register page)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api/auth|api/users/register|login|register|_next/static|_next/image|favicon.ico).*)",
    ],
};
