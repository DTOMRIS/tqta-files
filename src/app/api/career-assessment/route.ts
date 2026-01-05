import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { careerAssessment, assessmentQuestions, students } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { handleApiError, successResponse, createError } from '@/lib/api-error-handler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ASSESSMENT_CATEGORIES } from '@/constants/career-assessment';

/**
 * GET /api/career-assessment
 * Anket suallarını gətirir
 */
export async function GET() {
    try {
        const suallar = await db
            .select()
            .from(assessmentQuestions)
            .where(eq(assessmentQuestions.aktiv, true))
            .orderBy(assessmentQuestions.sira);

        return successResponse(suallar);
    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * POST /api/career-assessment
 * Anket cavablarını qeyd edir və nəticəni hesablayır
 */
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw createError.unauthorized();
        }

        const body = await req.json();
        const { cavablar, muddet } = body;

        if (!cavablar || !Array.isArray(cavablar)) {
            throw createError.validation('Cavablar mütləqdir');
        }

        const studentId = parseInt(session.user.id as string);
        if (isNaN(studentId)) {
            throw createError.validation('Yanlış tələbə ID');
        }

        // Artıq anket verilibmi yoxla
        const existing = await db
            .select()
            .from(careerAssessment)
            .where(eq(careerAssessment.studentId, studentId))
            .limit(1);

        if (existing.length > 0) {
            return successResponse({
                mesaj: 'Anket artıq tamamlanıb',
                nəticə: existing[0],
            });
        }

        // Sualları gətir
        const suallar = await db
            .select()
            .from(assessmentQuestions)
            .where(eq(assessmentQuestions.aktiv, true));

        // Kateqoriyalara görə hesabla
        const kateqoriyaNəticələri: Record<string, { ümumi: number; cavab: number }> = {};

        Object.keys(ASSESSMENT_CATEGORIES).forEach(key => {
            kateqoriyaNəticələri[key] = { ümumi: 0, cavab: 0 };
        });

        cavablar.forEach((cavab: { sual_id: number; cavab: 'men' | 'men_deyil' }) => {
            const sual = suallar.find(s => s.id === cavab.sual_id);
            if (sual && cavab.cavab === 'men') {
                const kateqoriya = sual.kateqoriya as keyof typeof ASSESSMENT_CATEGORIES;
                if (kateqoriyaNəticələri[kateqoriya]) {
                    kateqoriyaNəticələri[kateqoriya].ümumi += ASSESSMENT_CATEGORIES[kateqoriya as keyof typeof ASSESSMENT_CATEGORIES].çəki;
                    kateqoriyaNəticələri[kateqoriya].cavab += ASSESSMENT_CATEGORIES[kateqoriya as keyof typeof ASSESSMENT_CATEGORIES].çəki;
                }
            } else if (sual) {
                const kateqoriya = sual.kateqoriya as keyof typeof ASSESSMENT_CATEGORIES;
                if (kateqoriyaNəticələri[kateqoriya]) {
                    kateqoriyaNəticələri[kateqoriya].ümumi += ASSESSMENT_CATEGORIES[kateqoriya as keyof typeof ASSESSMENT_CATEGORIES].çəki;
                }
            }
        });

        // Faizləri hesabla
        const optimizm = Math.round((kateqoriyaNəticələri.optimizm?.cavab || 0) / (kateqoriyaNəticələri.optimizm?.ümumi || 1) * 100);
        const liderlik = Math.round((kateqoriyaNəticələri.liderlik?.cavab || 0) / (kateqoriyaNəticələri.liderlik?.ümumi || 1) * 100);
        const icma = Math.round((kateqoriyaNəticələri.icma?.cavab || 0) / (kateqoriyaNəticələri.icma?.ümumi || 1) * 100);
        const senetkarlik = Math.round((kateqoriyaNəticələri.senetkarlik?.cavab || 0) / (kateqoriyaNəticələri.senetkarlik?.ümumi || 1) * 100);
        const mentorluq = Math.round((kateqoriyaNəticələri.mentorluq?.cavab || 0) / (kateqoriyaNəticələri.mentorluq?.ümumi || 1) * 100);

        // Ümumi nəticəni müəyyən et (ən yüksək skor)
        const skorlar = [
            { ad: 'aspaz', skor: senetkarlik + mentorluq },
            { ad: 'garson', skor: icma + liderlik },
            { ad: 'barista', skor: senetkarlik + icma },
            { ad: 'qonaqlama', skor: icma + liderlik },
            { ad: 'idareetme', skor: liderlik + mentorluq },
        ];

        const umumiNetice = skorlar.reduce((max, current) => 
            current.skor > max.skor ? current : max
        ).ad;

        // Anketi qeyd et
        const nəticə = await db.insert(careerAssessment).values({
            studentId,
            cavablar,
            optimizm,
            liderlik,
            icma,
            senetkarlik,
            mentorluq,
            umumiNəticə: umumiNetice,
            muddet: muddet || null,
        }).returning();

        return successResponse({
            mesaj: 'Anket uğurla tamamlandı!',
            nəticə: nəticə[0],
            təsvir: {
                optimizm: `${optimizm}%`,
                liderlik: `${liderlik}%`,
                icma: `${icma}%`,
                senetkarlik: `${senetkarlik}%`,
                mentorluq: `${mentorluq}%`,
                tövsiyəEdilənRol: umumiNetice,
            },
        }, 201);

    } catch (error) {
        return handleApiError(error);
    }
}







