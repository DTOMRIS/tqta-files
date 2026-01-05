import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';
import { handleApiError, successResponse } from '@/lib/api-error-handler';

/**
 * GET /api/content/blog
 * Blog yazılarını gətirir
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const aktif = searchParams.get('aktif') !== 'false';
        const oneCikan = searchParams.get('one_cikan');
        const limit = searchParams.get('limit');

        let query = db.select().from(blogPosts);

        if (aktif) {
            query = query.where(eq(blogPosts.aktif, true)) as any;
        }

        if (oneCikan === 'true') {
            query = query.where(eq(blogPosts.oneCikan, true)) as any;
        }

        const posts = await query
            .orderBy(desc(blogPosts.yayinlanmaTarixi), desc(blogPosts.sira))
            .limit(limit ? parseInt(limit) : 100);

        return successResponse(posts);
    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * POST /api/content/blog
 * Yeni blog yazısı yaradır
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { baslik, slug, ozet, icerik, kapakResmi, kategori, yazarId, yazarAdi, aktif, oneCikan, sira } = body;

        const [newPost] = await db.insert(blogPosts).values({
            baslik,
            slug,
            ozet,
            icerik,
            kapakResmi,
            kategori,
            yazarId,
            yazarAdi,
            aktif: aktif ?? false,
            oneCikan: oneCikan ?? false,
            sira: sira ?? 0,
            yayinlanmaTarixi: aktif ? new Date() : null,
        }).returning();

        return successResponse(newPost);
    } catch (error) {
        return handleApiError(error);
    }
}





