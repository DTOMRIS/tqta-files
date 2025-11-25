import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Şifrə", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // İstifadəçini tap
                    const userResult = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, credentials.email))
                        .limit(1);

                    const user = userResult[0];

                    console.log('🔍 Login attempt:', credentials.email);
                    console.log('👤 User found:', user ? 'Yes' : 'No');

                    if (!user || !user.aktif) {
                        console.log('❌ User not found or inactive');
                        return null;
                    }

                    // Şifrəni yoxla
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    console.log('🔑 Password valid:', isValid);

                    if (!isValid) {
                        console.log('❌ Invalid password');
                        return null;
                    }

                    // Son giriş tarixini yenilə
                    await db
                        .update(users)
                        .set({ lastLogin: new Date() })
                        .where(eq(users.id, user.id));

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: `${user.ad} ${user.soyad}`,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 gün
    },
    secret: process.env.NEXTAUTH_SECRET || 'tqta-secret-key-2024',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
