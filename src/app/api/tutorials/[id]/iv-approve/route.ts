import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { progressTutorials } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { ivCheckedBy } = await req.json();
        const tutorialId = parseInt(params.id);

        if (!ivCheckedBy) {
            return NextResponse.json(
                { success: false, error: 'IV adı mütləqdir' },
                { status: 400 }
            );
        }

        // IV onayı ver
        const updated = await db
            .update(progressTutorials)
            .set({
                ivChecked: true,
                ivCheckedBy,
                ivCheckedDate: new Date(),
            })
            .where(eq(progressTutorials.id, tutorialId))
            .returning();

        if (updated.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Tutorial tapılmadı' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Tutorial IV tərəfindən təsdiqləndi',
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
