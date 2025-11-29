import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { studentNotes } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

// GET - Seçilen öğrencinin notlarını getir
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get('studentId');

        if (!studentId) {
            return NextResponse.json({ success: false, error: 'Student ID gerekli' }, { status: 400 });
        }

        const notes = await db
            .select()
            .from(studentNotes)
            .where(eq(studentNotes.studentId, parseInt(studentId)))
            .orderBy(desc(studentNotes.tarih));

        return NextResponse.json({ success: true, data: notes });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Notlar alınamadı' }, { status: 500 });
    }
}

// POST - Yeni not kaydet
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const newNote = await db.insert(studentNotes).values({
            studentId: body.studentId,
            instructor: body.instructor || "Sistem Yöneticisi", // İleride giriş yapan hoca olacak
            konu: body.konu,
            not: body.not,
            puan: body.puan ? parseInt(body.puan) : 0,
            attachmentUrl: body.attachmentUrl || null,
        }).returning();

        return NextResponse.json({ success: true, data: newNote[0] });
    } catch (error) {
        console.error("Not Kayıt Hatası:", error);
        return NextResponse.json({ success: false, error: 'Kayıt başarısız' }, { status: 500 });
    }
}
