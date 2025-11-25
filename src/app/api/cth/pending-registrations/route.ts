import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/schema';
import { sql, and, eq, isNotNull, isNull } from 'drizzle-orm';

export async function GET() {
    try {
        // CTH öğrencilerini çek (enrollmentDate var ama cthRegistrationDate yok)
        const cthStudents = await db
            .select({
                id: students.id,
                ad: students.ad,
                soyad: students.soyad,
                email: students.email,
                kursId: students.kursId,
                enrollmentDate: students.enrollmentDate,
                cthRegistrationDate: students.cthRegistrationDate,
                cohortId: students.cohortId
            })
            .from(students)
            .where(
                and(
                    eq(students.aktif, true),
                    isNotNull(students.enrollmentDate),
                    isNull(students.cthRegistrationDate) // Hələ CTH-ə qeydiyyatdan keçməyib
                )
            );

        const now = new Date();
        const urgent = [];
        const warning = [];
        const normal = [];

        cthStudents.forEach(student => {
            if (!student.enrollmentDate) return;

            const enrollDate = new Date(student.enrollmentDate);
            const deadline = new Date(enrollDate.getTime() + 14 * 24 * 60 * 60 * 1000); // +14 gün
            const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

            const studentData = {
                ...student,
                deadline: deadline.toLocaleDateString('az-AZ'),
                daysLeft: daysLeft,
                isOverdue: daysLeft < 0
            };

            if (daysLeft < 0) {
                // Gecikmiş!
                urgent.push(studentData);
            } else if (daysLeft <= 3) {
                // Çox təcili (3 gün və ya az)
                urgent.push(studentData);
            } else if (daysLeft <= 7) {
                // Xəbərdarlıq (4-7 gün)
                warning.push(studentData);
            } else {
                // Normal (7+ gün)
                normal.push(studentData);
            }
        });

        return NextResponse.json({
            success: true,
            data: {
                urgent,
                warning,
                normal,
                total: cthStudents.length
            }
        });

    } catch (error: any) {
        console.error('CTH Pending Registrations Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'CTH qeydiyyatları alınarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}
