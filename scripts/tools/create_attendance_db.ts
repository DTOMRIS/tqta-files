import 'dotenv/config';
import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log("Creating 'attendance' table...");

    try {
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "attendance" (
                "id" serial PRIMARY KEY NOT NULL,
                "student_id" integer REFERENCES "students"("id"),
                "date" varchar(20),
                "status" varchar(20) DEFAULT 'PRESENT',
                "recorded_by" varchar(255),
                "created_at" timestamp DEFAULT now()
            );
        `);
        console.log("✅ Table 'attendance' created successfully!");
    } catch (error) {
        console.error("❌ Error creating table:", error);
    }

    process.exit(0);
}

main();
