import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { auth as getServerSession } from '@/app/api/auth/[...nextauth]/route';

// GET: Tüm kullanıcıları listele (Sadece Admin)
export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const allUsers = await db.select({
            id: users.id,
            ad: users.ad,
            soyad: users.soyad,
            email: users.email,
            role: users.role,
            aktif: users.aktif,
            lastLogin: users.lastLogin,
            createdAt: users.createdAt
        })
            .from(users)
            .orderBy(desc(users.createdAt));

        return NextResponse.json({ success: true, data: allUsers });

    } catch (error) {
        console.error('Users fetch error:', error);
        return NextResponse.json({ success: false, error: 'İstifadəçilər gətirilərkən xəta baş verdi' }, { status: 500 });
    }
}

// PUT: Kullanıcı güncelle (Rol veya Aktiflik)
export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const { id, role, aktif } = await req.json();

        await db.update(users)
            .set({ role, aktif })
            .where(eq(users.id, id));

        return NextResponse.json({ success: true, message: 'İstifadəçi yeniləndi' });

    } catch (error) {
        console.error('User update error:', error);
        return NextResponse.json({ success: false, error: 'Yeniləmə xətası' }, { status: 500 });
    }
}

// DELETE: Kullanıcı sil
export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID tələb olunur' }, { status: 400 });
        }

        // Kendini silmeyi engelle
        if (parseInt(id) === parseInt(session.user.id)) {
            return NextResponse.json({ success: false, error: 'Öz hesabınızı silə bilməzsiniz' }, { status: 400 });
        }

        await db.delete(users).where(eq(users.id, id));

        return NextResponse.json({ success: true, message: 'İstifadəçi silindi' });

    } catch (error) {
        console.error('User delete error:', error);
        return NextResponse.json({ success: false, error: 'Silmə xətası' }, { status: 500 });
    }
}
