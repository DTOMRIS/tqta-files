'use server';

import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// 1. Notları Gətir (Tələbəyə görə)
export async function getNotes(studentId: number) {
    try {
        const data = await db.select()
            .from(notes)
            .where(eq(notes.studentId, studentId))
            .orderBy(desc(notes.date)); // Ən son not ən üstdə

        return { success: true, data };
    } catch (error: any) {
        console.error("Get Notes Error:", error);
        return { success: false, error: error.message };
    }
}

// 2. Not Saxla
export async function saveNote(data: { studentId: number; topic: string; note: string }) {
    try {
        await db.insert(notes).values({
            studentId: data.studentId,
            topic: data.topic,
            note: data.note,
            date: new Date()
        });

        revalidatePath('/ders-notlari');
        return { success: true };
    } catch (error: any) {
        console.error("Save Note Error:", error);
        return { success: false, error: error.message };
    }
}
