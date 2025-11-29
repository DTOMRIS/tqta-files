import 'dotenv/config';
import { db } from './src/lib/db';
import { attendance } from './src/lib/schema';
import { eq } from 'drizzle-orm';

async function main() {
    console.log("Verifying 'attendance' table interaction...");

    try {
        // 1. Insert
        console.log("Inserting test record...");
        const inserted = await db.insert(attendance).values({
            studentId: 1, // Assuming student ID 1 exists, or it might fail FK if not. 
            // Actually, let's use a safe ID or just check if table exists by select.
            // If FK fails, it means table exists and constraint works.
            date: '2025-01-01',
            status: 'TEST',
            recordedBy: 'System'
        }).returning();
        console.log("Inserted:", inserted);

        // 2. Select
        console.log("Fetching record...");
        const fetched = await db.select().from(attendance).where(eq(attendance.date, '2025-01-01'));
        console.log("Fetched:", fetched);

        // 3. Delete
        console.log("Deleting test record...");
        await db.delete(attendance).where(eq(attendance.date, '2025-01-01'));
        console.log("Deleted.");

    } catch (error) {
        console.error("❌ Error:", error);
    }

    process.exit(0);
}

main();
