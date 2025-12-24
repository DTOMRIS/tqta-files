const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function check() {
    try {
        console.log("Checking users table...");
        const result = await sql`SELECT * FROM users`;
        console.log("Users found:", result);
    } catch (error) {
        console.error("Error checking users:", error);
    }
}

check();
