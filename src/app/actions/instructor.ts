'use server';

import { db } from '@/lib/db';
import { students, dma_tabel } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// 1. Tələbələri Gətir
export async function getStudents(kursId?: string) {
    try {
        // Əgər kursId varsa ona görə, yoxsa hamısını gətir (demo üçün)
        const data = await db.select().from(students);
        // Real ssenaridə: .where(eq(students.kursId, kursId))
        return { success: true, data };
    } catch (error: any) {
        console.error("Student Fetch Error:", error);
        return { success: false, error: error.message };
    }
}

// 2. Yoklama Yaz (DMA Tabel)
export async function saveAttendance(studentId: number, date: string, status: string) {
    try {
        // Öncə bu tələbənin bu tarixdə qeydi varmı yoxla?
        const existing = await db.select().from(dma_tabel).where(
            and(
                eq(dma_tabel.ogrenci_id, studentId),
                eq(dma_tabel.tarih, date)
            )
        );

        if (existing.length > 0) {
            // Varsa yenilə
            await db.update(dma_tabel)
                .set({ durum: status })
                .where(eq(dma_tabel.id, existing[0].id));
        } else {
            // Yoxsa yeni yarat
            await db.insert(dma_tabel).values({
                ogrenci_id: studentId,
                tarih: date,
                durum: status,
                kurs_id: "DEMO-KURS" // İrəlidə dinamik olacaq
            });
        }

        revalidatePath('/hoca-panel');
        return { success: true };
    } catch (error: any) {
        console.error("Attendance Error:", error);
        return { success: false, error: error.message };
    }
}
