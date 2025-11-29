import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { attendance } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

// GET - Belirli bir tarihteki yoklamayı getir
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get('date'); // YYYY-MM-DD
        const studentId = searchParams.get('studentId');

        if (studentId) {
            const records = await db
                .select()
                .from(attendance)
                .where(eq(attendance.studentId, parseInt(studentId)));
            return NextResponse.json({ success: true, data: records });
        }

        if (!date) {
            return NextResponse.json({ success: false, error: 'Tarih veya Öğrenci ID gerekli' }, { status: 400 });
        }

        const records = await db
            .select()
            .from(attendance)
            .where(eq(attendance.date, date));

        return NextResponse.json({ success: true, data: records });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Yoklama verisi alınamadı' }, { status: 500 });
    }
}

// POST - Toplu Yoklama Kaydet
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { date, records, instructor } = body;
        // records: [{ studentId: 1, status: 'PRESENT' }, ...]

        if (!date || !records) {
            return NextResponse.json({ success: false, error: 'Eksik veri' }, { status: 400 });
        }

        // Basit bir döngü ile güncelle veya ekle (Upsert mantığı)
        for (const record of records) {
            // 1. O gün için bu öğrencinin kaydı var mı?
            const existing = await db
                .select()
                .from(attendance)
                .where(
                    and(
                        eq(attendance.studentId, record.studentId),
                        eq(attendance.date, date)
                    )
                );

            if (existing.length > 0) {
                // Varsa Güncelle
                await db
                    .update(attendance)
                    .set({ status: record.status, recordedBy: instructor })
                    .where(eq(attendance.id, existing[0].id));
            } else {
                // Yoksa Ekle
                await db.insert(attendance).values({
                    studentId: record.studentId,
                    date: date,
                    status: record.status,
                    recordedBy: instructor
                });
            }
        }

        return NextResponse.json({ success: true, message: 'Yoklama kaydedildi' });
    } catch (error) {
        console.error("Yoklama Hatası:", error);
        return NextResponse.json({ success: false, error: 'Kayıt başarısız' }, { status: 500 });
    }
}
