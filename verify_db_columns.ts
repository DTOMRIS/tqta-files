import 'dotenv/config';
import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log("Verifying 'student_notes' table columns...");

    try {
        const result = await db.execute(sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'student_notes';
        `);
        console.log("Columns:", result.rows);
    } catch (error) {
        console.error("❌ Error verifying table:", error);
    }

    process.exit(0);
}

main();
