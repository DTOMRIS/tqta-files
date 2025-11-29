import { pgTable, serial, text, varchar, boolean, integer, json, jsonb, timestamp } from "drizzle-orm/pg-core";

// 1. KULLANICILAR (Login için)
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    ad: text('ad').notNull(),
    soyad: text('soyad').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role').default('user'),
    aktif: boolean('aktif').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    lastLogin: timestamp('last_login')
});

// 2. KURSLAR
export const kurslar = pgTable('kurslar', {
    id: serial('id').primaryKey(),
    ad: text('ad').notNull(),
    kategori_id: text('kategori_id').notNull(),
    tip: text('tip').default('STANDART'),
    is_active: boolean('is_active').default(true),
    price_azn: integer('price_azn').default(0),
    cost_gbp: integer('cost_gbp').default(0),
    total_hours: integer('total_hours'),
    meta_data: jsonb('meta_data'),
    created_at: timestamp('created_at').defaultNow()
});

// 3. ÖĞRENCİLER (DB ile Birebir Uyumlu)
export const students = pgTable('students', {
    id: serial('id').primaryKey(),

    // Şahsi Məlumatlar
    ad: text('ad'),
    soyad: text('soyad'),
    ataAdi: text('ata_adi'),
    email: text('email'),
    telefon: text('telefon'),
    dogumTarihi: text('dogum_tarihi'), // DB'de var
    dogumTarixi: text('dogum_tarixi'), // DB'de var
    cinsiyet: text('cinsiyet'),
    whatsapp: text('whatsapp'),
    evUnvani: text('ev_unvani'),

    // Təhsil və İş
    tehsilSeviyyesi: text('tehsil_seviyyesi'),
    ixtisas: text('ixtisas'),
    isYeri: text('is_yeri'),
    stajYeri: text('staj_yeri'),
    xariciDil: text('xarici_dil'),

    // Sənəd Məlumatları
    senedNovu: text('sened_novu'),
    finKod: text('fin_kod'),
    seriyaNo: text('seriya_no'),

    // Kurs Seçimi
    kursId: text('kurs_id'),
    anaKategoriya: text('ana_kategoriya'),
    tehsilFormati: text('tehsil_formati'),
    telimDili: text('telim_dili'),
    baslamaTarixi: text('baslama_tarixi'),

    // Ödəniş ve Müqavilə
    odenisNovu: text('odenis_novu'),
    muqavileTipi: text('muqavile_tipi'),
    finalPrice: integer('final_price'),
    odenisDetaylari: jsonb('odenis_detaylari'),

    // CTH & Ekstra
    cthStudentNumber: text('cth_student_number'),
    cohortId: text('cohort_id'),
    englishLevel: text('english_level'),
    educationLevel: text('education_level'),

    // Tarihler
    enrollmentDate: timestamp('enrollment_date'),
    cthRegistrationDate: timestamp('cth_registration_date'),
    kayitTarihi: timestamp('kayit_tarihi'),

    // Sayaçlar
    recipeLogCount: integer('recipe_log_count'),
    progressTutorialsCount: integer('progress_tutorials_count'),
    videoCount: integer('video_count'),
    assignmentCount: integer('assignment_count'),

    // JSONB Alanları
    saglikMelumatlari: jsonb('saglik_melumatlari'),
    veliMelumatlari: jsonb('veli_melumatlari'),
    sertifikatlar: jsonb('sertifikatlar'),
    detaylar: jsonb('detaylar'),

    // Sistem
    aktif: boolean('aktif'),
});

// 4. EĞİTMEN NOTLARI & DİJİTAL KARNE
export const studentNotes = pgTable("student_notes", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    instructor: varchar("instructor", { length: 255 }),
    konu: varchar("konu", { length: 255 }),
    not: text("not"),
    puan: integer("puan"),
    attachmentUrl: text("attachment_url"), // FOTOĞRAF URL'İ
    tarih: timestamp("tarih").defaultNow(),
});

// 5. YOKLAMA (ATTENDANCE)
export const attendance = pgTable("attendance", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    date: varchar("date", { length: 20 }), // Format: YYYY-MM-DD
    status: varchar("status", { length: 20 }).default("PRESENT"), // 'PRESENT', 'ABSENT', 'LATE', 'EXCUSED'
    recordedBy: varchar("recorded_by", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
});

// ========================================
// YENİ TABLO: PROGRESS TUTORIALS
// ========================================
export const progressTutorials = pgTable('progress_tutorials', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    unitCode: text('unit_code').notNull(),
    unitName: text('unit_name'),
    topic: text('topic').notNull(),
    feedback: text('feedback'),
    tutorialDate: timestamp('tutorial_date').notNull(),
    tutorName: text('tutor_name'),
    ivChecked: boolean('iv_checked').default(false),
    ivCheckedBy: text('iv_checked_by'),
    ivCheckedDate: timestamp('iv_checked_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ========================================
// YENİ TABLO: CULINARY EVIDENCE
// ========================================
export const culinaryEvidence = pgTable('culinary_evidence', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    evidenceType: text('evidence_type').notNull(),
    fileName: text('file_name').notNull(),
    filePath: text('file_path').notNull(),
    fileSize: integer('file_size'),
    recipeName: text('recipe_name'),
    description: text('description'),
    uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

// ========================================
// YENİ TABLO: INTERNAL VERIFICATION
// ========================================
export const internalVerification = pgTable('internal_verification', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    assessmentType: text('assessment_type').notNull(),
    unitCode: text('unit_code').notNull(),
    teacherGrade: text('teacher_grade'),
    teacherName: text('teacher_name'),
    teacherDate: timestamp('teacher_date'),
    ivApproved: boolean('iv_approved').default(false),
    ivName: text('iv_name'),
    ivDate: timestamp('iv_date'),
    ivComments: text('iv_comments'),
    submittedToCth: boolean('submitted_to_cth').default(false),
    submissionDate: timestamp('submission_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ========================================
// YENİ TABLO: DMA TABEL
// ========================================
export const dma_tabel = pgTable('dma_tabel', {
    id: serial('id').primaryKey(),
    kurs_id: text('kurs_id'),
    ogrenci_id: integer('ogrenci_id'),
    tarih: text('tarih').notNull(),
    durum: text('durum').notNull(),
});