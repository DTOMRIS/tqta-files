import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { internalVerification } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { ivName, ivComments } = await req.json();
        const assessmentId = parseInt(params.id);

        if (!ivName) {
            return NextResponse.json(
                { success: false, error: 'IV adı mütləqdir' },
                { status: 400 }
            );
        }

        const updated = await db
            .update(internalVerification)
            .set({
                ivApproved: true,
                ivName,
                ivDate: new Date(),
                ivComments: ivComments || null,
            })
            .where(eq(internalVerification.id, assessmentId))
            .returning();

        if (updated.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Qiymətləndirmə tapılmadı' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Qiymətləndirmə IV tərəfindən təsdiqləndi',
            data: updated[0]
        });

    } catch (error: any) {
        console.error('IV Approve Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'IV təsdiq zamanı xəta baş verdi' },
            { status: 500 }
        );
    }
}
