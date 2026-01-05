import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { roles } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';
import { handleApiError, successResponse } from '@/lib/api-error-handler';

/**
 * GET /api/roles
 * Bütün rolları gətirir
 */
export async function GET() {
    try {
        const rollar = await db
            .select()
            .from(roles)
            .where(eq(roles.aktiv, true))
            .orderBy(asc(roles.sira));

        return successResponse(rollar);
    } catch (error) {
        return handleApiError(error);
    }
}







