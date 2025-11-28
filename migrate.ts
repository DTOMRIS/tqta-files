import 'dotenv/config';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from './src/lib/db';

async function main() {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations completed!');
}

main().catch((err) => {
    console.error('Migration failed!', err);
    process.exit(1);
});
