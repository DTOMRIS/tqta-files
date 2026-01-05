import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { xpPoints, xpTransactions, students } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { handleApiError, successResponse, createError } from '@/lib/api-error-handler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LEVELS } from '@/constants/gamification';

/**
 * GET /api/gamification/xp
 * Tələbənin XP məlumatlarını gətirir
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

        // XP məlumatlarını gətir
        const xpData = await db
            .select()
            .from(xpPoints)
            .where(eq(xpPoints.studentId, studentId))
            .limit(1);

        if (xpData.length === 0) {
            // İlk dəfə, sıfırdan başla
            const newXp = await db.insert(xpPoints).values({
                studentId,
                xp: 0,
                seviyye: 1,
                seviyyeAdi: 'Şagird',
            }).returning();

            return successResponse({
                xp: 0,
                seviyye: 1,
                seviyyeAdi: 'Şagird',
                növbətiSəviyyəXP: LEVELS[1].minXP,
                qalanXP: LEVELS[1].minXP,
                faiz: 0,
            });
        }

        const current = xpData[0];
        const currentLevel = LEVELS.find(l => 
            current.xp >= l.minXP && current.xp <= l.maxXP
        ) || LEVELS[0];

        const nextLevel = LEVELS.find(l => l.minXP > current.xp) || LEVELS[LEVELS.length - 1];
        const qalanXP = nextLevel.minXP - current.xp;
        const faiz = currentLevel.maxXP === Infinity 
            ? 100 
            : Math.round(((current.xp - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100);

        return successResponse({
            xp: current.xp,
            seviyye: currentLevel.seviyye,
            seviyyeAdi: currentLevel.ad,
            növbətiSəviyyəXP: nextLevel.minXP,
            qalanXP: qalanXP,
            faiz: faiz,
        });

    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * POST /api/gamification/xp
 * XP əlavə et (video izləmə, modul tamamlama və s.)
 */
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw createError.unauthorized();
        }

        const body = await req.json();
        const { xp, səbəb, təsvir } = body;

        if (!xp || !səbəb) {
            throw createError.validation('XP və səbəb mütləqdir');
        }

        const studentId = parseInt(session.user.id as string);
        if (isNaN(studentId)) {
            throw createError.validation('Yanlış tələbə ID');
        }

        // Cari XP məlumatlarını gətir
        const currentXp = await db
            .select()
            .from(xpPoints)
            .where(eq(xpPoints.studentId, studentId))
            .limit(1);

        let yeniXP = xp;
        let yeniSeviyye = 1;
        let yeniSeviyyeAdi = 'Şagird';

        if (currentXp.length > 0) {
            yeniXP = currentXp[0].xp + xp;
            const newLevel = LEVELS.find(l => 
                yeniXP >= l.minXP && yeniXP <= l.maxXP
            ) || LEVELS[0];
            yeniSeviyye = newLevel.seviyye;
            yeniSeviyyeAdi = newLevel.ad;

            // XP-ni yenilə
            await db
                .update(xpPoints)
                .set({
                    xp: yeniXP,
                    seviyye: yeniSeviyye,
                    seviyyeAdi: yeniSeviyyeAdi,
                    sonGuncelleme: new Date(),
                })
                .where(eq(xpPoints.studentId, studentId));
        } else {
            // Yeni yarat
            await db.insert(xpPoints).values({
                studentId,
                xp: yeniXP,
                seviyye: yeniSeviyye,
                seviyyeAdi: yeniSeviyyeAdi,
            });
        }

        // Tarixçəyə əlavə et
        await db.insert(xpTransactions).values({
            studentId,
            xp,
            səbəb,
            təsvir: təsvir || `${xp} XP qazanıldı`,
        });

        return successResponse({
            xp: yeniXP,
            seviyye: yeniSeviyye,
            seviyyeAdi: yeniSeviyyeAdi,
            əlavəEdilənXP: xp,
        }, 201);

    } catch (error) {
        return handleApiError(error);
    }
}







