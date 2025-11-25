import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
    try {
        // Son 10 kayıt
        const sonKayitlar = await db
            .select({
                id: students.id,
                ad: students.ad,
                soyad: students.soyad,
                kayitTarihi: students.kayitTarihi,
                finalPrice: students.finalPrice
            })
            .from(students)
            .orderBy(desc(students.kayitTarihi))
            .limit(10);

        // Aktivitələrə çevir
        const aktiviteler = sonKayitlar.map(kayit => {
            const zaman = getTimeAgo(new Date(kayit.kayitTarihi));

            return {
                id: kayit.id,
                tip: 'kayit',
                mesaj: `Yeni telebe: ${kayit.ad} ${kayit.soyad}`,
                zaman: zaman
            };
        });

        return NextResponse.json({
            success: true,
            data: aktiviteler
        });

    } catch (error: any) {
        console.error('Activities API Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Aktivitələr alınarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}

// Zaman fərqini hesabla
function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'İndi';
    if (diffMins < 60) return `${diffMins} dəqiqə əvvəl`;
    if (diffHours < 24) return `${diffHours} saat əvvəl`;
    return `${diffDays} gün əvvəl`;
}
