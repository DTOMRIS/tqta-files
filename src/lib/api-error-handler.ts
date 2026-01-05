import { NextResponse } from 'next/server';

/**
 * API Error Handler Utility
 * Tüm API route'larında tutarlı error handling için
 */

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Standart API hata yanıtı oluşturur
 */
export function handleApiError(error: unknown): NextResponse {
  // ApiError instance ise direkt kullan
  if (error instanceof ApiError) {
    console.error(`[API Error ${error.statusCode}] ${error.code || 'UNKNOWN'}:`, error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code || 'UNKNOWN_ERROR',
        ...(process.env.NODE_ENV === 'development' && error.details && { details: error.details }),
      },
      { status: error.statusCode }
    );
  }

  // Validation hatası (Zod gibi)
  if (error && typeof error === 'object' && 'issues' in error) {
    const validationError = error as { issues: Array<{ path: string[]; message: string }> };
    const messages = validationError.issues.map((issue) => 
      `${issue.path.join('.')}: ${issue.message}`
    ).join(', ');

    console.error('[Validation Error]:', messages);
    return NextResponse.json(
      {
        success: false,
        error: 'Validation hatası',
        code: 'VALIDATION_ERROR',
        details: validationError.issues,
      },
      { status: 400 }
    );
  }

  // Database hatası
  if (error && typeof error === 'object' && 'code' in error) {
    const dbError = error as { code: string; message: string };
    console.error('[Database Error]:', dbError);

    // PostgreSQL unique constraint violation
    if (dbError.code === '23505') {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu məlumat artıq mövcuddur',
          code: 'DUPLICATE_ENTRY',
        },
        { status: 409 }
      );
    }

    // Foreign key violation
    if (dbError.code === '23503') {
      return NextResponse.json(
        {
          success: false,
          error: 'Əlaqəli məlumat tapılmadı',
          code: 'FOREIGN_KEY_VIOLATION',
        },
        { status: 400 }
      );
    }
  }

  // Bilinmeyen hata
  console.error('[Unknown Error]:', error);
  return NextResponse.json(
    {
      success: false,
      error: 'Bilinməyən xəta baş verdi',
      code: 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { 
        details: error instanceof Error ? error.message : String(error) 
      }),
    },
    { status: 500 }
  );
}

/**
 * Başarılı API yanıtı oluşturur
 */
export function successResponse<T>(data: T, statusCode: number = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: statusCode }
  );
}

/**
 * API route wrapper - otomatik error handling
 */
export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

/**
 * Yaygın hata kodları
 */
export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
} as const;

/**
 * Hızlı hata oluşturucular
 */
export const createError = {
  unauthorized: (message = 'Yetkisiz erişim') => 
    new ApiError(401, message, ErrorCodes.UNAUTHORIZED),
  
  forbidden: (message = 'Bu əməliyyat üçün yetkiniz yoxdur') => 
    new ApiError(403, message, ErrorCodes.FORBIDDEN),
  
  notFound: (message = 'Məlumat tapılmadı') => 
    new ApiError(404, message, ErrorCodes.NOT_FOUND),
  
  validation: (message = 'Validation hatası', details?: unknown) => 
    new ApiError(400, message, ErrorCodes.VALIDATION_ERROR, details),
  
  duplicate: (message = 'Bu məlumat artıq mövcuddur') => 
    new ApiError(409, message, ErrorCodes.DUPLICATE_ENTRY),
  
  internal: (message = 'Daxili xəta baş verdi', details?: unknown) => 
    new ApiError(500, message, ErrorCodes.INTERNAL_ERROR, details),
};







