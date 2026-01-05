import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { kurumsalEgitimler } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { handleApiError, successResponse } from '@/lib/api-error-handler';

/**
 * GET /api/content/kurumsal
 * Kurumsal eğitimleri gətirir
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const aktif = searchParams.get('aktif') !== 'false';
        const oneCikan = searchParams.get('one_cikan');

        let query = db.select().from(kurumsalEgitimler);

        if (aktif) {
            query = query.where(eq(kurumsalEgitimler.aktif, true)) as any;
        }

        if (oneCikan === 'true') {
            query = query.where(eq(kurumsalEgitimler.oneCikan, true)) as any;
        }

        const kurumsalList = await query
            .orderBy(desc(kurumsalEgitimler.sira));

        return successResponse(kurumsalList);
    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * POST /api/content/kurumsal
 * Yeni kurumsal eğitim yaradır
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { ad, slug, tesvir, detayliTesvir, kapakResmi, muddet, qiymet, minimumKatilimci, maksimumKatilimci, format, kategori, xidmetler, aktif, oneCikan, sira } = body;

        const [newKurumsal] = await db.insert(kurumsalEgitimler).values({
            ad,
            slug,
            tesvir,
            detayliTesvir,
            kapakResmi,
            muddet,
            qiymet,
            minimumKatilimci: minimumKatilimci ?? 10,
            maksimumKatilimci,
            format: format ?? 'onsite',
            kategori,
            xidmetler,
            aktif: aktif ?? true,
            oneCikan: oneCikan ?? false,
            sira: sira ?? 0,
        }).returning();

        return successResponse(newKurumsal);
    } catch (error) {
        return handleApiError(error);
    }
}





