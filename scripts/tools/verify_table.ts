import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function verify() {
    try {
        const result = await db.execute(sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'student_notes'
            );
        `);
        console.log("Table exists:", result.rows[0].exists);
    } catch (error) {
        console.error("Verification failed:", error);
    }
    process.exit(0);
}

verify();
