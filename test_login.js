const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function testLogin() {
    console.log("Starting login simulation...");
    const email = 'admin@tqta.az';
    const password = '123456';

    try {
        // 1. Fetch User
        console.log("1. Fetching user...");
        const result = await sql`SELECT * FROM users WHERE email = ${email}`;
        const user = result[0];

        if (!user) {
            console.error("❌ User not found");
            return;
        }
        console.log("✅ User found:", user.email);

        // 2. Check Password
        console.log("2. Checking password...");
        const isValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isValid);

        if (!isValid) {
            console.error("❌ Invalid password");
            return;
        }

        // 3. Update Last Login
        console.log("3. Updating last login...");
        await sql`UPDATE users SET last_login = NOW() WHERE id = ${user.id}`;
        console.log("✅ Last login updated");

        console.log("🎉 Login simulation SUCCESSFUL");

    } catch (error) {
        console.error("❌ ERROR:", error);
    }
}

testLogin();
