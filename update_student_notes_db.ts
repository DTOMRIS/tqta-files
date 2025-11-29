import 'dotenv/config';
import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log("Adding 'student_notes' table...");

    try {
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "student_notes" (
                "id" serial PRIMARY KEY NOT NULL,
                "student_id" integer REFERENCES "students"("id"),
                "instructor" varchar(255),
                "konu" varchar(255),
                "not" text,
                "puan" integer,
                "tarih" timestamp DEFAULT now()
            );
        `);
        console.log("✅ 'student_notes' table created successfully!");
    } catch (error) {
        console.error("❌ Error creating table:", error);
    }

    process.exit(0);
}

main();
