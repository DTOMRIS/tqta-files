import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { internalVerification, students } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';

// GET - Qiymətləndirmələri al
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const pending = searchParams.get('pending') === 'true';
        const studentId = searchParams.get('studentId');

        let query = db
            .select({
                id: internalVerification.id,
                studentId: internalVerification.studentId,
                studentAd: students.ad,
                studentSoyad: students.soyad,
                assessmentType: internalVerification.assessmentType,
                unitCode: internalVerification.unitCode,
                teacherGrade: internalVerification.teacherGrade,
                teacherName: internalVerification.teacherName,
                teacherDate: internalVerification.teacherDate,
                ivApproved: internalVerification.ivApproved,
                ivName: internalVerification.ivName,
                ivDate: internalVerification.ivDate,
                ivComments: internalVerification.ivComments,
                submittedToCth: internalVerification.submittedToCth,
                submissionDate: internalVerification.submissionDate,
                createdAt: internalVerification.createdAt,
            })
            .from(internalVerification)
            .leftJoin(students, eq(internalVerification.studentId, students.id))
            .orderBy(desc(internalVerification.createdAt));

        const conditions = [];
        if (pending) {
            conditions.push(eq(internalVerification.ivApproved, false));
        }
        if (studentId) {
            conditions.push(eq(internalVerification.studentId, parseInt(studentId)));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        const assessments = await query;

        return NextResponse.json({
            success: true,
            data: assessments
        });

    } catch (error: any) {
        console.error('Assessments GET Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Qiymətləndirmələr alınarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}

// POST - Yeni qiymətləndirmə əlavə et
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            studentId,
            assessmentType,
            unitCode,
            teacherGrade,
            teacherName
        } = body;

        if (!studentId || !assessmentType || !unitCode || !teacherGrade) {
            return NextResponse.json(
                { success: false, error: 'Tələbə, qiymətləndirmə tipi, unit və qiymət mütləqdir' },
                { status: 400 }
            );
        }

        const newAssessment = await db.insert(internalVerification).values({
            studentId: parseInt(studentId),
            assessmentType,
            unitCode,
            teacherGrade,
            teacherName,
            teacherDate: new Date(),
            ivApproved: false,
            submittedToCth: false,
        }).returning();

        return NextResponse.json({
            success: true,
            message: 'Qiymətləndirmə uğurla əlavə edildi',
            data: newAssessment[0]
        });

    } catch (error: any) {
        console.error('Assessment POST Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Qiymətləndirmə əlavə edilərkən xəta baş verdi' },
            { status: 500 }
        );
    }
}
