import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { modules, roles, lessons, studentProgress } from '@/lib/schema';
import { eq, and, asc } from 'drizzle-orm';
import { handleApiError, successResponse, createError } from '@/lib/api-error-handler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * GET /api/modules?rolId=1
 * Modulları gətirir (rol ID-yə görə filtr)
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const rolId = searchParams.get('rolId');

        let query = db
            .select({
                modul: modules,
                rol: roles,
            })
            .from(modules)
            .innerJoin(roles, eq(modules.rolId, roles.id))
            .where(eq(modules.aktiv, true));

        if (rolId) {
            query = query.where(eq(modules.rolId, parseInt(rolId))) as any;
        }

        const modullar = await query.orderBy(asc(modules.sira));

        // Hər modul üçün dərsləri gətir
        const modullarDetaylı = await Promise.all(
            modullar.map(async (m) => {
                const dersler = await db
                    .select()
                    .from(lessons)
                    .where(
                        and(
                            eq(lessons.modulId, m.modul.id),
                            eq(lessons.aktiv, true)
                        )
                    )
                    .orderBy(asc(lessons.sira));

                return {
                    ...m.modul,
                    rol: m.rol,
                    dersler,
                };
            })
        );

        return successResponse(modullarDetaylı);

    } catch (error) {
        return handleApiError(error);
    }
}







