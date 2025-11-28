import 'dotenv/config';
import { db } from './src/lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log('Starting manual schema update...');

    // 1. Create New Tables
    console.log('Creating new tables...');

    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "culinary_evidence" (
            "id" serial PRIMARY KEY NOT NULL,
            "student_id" integer NOT NULL,
            "evidence_type" text NOT NULL,
            "file_name" text NOT NULL,
            "file_path" text NOT NULL,
            "file_size" integer,
            "recipe_name" text,
            "description" text,
            "uploaded_at" timestamp DEFAULT now() NOT NULL
        );
    `);

    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "dma_tabel" (
            "id" serial PRIMARY KEY NOT NULL,
            "kurs_id" text,
            "ogrenci_id" integer,
            "tarih" text NOT NULL,
            "durum" text NOT NULL
        );
    `);

    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "internal_verification" (
            "id" serial PRIMARY KEY NOT NULL,
            "student_id" integer NOT NULL,
            "assessment_type" text NOT NULL,
            "unit_code" text NOT NULL,
            "teacher_grade" text,
            "teacher_name" text,
            "teacher_date" timestamp,
            "iv_approved" boolean DEFAULT false,
            "iv_name" text,
            "iv_date" timestamp,
            "iv_comments" text,
            "submitted_to_cth" boolean DEFAULT false,
            "submission_date" timestamp,
            "created_at" timestamp DEFAULT now() NOT NULL
        );
    `);

    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "progress_tutorials" (
            "id" serial PRIMARY KEY NOT NULL,
            "student_id" integer NOT NULL,
            "unit_code" text NOT NULL,
            "unit_name" text,
            "topic" text NOT NULL,
            "feedback" text,
            "tutorial_date" timestamp NOT NULL,
            "tutor_name" text,
            "iv_checked" boolean DEFAULT false,
            "iv_checked_by" text,
            "iv_checked_date" timestamp,
            "created_at" timestamp DEFAULT now() NOT NULL
        );
    `);

    // 2. Update Students Table
    console.log('Updating students table...');

    const studentColumns = [
        'dogum_tarihi text',
        'cinsiyet text',
        'ev_unvani text',
        'sened_novu text',
        'fin_kod text',
        'seriya_no text',
        'tehsil_seviyyesi text',
        'ixtisas text',
        'is_yeri text',
        'staj_yeri text',
        'xarici_dil text',
        'cth_student_number text',
        'cohort_id text',
        'enrollment_date timestamp DEFAULT now()',
        'english_level text',
        'kurs_id text',
        'ana_kategoriya text',
        'tehsil_formati text',
        'telim_dili text',
        'baslama_tarixi text',
        'odenis_novu text',
        'final_price integer DEFAULT 0',
        'veli_melumatlari jsonb',
        'saglik_melumatlari jsonb',
        'sertifikatlar jsonb',
        'odenis_detaylari jsonb',
        'detaylar jsonb',
        'muqavile_tipi text',
        'aktif boolean DEFAULT true',
        'kayit_tarihi timestamp DEFAULT now()'
    ];

    for (const col of studentColumns) {
        const colName = col.split(' ')[0];
        try {
            await db.execute(sql.raw(`ALTER TABLE "students" ADD COLUMN IF NOT EXISTS "${colName}" ${col.substring(colName.length + 1)}`));
            console.log(`Added column ${colName} to students`);
        } catch (e: any) {
            console.log(`Error adding ${colName}: ${e.message}`);
        }
    }

    // 3. Add Foreign Keys (if needed)
    // Note: Drizzle usually handles this, but we can add them manually if we want strict integrity.
    // For now, skipping explicit FK constraints to avoid errors if they exist.

    console.log('Schema update completed!');
}

main().catch((err) => {
    console.error('Update failed!', err);
    process.exit(1);
});
