import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { workshops } from '@/lib/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { handleApiError, successResponse } from '@/lib/api-error-handler';

/**
 * GET /api/content/workshops
 * Workshopları gətirir
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const aktif = searchParams.get('aktif') !== 'false';
        const oneCikan = searchParams.get('one_cikan');
        const gelecek = searchParams.get('gelecek') === 'true'; // Sadece gelecek workshoplar

        let query = db.select().from(workshops);

        if (aktif) {
            query = query.where(eq(workshops.aktif, true)) as any;
        }

        if (oneCikan === 'true') {
            query = query.where(eq(workshops.oneCikan, true)) as any;
        }

        if (gelecek) {
            query = query.where(gte(workshops.baslamaTarixi, new Date())) as any;
        }

        const workshopList = await query
            .orderBy(desc(workshops.baslamaTarixi), desc(workshops.sira));

        return successResponse(workshopList);
    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * POST /api/content/workshops
 * Yeni workshop yaradır
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { ad, slug, tesvir, detayliTesvir, kapakResmi, muellim, muellimFoto, muddet, qiymet, maksimumKatilimci, minimumKatilimci, baslamaTarixi, bitmeTarixi, yer, format, kategori, aktif, oneCikan, sira } = body;

        const [newWorkshop] = await db.insert(workshops).values({
            ad,
            slug,
            tesvir,
            detayliTesvir,
            kapakResmi,
            muellim,
            muellimFoto,
            muddet,
            qiymet,
            maksimumKatilimci,
            minimumKatilimci,
            baslamaTarixi: baslamaTarixi ? new Date(baslamaTarixi) : null,
            bitmeTarixi: bitmeTarixi ? new Date(bitmeTarixi) : null,
            yer,
            format: format ?? 'onsite',
            kategori,
            aktif: aktif ?? true,
            oneCikan: oneCikan ?? false,
            sira: sira ?? 0,
        }).returning();

        return successResponse(newWorkshop);
    } catch (error) {
        return handleApiError(error);
    }
}





