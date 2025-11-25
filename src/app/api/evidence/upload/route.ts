import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { db } from '@/lib/db';
import { culinaryEvidence, students } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const studentId = formData.get('studentId') as string;
        const evidenceType = formData.get('evidenceType') as string;
        const recipeName = formData.get('recipeName') as string;
        const description = formData.get('description') as string;

        if (!file || !studentId || !evidenceType) {
            return NextResponse.json(
                { success: false, error: 'Fayl, tələbə və sənəd tipi mütləqdir' },
                { status: 400 }
            );
        }

        // Fayl validasiyası
        const maxSize = evidenceType === 'video' ? 100 * 1024 * 1024 : 5 * 1024 * 1024; // 100MB video, 5MB digər
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: `Fayl ölçüsü çox böyükdür (max ${maxSize / 1024 / 1024}MB)` },
                { status: 400 }
            );
        }

        // Tələbə məlumatlarını al
        const student = await db
            .select()
            .from(students)
            .where(eq(students.id, parseInt(studentId)))
            .limit(1);

        if (!student[0]) {
            return NextResponse.json(
                { success: false, error: 'Tələbə tapılmadı' },
                { status: 404 }
            );
        }

        // Fayl adını CTH formatında yarat
        const fileExt = file.name.split('.').pop();
        const timestamp = Date.now();
        const evidenceCount = await db
            .select()
            .from(culinaryEvidence)
            .where(eq(culinaryEvidence.studentId, parseInt(studentId)));

        const fileNumber = String(evidenceCount.length + 1).padStart(3, '0');
        const fileName = `${studentId}-${evidenceType}-${fileNumber}.${fileExt}`;

        // Upload qovluğunu yarat
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'evidence', studentId);
        await mkdir(uploadDir, { recursive: true });

        // Faylı saxla
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Veritabanına əlavə et
        const newEvidence = await db.insert(culinaryEvidence).values({
            studentId: parseInt(studentId),
            evidenceType,
            fileName,
            filePath: `/uploads/evidence/${studentId}/${fileName}`,
            fileSize: file.size,
            recipeName: recipeName || null,
            description: description || null,
        }).returning();

        // Tələbənin sayğacını artır
        const updateField = evidenceType === 'recipe_log' ? 'recipeLogCount' :
            evidenceType === 'video' ? 'videoCount' :
                evidenceType === 'assignment' ? 'assignmentCount' : null;

        if (updateField) {
            await db
                .update(students)
                .set({ [updateField]: students[updateField] + 1 })
                .where(eq(students.id, parseInt(studentId)));
        }

        return NextResponse.json({
            success: true,
            message: 'Fayl uğurla yükləndi',
            data: newEvidence[0]
        });

    } catch (error: any) {
        console.error('File upload error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Fayl yükləməkdə xəta baş verdi' },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get('studentId');

        if (!studentId) {
            return NextResponse.json(
                { success: false, error: 'Tələbə ID mütləqdir' },
                { status: 400 }
            );
        }

        const evidence = await db
            .select()
            .from(culinaryEvidence)
            .where(eq(culinaryEvidence.studentId, parseInt(studentId)))
            .orderBy(culinaryEvidence.uploadedAt);

        return NextResponse.json({
            success: true,
            data: evidence
        });

    } catch (error: any) {
        console.error('Evidence GET error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Sənədlər alınarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}
