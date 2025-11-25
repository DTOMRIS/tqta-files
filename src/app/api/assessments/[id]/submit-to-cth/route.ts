import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { internalVerification } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const assessmentId = parseInt(params.id);

        // Yoxla ki IV təsdiq edib
        const assessment = await db
            .select()
            .from(internalVerification)
            .where(eq(internalVerification.id, assessmentId))
            .limit(1);

        if (!assessment[0]) {
            return NextResponse.json(
                { success: false, error: 'Qiymətləndirmə tapılmadı' },
                { status: 404 }
            );
        }

        if (!assessment[0].ivApproved) {
            return NextResponse.json(
                { success: false, error: 'Qiymətləndirmə hələ IV tərəfindən təsdiqlənməyib' },
                { status: 400 }
            );
        }

        if (assessment[0].submittedToCth) {
            return NextResponse.json(
                { success: false, error: 'Bu qiymətləndirmə artıq CTH-ə göndərilib' },
                { status: 400 }
            );
        }

        // CTH-ə göndər (burada real API integration olacaq)
        const updated = await db
            .update(internalVerification)
            .set({
                submittedToCth: true,
                submissionDate: new Date(),
            })
            .where(eq(internalVerification.id, assessmentId))
            .returning();

        return NextResponse.json({
            success: true,
            message: 'Qiymətləndirmə CTH-ə uğurla göndərildi',
            data: updated[0]
        });

    } catch (error: any) {
        console.error('CTH Submit Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'CTH-ə göndərmə zamanı xəta baş verdi' },
            { status: 500 }
        );
    }
}
