import 'dotenv/config';
import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log("Adding 'attachment_url' column to 'student_notes' table...");

    try {
        await db.execute(sql`
            ALTER TABLE "student_notes" 
            ADD COLUMN IF NOT EXISTS "attachment_url" text;
        `);
        console.log("✅ 'attachment_url' column added successfully!");
    } catch (error) {
        console.error("❌ Error adding column:", error);
    }

    process.exit(0);
}

main();
