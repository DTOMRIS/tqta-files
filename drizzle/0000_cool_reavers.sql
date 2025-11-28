CREATE TABLE "culinary_evidence" (
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
--> statement-breakpoint
CREATE TABLE "dma_tabel" (
	"id" serial PRIMARY KEY NOT NULL,
	"kurs_id" text,
	"ogrenci_id" integer,
	"tarih" text NOT NULL,
	"durum" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internal_verification" (
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
--> statement-breakpoint
CREATE TABLE "kurslar" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"kategori_id" text NOT NULL,
	"tip" text DEFAULT 'STANDART',
	"is_active" boolean DEFAULT true,
	"price_azn" integer DEFAULT 0,
	"cost_gbp" integer DEFAULT 0,
	"total_hours" integer,
	"meta_data" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "progress_tutorials" (
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
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"soyad" text NOT NULL,
	"ata_adi" text,
	"email" text,
	"telefon" text,
	"whatsapp" text,
	"dogum_tarihi" text,
	"cinsiyet" text,
	"ev_unvani" text,
	"sened_novu" text,
	"fin_kod" text,
	"seriya_no" text,
	"tehsil_seviyyesi" text,
	"ixtisas" text,
	"is_yeri" text,
	"staj_yeri" text,
	"xarici_dil" text,
	"cth_student_number" text,
	"cohort_id" text,
	"enrollment_date" timestamp DEFAULT now(),
	"english_level" text,
	"kurs_id" text,
	"ana_kategoriya" text,
	"tehsil_formati" text,
	"telim_dili" text,
	"baslama_tarixi" text,
	"odenis_novu" text,
	"final_price" integer DEFAULT 0,
	"veli_melumatlari" jsonb,
	"saglik_melumatlari" jsonb,
	"sertifikatlar" jsonb,
	"odenis_detaylari" jsonb,
	"detaylar" jsonb,
	"muqavile_tipi" text,
	"aktif" boolean DEFAULT true,
	"kayit_tarihi" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tutorials" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer,
	"unit_code" text,
	"topic" text,
	"feedback" text,
	"date" timestamp DEFAULT now(),
	"iv_checked" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"ad" text NOT NULL,
	"soyad" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'user',
	"aktif" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "culinary_evidence" ADD CONSTRAINT "culinary_evidence_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internal_verification" ADD CONSTRAINT "internal_verification_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress_tutorials" ADD CONSTRAINT "progress_tutorials_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tutorials" ADD CONSTRAINT "tutorials_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;