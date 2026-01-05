import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { badges, studentBadges, students } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { handleApiError, successResponse, createError } from '@/lib/api-error-handler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * GET /api/gamification/badges
 * Tələbənin rozetlərini gətirir
 */
export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw createError.unauthorized();
        }

        const studentId = parseInt(session.user.id as string);
        if (isNaN(studentId)) {
            throw createError.validation('Yanlış tələbə ID');
        }

        // Tələbənin rozetlərini gətir
        const studentBadgesList = await db
            .select({
                badge: badges,
                qazanmaTarixi: studentBadges.qazanmaTarixi,
            })
            .from(studentBadges)
            .innerJoin(badges, eq(studentBadges.badgeId, badges.id))
            .where(eq(studentBadges.studentId, studentId));

        // Bütün aktiv rozetləri gətir (qazanılan və qazanılmayan)
        const allBadges = await db
            .select()
            .from(badges)
            .where(eq(badges.aktiv, true));

        const result = allBadges.map(badge => {
            const qazanılmış = studentBadgesList.find(sb => sb.badge.id === badge.id);
            return {
                ...badge,
                qazanıldı: !!qazanılmış,
                qazanmaTarixi: qazanılmış?.qazanmaTarixi || null,
            };
        });

        return successResponse(result);

    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * POST /api/gamification/badges
 * Tələbəyə rozet ver (sistem tərəfindən avtomatik)
 */
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw createError.unauthorized();
        }

        const body = await req.json();
        const { badgeKod } = body;

        if (!badgeKod) {
            throw createError.validation('Rozet kodu mütləqdir');
        }

        const studentId = parseInt(session.user.id as string);
        if (isNaN(studentId)) {
            throw createError.validation('Yanlış tələbə ID');
        }

        // Rozeti tap
        const badge = await db
            .select()
            .from(badges)
            .where(eq(badges.kod, badgeKod))
            .limit(1);

        if (badge.length === 0) {
            throw createError.notFound('Rozet tapılmadı');
        }

        // Artıq qazanılıbmı yoxla
        const existing = await db
            .select()
            .from(studentBadges)
            .where(
                and(
                    eq(studentBadges.studentId, studentId),
                    eq(studentBadges.badgeId, badge[0].id)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            return successResponse({
                mesaj: 'Bu rozet artıq qazanılıb',
                rozet: badge[0],
            });
        }

        // Rozeti ver
        const newBadge = await db.insert(studentBadges).values({
            studentId,
            badgeId: badge[0].id,
        }).returning();

        // XP əlavə et (əgər varsa)
        if (badge[0].xp > 0) {
            // XP API-sinə sorğu göndər (və ya birbaşa əlavə et)
            // Burada sadəcə məlumat qaytarırıq, XP əlavə etmə ayrı endpoint-dən olacaq
        }

        return successResponse({
            mesaj: 'Rozet uğurla qazanıldı!',
            rozet: badge[0],
            qazanmaTarixi: newBadge[0].qazanmaTarixi,
        }, 201);

    } catch (error) {
        return handleApiError(error);
    }
}







