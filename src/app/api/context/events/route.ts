import { NextResponse } from 'next/server';
import { handleApiError, successResponse } from '@/lib/api-error-handler';
import { contextEvents } from '@/lib/context-graph';

/**
 * POST /api/context/events
 * Capture a decision trace or event
 * 
 * Example: When evaluating a student application
 * {
 *   entityType: 'application',
 *   entityId: '123',
 *   eventType: 'decision',
 *   actor: 'admin_123',
 *   action: 'approved',
 *   reasoning: 'Student has required qualifications and passed interview',
 *   context: { interviewScore: 85, qualifications: ['CTH Level 2'] },
 *   outcome: 'application_approved'
 * }
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const event = await contextEvents.captureDecision(body);
        
        // TODO: Store in database (context_events table)
        // For now, just return
        
        return successResponse(event);
    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * GET /api/context/events
 * Get reasoning/decision traces for an entity
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const entityType = searchParams.get('entityType');
        const entityId = searchParams.get('entityId');
        
        if (!entityType || !entityId) {
            return NextResponse.json(
                { error: 'entityType and entityId required' },
                { status: 400 }
            );
        }
        
        const reasoning = await contextEvents.getReasoning(entityType, entityId);
        return successResponse(reasoning);
    } catch (error) {
        return handleApiError(error);
    }
}





