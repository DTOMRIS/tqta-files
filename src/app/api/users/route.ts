import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const allUsers = await db.select({
            id: users.id,
            ad: users.ad,
            soyad: users.soyad,
            email: users.email,
            role: users.role,
            aktif: users.aktif,
            createdAt: users.createdAt,
            lastLogin: users.lastLogin,
        })
            .from(users)
            .orderBy(desc(users.createdAt));

        return NextResponse.json({ success: true, users: allUsers });

    } catch (error) {
        console.error('Users fetch error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
        }

        // Özünü silməyə icazə vermə
        if (parseInt(id) === parseInt(session.user.id)) {
            return NextResponse.json({ success: false, error: 'Öz hesabınızı silə bilməzsiniz' }, { status: 400 });
        }

        await db.delete(users).where(eq(users.id, parseInt(id)));

        return NextResponse.json({ success: true, message: 'User deleted' });

    } catch (error) {
        console.error('User delete error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
