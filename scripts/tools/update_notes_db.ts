import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log("Adding 'notes' table...");

    try {
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "notes" (
                "id" serial PRIMARY KEY NOT NULL,
                "student_id" integer REFERENCES "students"("id"),
                "topic" text,
                "note" text,
                "date" timestamp DEFAULT now(),
                "created_at" timestamp DEFAULT now()
            );
        `);
        console.log("✅ 'notes' table created successfully!");
    } catch (error) {
        console.error("❌ Error creating table:", error);
    }

    process.exit(0);
}

main();
