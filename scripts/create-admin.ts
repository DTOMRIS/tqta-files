// Admin istifadəçi yaratmaq üçün script
// Çalıştır: npx tsx scripts/create-admin.ts

import bcrypt from 'bcryptjs';
import { db } from '../src/lib/db';
import { users } from '../src/lib/schema';


async function createAdmin() {
    try {
        console.log('🔐 Admin istifadəçi yaradılır...');

        // Şifrəni hash et
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Admin yarat
        await db.insert(users).values({
            email: 'admin@tqta.az',
            password: hashedPassword,
            ad: 'Admin',
            soyad: 'İstifadəçi',
            role: 'admin',
            aktif: true,
        });

        console.log('✅ Admin uğurla yaradıldı!');
        console.log('');
        console.log('📧 Email: admin@tqta.az');
        console.log('🔑 Şifrə: admin123');
        console.log('');
        console.log('⚠️  İLK GİRİŞDƏN SONRA ŞİFRƏNİ DƏYİŞDİRİN!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Xəta:', error);
        process.exit(1);
    }
}

createAdmin();
