import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

export async function POST(req: Request) {
    try {
        const { email, password, ad, soyad, role, registrationKey } = await req.json();

        // Təhlükəsizlik açarını yoxla
        const VALID_KEY = process.env.REGISTRATION_KEY || 'tqta2024secure';
        if (registrationKey !== VALID_KEY) {
            return NextResponse.json(
                { success: false, error: 'Yanlış qeydiyyat açarı' },
                { status: 403 }
            );
        }

        // Şifrəni hash et
        const hashedPassword = await bcrypt.hash(password, 10);

        // İstifadəçi yarat
        const newUser = await db.insert(users).values({
            email,
            password: hashedPassword,
            ad,
            soyad,
            role: role || 'teacher',
            aktif: true,
        }).returning();

        return NextResponse.json({
            success: true,
            message: 'İstifadəçi uğurla yaradıldı',
            user: {
                id: newUser[0].id,
                email: newUser[0].email,
                ad: newUser[0].ad,
                soyad: newUser[0].soyad,
                role: newUser[0].role,
            }
        });

    } catch (error: any) {
        console.error('User creation error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'İstifadəçi yaradılarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}
