import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { masterclasses } from '@/lib/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { handleApiError, successResponse } from '@/lib/api-error-handler';

/**
 * GET /api/content/masterclasses
 * Masterclassları gətirir
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const aktif = searchParams.get('aktif') !== 'false';
        const oneCikan = searchParams.get('one_cikan');
        const aylik = searchParams.get('aylik');
        const gelecek = searchParams.get('gelecek') === 'true';

        let query = db.select().from(masterclasses);

        if (aktif) {
            query = query.where(eq(masterclasses.aktif, true)) as any;
        }

        if (oneCikan === 'true') {
            query = query.where(eq(masterclasses.oneCikan, true)) as any;
        }

        if (aylik === 'true') {
            query = query.where(eq(masterclasses.aylik, true)) as any;
        }

        if (gelecek) {
            query = query.where(gte(masterclasses.baslamaTarixi, new Date())) as any;
        }

        const masterclassList = await query
            .orderBy(desc(masterclasses.baslamaTarixi), desc(masterclasses.sira));

        return successResponse(masterclassList);
    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * POST /api/content/masterclasses
 * Yeni masterclass yaradır
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { ad, slug, tesvir, detayliTesvir, kapakResmi, muellim, muellimFoto, muellimBio, muddet, qiymet, maksimumKatilimci, baslamaTarixi, bitmeTarixi, yer, format, kategori, aylik, aktif, oneCikan, sira } = body;

        const [newMasterclass] = await db.insert(masterclasses).values({
            ad,
            slug,
            tesvir,
            detayliTesvir,
            kapakResmi,
            muellim,
            muellimFoto,
            muellimBio,
            muddet,
            qiymet,
            maksimumKatilimci,
            baslamaTarixi: baslamaTarixi ? new Date(baslamaTarixi) : null,
            bitmeTarixi: bitmeTarixi ? new Date(bitmeTarixi) : null,
            yer,
            format: format ?? 'onsite',
            kategori,
            aylik: aylik ?? false,
            aktif: aktif ?? true,
            oneCikan: oneCikan ?? false,
            sira: sira ?? 0,
        }).returning();

        return successResponse(newMasterclass);
    } catch (error) {
        return handleApiError(error);
    }
}





