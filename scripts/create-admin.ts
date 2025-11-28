import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

// 1. Veritabanı Bağlantısı
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL tapılmadı! .env faylını yoxlayın.');
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// 2. USERS TABLOSUNU BURADA TANIMLIYORUZ (Import hatasını atlamak için)
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  ad: text('ad').notNull(),
  soyad: text('soyad').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').default('user'),
  aktif: boolean('aktif').default(true),
  createdAt: timestamp('created_at').defaultNow()
});

async function main() {
  const email = 'admin@tqta.com';
  const password = '123456'; 

  console.log(`🔄 Admin hesabı sıfırlanır: ${email}`);

  try {
    // 1. Eski admini sil
    // (users nesnesi artık burada tanımlı olduğu için "undefined" hatası vermez)
    await db.delete(users).where(eq(users.email, email));
    
    // 2. Şifreyi şifrele
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Yeni admini oluştur
    await db.insert(users).values({
      ad: 'System',
      soyad: 'Admin',
      email: email,
      password: hashedPassword,
      role: 'admin',
      aktif: true,
    });

    console.log('✅ BAŞARILI! Admin yaradıldı.');
    console.log(`👉 Email: ${email}`);
    console.log(`👉 Şifre: ${password}`);
    
  } catch (err) {
    console.error('❌ Xəta:', err);
  }
}

main();