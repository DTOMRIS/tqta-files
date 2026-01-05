# 📚 Örnek Kullanım - Error Handler & Validation

## 1. Package.json'a Zod Ekle

```bash
npm install zod
```

## 2. API Route'u Refactor Et

### ÖNCE (Eski Yöntem):
```typescript
// src/app/api/students/route.ts
export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Validation yok, error handling basit
        const yeniOgrenci = await db.insert(students).values({...});
        return NextResponse.json({ success: true, data: yeniOgrenci[0] });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error?.message },
            { status: 500 }
        );
    }
}
```

### SONRA (Yeni Yöntem):
```typescript
// src/app/api/students/route.ts
import { handleApiError, successResponse, createError } from '@/lib/api-error-handler';
import { studentRegistrationSchema } from '@/lib/validations/student';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
    try {
        // 1. Authentication kontrolü
        const session = await getServerSession(authOptions);
        if (!session || (session.user.role !== 'admin' && session.user.role !== 'teacher')) {
            throw createError.unauthorized('Yalnız admin və müəllimlər tələbə əlavə edə bilər');
        }

        // 2. Request body'yi parse et
        const body = await req.json();

        // 3. Validation (Zod ile)
        const validatedData = studentRegistrationSchema.parse(body);

        // 4. Business logic
        const yeniOgrenci = await db.insert(students).values({
            ad: validatedData.ad,
            soyad: validatedData.soyad,
            // ... diğer alanlar
        }).returning();

        // 5. Başarılı yanıt
        return successResponse(yeniOgrenci[0], 201);

    } catch (error) {
        // Otomatik error handling
        return handleApiError(error);
    }
}
```

## 3. Frontend'de Validation Kullan

### React Hook Form + Zod:
```typescript
// src/app/telebe-qeydiyyat/page.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentRegistrationSchema } from '@/lib/validations/student';

export default function StudentRegistration() {
    const form = useForm({
        resolver: zodResolver(studentRegistrationSchema),
        defaultValues: {
            ad: '',
            soyad: '',
            // ...
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if (!result.success) {
                // Error handler'dan gelen standart format
                toast.error(result.error);
                return;
            }

            toast.success('Tələbə uğurla qeydiyyatdan keçdi!');
        } catch (error) {
            toast.error('Xəta baş verdi');
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <input {...form.register('ad')} />
            {form.formState.errors.ad && (
                <span>{form.formState.errors.ad.message}</span>
            )}
            {/* ... */}
        </form>
    );
}
```

## 4. Environment Variables Validation

```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  UPLOADTHING_SECRET: z.string().optional(),
  UPLOADTHING_APP_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

## 5. Custom Hook Örneği

```typescript
// src/hooks/useStudents.ts
import { useState, useEffect } from 'react';
import { studentRegistrationSchema } from '@/lib/validations/student';

type Student = z.infer<typeof studentRegistrationSchema>;

export function useStudents() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/students');
            const data = await res.json();
            
            if (!data.success) {
                throw new Error(data.error);
            }
            
            setStudents(data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Xəta baş verdi');
        } finally {
            setLoading(false);
        }
    };

    return { students, loading, error, refetch: fetchStudents };
}
```

## 6. Error Boundary Örneği

```typescript
// src/components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Error caught by boundary:', error, errorInfo);
        // Buraya Sentry veya başka bir logging servisi eklenebilir
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <h1 className="text-2xl font-bold mb-4">Xəta baş verdi</h1>
                    <p className="text-muted-foreground mb-4">
                        {this.state.error?.message || 'Gözlənilməz bir xəta baş verdi'}
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Səhifəni yenilə
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
```

## 7. Loading Skeleton Örneği

```typescript
// src/components/ui/skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-md bg-muted ${className}`}
        />
    );
}

// Kullanım:
export function StudentListSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
```

## 8. Constants Dosyası

```typescript
// src/constants/index.ts
export const ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
} as const;

export const ATTENDANCE_STATUS = {
    PRESENT: 'PRESENT',
    ABSENT: 'ABSENT',
    LATE: 'LATE',
    EXCUSED: 'EXCUSED',
} as const;

export const CTH_DEADLINE_DAYS = 14;
```

## Özet

1. ✅ **Error Handler**: Tüm API route'larında tutarlı hata yönetimi
2. ✅ **Validation**: Zod ile güçlü input validation
3. ✅ **Type Safety**: TypeScript ile tip güvenliği
4. ✅ **Code Reusability**: Custom hooks ve utilities
5. ✅ **Better UX**: Loading states, error boundaries, skeletons

Bu yapıyı adım adım uygulayarak sistemi daha profesyonel hale getirebilirsiniz! 🚀







