import { pgTable, serial, text, timestamp, boolean, jsonb, integer } from 'drizzle-orm/pg-core';

// ========================================
// İSTİFADƏÇİLƏR TABLOSU (Authentication)
// ========================================
export const users = pgTable('users', {
    id: serial('id').primaryKey(),

    // Login məlumatları
    email: text('email').notNull().unique(),
    password: text('password').notNull(), // Hashed (bcrypt)

    // Şəxsi məlumatlar
    ad: text('ad').notNull(),
    soyad: text('soyad').notNull(),

    // Rol: 'admin' və ya 'teacher'
    role: text('role').notNull().default('teacher'),

    // Status
    aktif: boolean('aktif').default(true).notNull(),

    // Tarixlər
    createdAt: timestamp('created_at').defaultNow().notNull(),
    lastLogin: timestamp('last_login'),
});

// ========================================
// TƏLƏBƏLƏR TABLOSU
// ========================================

export const students = pgTable('students', {
    id: serial('id').primaryKey(),

    // Şəxsi Məlumatlar
    ad: text('ad').notNull(),
    soyad: text('soyad').notNull(),
    ataAdi: text('ata_adi'),
    email: text('email').notNull(),
    telefon: text('telefon').notNull(),
    dogumTarixi: text('dogum_tarixi'), // YYYY-MM-DD format
    cinsiyet: text('cinsiyet'),
    whatsapp: text('whatsapp'),
    evUnvani: text('ev_unvani'),

    // Təhsil və İş
    tehsilSeviyyesi: text('tehsil_seviyyesi'),
    ixtisas: text('ixtisas'),
    isYeri: text('is_yeri'),
    stajYeri: text('staj_yeri'),
    xariciDil: text('xarici_dil'),

    // Vəli Məlumatları (JSON)
    veliMelumatlari: jsonb('veli_melumatlari'),

    // Sənəd
    senedNovu: text('sened_novu'),
    finKod: text('fin_kod'),
    seriyaNo: text('seriya_no'),

    // Kurs
    kursId: text('kurs_id').notNull(),
    anaKategoriya: text('ana_kategoriya'),
    tehsilFormati: text('tehsil_formati'),
    telimDili: text('telim_dili'),
    baslamaTarixi: text('baslama_tarixi'),

    // Sağlıq
    saglikMelumatlari: jsonb('saglik_melumatlari'),

    // Sertifikatlar
    sertifikatlar: jsonb('sertifikatlar'),

    // Ödəniş
    odenisNovu: text('odenis_novu'),
    finalPrice: integer('final_price'),
    odenisDetaylari: jsonb('odenis_detaylari'),

    // Müqavilə
    muqavileTipi: text('muqavile_tipi'),

    // ========================================
    // CTH ÖZEL ALANLARI (Accreditation)
    // ========================================

    // CTH Student Number - Ömürlük numara
    cthStudentNumber: text('cth_student_number'),

    // Cohort ID - Hangi dönem (March 2025, September 2025 vb.)
    cohortId: text('cohort_id'),

    // Enrollment Date - Dərsə başlama tarixi (2 həftə qaydası üçün KRİTİK!)
    enrollmentDate: timestamp('enrollment_date'),

    // CTH Registration Date - CTH-ə qeydiyyat tarixi
    cthRegistrationDate: timestamp('cth_registration_date'),

    // ADMISSION REQUIREMENTS (Qəbul Şərtləri)
    // İngilis dili səviyyəsi (IELTS 5.5, 6.0 və ya A2, B1, B2, C1)
    englishLevel: text('english_level'),

    // Təhsil səviyyəsi (Lise, Üniversite vb.)
    educationLevel: text('education_level'),

    // EVIDENCE TRACKING (Sənəd İzləmə)
    // Neçə tarif yükləndi? (Recipe Log Count)
    recipeLogCount: integer('recipe_log_count').default(0),

    // Neçə ilərləmə görüşməsi edildi? (Progress Tutorials)
    progressTutorialsCount: integer('progress_tutorials_count').default(0),

    // Video sayısı (Praktik sınav videoları)
    videoCount: integer('video_count').default(0),

    // Assignment sayısı
    assignmentCount: integer('assignment_count').default(0),

    // Sistem
    kayitTarihi: timestamp('kayit_tarihi').defaultNow().notNull(),
    aktif: boolean('aktif').default(true).notNull(),

    // Əlavə detaylar
    detaylar: jsonb('detaylar'),
});

// ========================================
// YENİ TABLO: PROGRESS TUTORIALS
// ========================================
// CTH tələbi: Hər assignment üçün 2-3 fərdi görüşmə
export const progressTutorials = pgTable('progress_tutorials', {
    id: serial('id').primaryKey(),

    // Hansı tələbə?
    studentId: integer('student_id')
        .references(() => students.id)
        .notNull(),

    // Hansı unit/modul üçün? (Məs: "CTH Level 2 Cookery")
    unitCode: text('unit_code').notNull(),
    unitName: text('unit_name'),

    // Görüşmə mövzusu
    topic: text('topic').notNull(),

    // Müəllim rəyi/feedback
    feedback: text('feedback'),

    // Görüşmə tarixi
    tutorialDate: timestamp('tutorial_date').notNull(),

    // Müəllim adı
    tutorName: text('tutor_name'),

    // Internal Verifier (İç Denetçi) gördü mü?
    ivChecked: boolean('iv_checked').default(false),
    ivCheckedBy: text('iv_checked_by'),
    ivCheckedDate: timestamp('iv_checked_date'),

    // Yaradılma tarixi
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ========================================
// YENİ TABLO: CULINARY EVIDENCE (Mutfak Sənədləri)
// ========================================
// Recipe logs, videos, assignments üçün
export const culinaryEvidence = pgTable('culinary_evidence', {
    id: serial('id').primaryKey(),

    studentId: integer('student_id')
        .references(() => students.id)
        .notNull(),

    // Sənəd tipi (recipe_log, video, assignment, time_plan)
    evidenceType: text('evidence_type').notNull(),

    // Fayl adı (CTH formatında: 12345-RecipeLog-001.pdf)
    fileName: text('file_name').notNull(),

    // Fayl yolu (server-də harada saxlanır)
    filePath: text('file_path').notNull(),

    // Fayl ölçüsü (bytes)
    fileSize: integer('file_size'),

    // Tarif adı (yalnız recipe_log üçün)
    recipeName: text('recipe_name'),

    // Təsvir
    description: text('description'),

    // Yüklənmə tarixi
    uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

// ========================================
// YENİ TABLO: INTERNAL VERIFICATION (İç Doğrulama)
// ========================================
// Notlar CTH-ə göndərilməzdən əvvəl IV tərəfindən yoxlanmalıdır
export const internalVerification = pgTable('internal_verification', {
    id: serial('id').primaryKey(),

    studentId: integer('student_id')
        .references(() => students.id)
        .notNull(),

    // Hansı assessment?
    assessmentType: text('assessment_type').notNull(), // assignment, exam, practical
    unitCode: text('unit_code').notNull(),

    // Müəllim tərəfindən verilən qiymət
    teacherGrade: text('teacher_grade'), // Pass, Merit, Distinction
    teacherName: text('teacher_name'),
    teacherDate: timestamp('teacher_date'),

    // IV tərəfindən təsdiqləndi mi?
    ivApproved: boolean('iv_approved').default(false),
    ivName: text('iv_name'),
    ivDate: timestamp('iv_date'),
    ivComments: text('iv_comments'),

    // CTH-ə göndərildi mi?
    submittedToCth: boolean('submitted_to_cth').default(false),
    submissionDate: timestamp('submission_date'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ========================================
// YENİ TABLO: KURSLAR
// ========================================
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
