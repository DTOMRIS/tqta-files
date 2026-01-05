const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function resetPassword() {
    try {
        const email = 'admin@tqta.az';
        const newPassword = '123456';
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        console.log(`Resetting password for ${email}...`);

        await sql`
            UPDATE users 
            SET password = ${hashedPassword} 
            WHERE email = ${email}
        `;

        console.log("Password reset successful! New password: 123456");
    } catch (error) {
        console.error("Error resetting password:", error);
    }
}

resetPassword();
