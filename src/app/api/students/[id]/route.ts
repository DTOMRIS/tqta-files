import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ success: false, error: 'Geçersiz ID' }, { status: 400 });
        }

        const student = await db
            .select()
            .from(students)
            .where(eq(students.id, id));

        if (student.length === 0) {
            return NextResponse.json({ success: false, error: 'Öğrenci bulunamadı' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: student[0] });
    } catch (error: any) {
        console.error('Student GET Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Öğrenci bilgileri alınırken hata oluştu' },
            { status: 500 }
        );
    }
}
