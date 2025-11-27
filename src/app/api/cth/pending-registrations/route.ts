import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/db/schema';
import { isNull, desc } from 'drizzle-orm';

export async function GET() {
    try {
        // CTH Numarası OLMAYAN (Henüz kaydedilmemiş) öğrencileri çek
        const pendingStudents = await db.select().from(students)
            .where(isNull(students.cthStudentNumber))
            .orderBy(desc(students.enrollmentDate));

        return NextResponse.json(pendingStudents);
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
