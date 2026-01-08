import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leaderboard, xpPoints, students } from '@/lib/schema';
import { eq, desc, and, sql } from 'drizzle-orm';
import { handleApiError, successResponse, createError } from '@/lib/api-error-handler';
import { auth as getServerSession } from '@/app/api/auth/[...nextauth]/route';
import { LEADERBOARD_TYPES } from '@/constants/gamification';

/**
 * GET /api/gamification/leaderboard?tip=sinif|mekteb|heftelik|ayliq
 * Liderlik lövhəsini gətirir
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tip = searchParams.get('tip') || LEADERBOARD_TYPES.MEKTEB;

        // Həftəlik və aylıq üçün dövr hesabla
        const now = new Date();
        let dovur: string | null = null;

        if (tip === LEADERBOARD_TYPES.HEFTELIK) {
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay()); // Həftənin başlanğıcı
            dovur = `${weekStart.getFullYear()}-W${Math.ceil((weekStart.getDate() + 1) / 7)}`;
        } else if (tip === LEADERBOARD_TYPES.AYLIQ) {
            dovur = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        }

        // XP əsasında sıralama
        const topStudents = await db
            .select({
                studentId: xpPoints.studentId,
                xp: xpPoints.xp,
                seviyye: xpPoints.seviyye,
                seviyyeAdi: xpPoints.seviyyeAdi,
                ad: students.ad,
                soyad: students.soyad,
            })
            .from(xpPoints)
            .innerJoin(students, eq(xpPoints.studentId, students.id))
            .where(eq(students.aktif, true))
            .orderBy(desc(xpPoints.xp))
            .limit(100);

        // Sıra əlavə et
        const result = topStudents.map((student, index) => ({
            sıra: index + 1,
            studentId: student.studentId,
            ad: student.ad,
            soyad: student.soyad,
            xp: student.xp,
            seviyye: student.seviyye,
            seviyyeAdi: student.seviyyeAdi,
        }));

        // Cari istifadəçinin sırasını tap
        const session = await getServerSession(authOptions);
        let cariSıra = null;
        if (session?.user?.id) {
            const studentId = parseInt(session.user.id as string);
            const cariIndex = result.findIndex(s => s.studentId === studentId);
            if (cariIndex !== -1) {
                cariSıra = {
                    sıra: cariIndex + 1,
                    ...result[cariIndex],
                };
            }
        }

        return successResponse({
            tip,
            dovur,
            liderlikLövhəsi: result,
            cariSıra,
        });

    } catch (error) {
        return handleApiError(error);
    }
}







