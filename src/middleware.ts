import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Geçici olarak middleware'i devre dışı bırakıyoruz
export function middleware(request: NextRequest) {
    // Her şeyi geç - hiçbir kontrol yok
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Sadece API routes hariç
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
