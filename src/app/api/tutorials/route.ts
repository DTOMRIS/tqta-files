import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { progressTutorials, students } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';

// GET - Bütün tutorialları və ya tələbəyə görə
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get('studentId');
        const unitCode = searchParams.get('unitCode');

        let query = db
            .select({
                id: progressTutorials.id,
                studentId: progressTutorials.studentId,
                studentAd: students.ad,
                studentSoyad: students.soyad,
                unitCode: progressTutorials.unitCode,
                unitName: progressTutorials.unitName,
                topic: progressTutorials.topic,
                feedback: progressTutorials.feedback,
                tutorialDate: progressTutorials.tutorialDate,
                tutorName: progressTutorials.tutorName,
                ivChecked: progressTutorials.ivChecked,
                ivCheckedBy: progressTutorials.ivCheckedBy,
                ivCheckedDate: progressTutorials.ivCheckedDate,
                createdAt: progressTutorials.createdAt,
            })
            .from(progressTutorials)
            .leftJoin(students, eq(progressTutorials.studentId, students.id))
            .orderBy(desc(progressTutorials.tutorialDate));

        // Filtr
        const conditions = [];
        if (studentId) {
            conditions.push(eq(progressTutorials.studentId, parseInt(studentId)));
        }
        if (unitCode) {
            conditions.push(eq(progressTutorials.unitCode, unitCode));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        const tutorials = await query;

        return NextResponse.json({
            success: true,
            data: tutorials
        });

    } catch (error: any) {
        console.error('Tutorials GET Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Tutoriallar alınarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}

// POST - Yeni tutorial əlavə et
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            studentId,
            unitCode,
            unitName,
            topic,
            feedback,
            tutorialDate,
            tutorName
        } = body;

        // Validasiya
        if (!studentId || !unitCode || !topic || !tutorialDate) {
            return NextResponse.json(
                { success: false, error: 'Tələbə, unit, mövzu və tarix mütləqdir' },
                { status: 400 }
            );
        }

        // Tutorial yarat
        const newTutorial = await db.insert(progressTutorials).values({
            studentId: parseInt(studentId),
            unitCode,
            unitName,
            topic,
            feedback,
            tutorialDate: new Date(tutorialDate),
            tutorName,
            ivChecked: false,
        }).returning();

        // Tələbənin tutorial sayını artır
        await db
            .update(students)
            .set({
                progressTutorialsCount: students.progressTutorialsCount + 1
            })
            .where(eq(students.id, parseInt(studentId)));

        return NextResponse.json({
            success: true,
            message: 'Tutorial uğurla əlavə edildi',
            data: newTutorial[0]
        });

    } catch (error: any) {
        console.error('Tutorial POST Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Tutorial əlavə edilərkən xəta baş verdi' },
            { status: 500 }
        );
    }
}
