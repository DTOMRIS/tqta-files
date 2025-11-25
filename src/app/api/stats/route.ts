import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/schema';
import { sql, gte } from 'drizzle-orm';

export async function GET() {
    try {
        // Bu ayın başlangıcı
        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonthStartStr = thisMonthStart.toISOString();

        // 1. Bu ay yeni tələbələr
        const yeniTelebelerResult = await db
            .select({ count: sql<number>`count(*)::int` })
            .from(students)
            .where(gte(students.kayitTarihi, thisMonthStart));

        const yeniTelebeler = yeniTelebelerResult[0]?.count || 0;

        // 2. Toplam tələbələr (aktif)
        const toplamTelebeResult = await db
            .select({ count: sql<number>`count(*)::int` })
            .from(students)
            .where(sql`${students.aktif} = true`);

        const toplamTelebe = toplamTelebeResult[0]?.count || 0;

        // 3. Aylıq gəlir (bu ay)
        const aylikGelirResult = await db
            .select({ total: sql<number>`COALESCE(sum(${students.finalPrice}), 0)::int` })
            .from(students)
            .where(gte(students.kayitTarihi, thisMonthStart));

        const aylikGelir = aylikGelirResult[0]?.total || 0;

        // 4. Aktiv kurslar (statik - KURSLAR datasından)
        // Bu, kurslar datasını import etmək lazımdır, amma şimdilik sabit
        const aktivKurslar = 8;

        return NextResponse.json({
            success: true,
            data: {
                yeniTelebeler,
                toplamTelebe,
                aktivKurslar,
                aylikGelir
            }
        });

    } catch (error: any) {
        console.error('Stats API Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Statistika alınarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}
