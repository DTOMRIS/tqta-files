const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function check() {
    try {
        console.log("Fetching all users...");
        const result = await sql`SELECT id, ad, soyad, email, role, aktif FROM users`;
        console.log("Registered Users:", result);
    } catch (error) {
        console.error("Error checking users:", error);
    }
}

check();
