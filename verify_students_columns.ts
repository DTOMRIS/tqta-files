import 'dotenv/config';
import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log("Verifying 'students' table columns...");

    try {
        const result = await db.execute(sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'students';
        `);
        const fs = require('fs');
        const output = result.rows.map(row => `${row.column_name} (${row.data_type})`).join('\n');
        fs.writeFileSync('db_columns.txt', output);
        console.log("Columns written to db_columns.txt");
    } catch (error) {
        console.error("❌ Error verifying table:", error);
    }

    process.exit(0);
}

main();
