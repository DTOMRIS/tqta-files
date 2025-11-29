import { pgTable, serial, text, boolean, timestamp, jsonb, integer, varchar } from 'drizzle-orm/pg-core';

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

// ========================================
// TƏLƏBƏLƏR TABLOSU (Tam TQTA Formuna Uyğun)
// ========================================
export const students = pgTable('students', {
    id: serial('id').primaryKey(),

    // Şəxsi
    ad: text('ad').notNull(),
    soyad: text('soyad').notNull(),
    ataAdi: text('ata_adi'),
    email: text('email'),
    telefon: text('telefon'),
    whatsapp: text('whatsapp'),
    dogumTarihi: text('dogum_tarihi'), // YYYY-MM-DD
    cinsiyet: text('cinsiyet'), // Kisi/Qadin
    evUnvani: text('ev_unvani'),

    // Kimlik
    senedNovu: text('sened_novu'),
    finKod: text('fin_kod'),
    seriyaNo: text('seriya_no'),

    // Təhsil/İş
    tehsilSeviyyesi: text('tehsil_seviyyesi'),
    ixtisas: text('ixtisas'),
    isYeri: text('is_yeri'),
    stajYeri: text('staj_yeri'),
    xariciDil: text('xarici_dil'),

    // CTH & Kurs
    cthStudentNumber: text('cth_student_number'),
    cohortId: text('cohort_id'),
    enrollmentDate: timestamp('enrollment_date').defaultNow(),
    englishLevel: text('english_level'),

    // Kurs Detayları
    kursId: text('kurs_id'),
    anaKategoriya: text('ana_kategoriya'),
    tehsilFormati: text('tehsil_formati'), // Eyni/Online
    telimDili: text('telim_dili'),
    baslamaTarixi: text('baslama_tarixi'),

    // Ödəniş
    odenisNovu: text('odenis_novu'), // Hisseli/Tam
    finalPrice: integer('final_price').default(0),

    // JSONB Columns (Kompleks Verilər üçün)
    veliMelumatlari: jsonb('veli_melumatlari'), // Valideyn info
    saglikMelumatlari: jsonb('saglik_melumatlari'), // Qan qrupu, xestelik
    sertifikatlar: jsonb('sertifikatlar'), // Hansi sertifikatlar istenilir
    odenisDetaylari: jsonb('odenis_detaylari'), // Endirim, taksit planı
    detaylar: jsonb('detaylar'), // Digər meta datalar
});

// ========================================
// KURSLAR TABLOSU
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
// YENİ TABLO: DMA TABEL
// ========================================
export const dma_tabel = pgTable('dma_tabel', {
    id: serial('id').primaryKey(),

    // Şəxsi
    ad: text('ad').notNull(),
    soyad: text('soyad').notNull(),
    ataAdi: text('ata_adi'),
    email: text('email'),
    telefon: text('telefon'),
    whatsapp: text('whatsapp'),
    dogumTarihi: text('dogum_tarihi'), // YYYY-MM-DD
    cinsiyet: text('cinsiyet'), // Kisi/Qadin
    evUnvani: text('ev_unvani'),

    // Kimlik
    senedNovu: text('sened_novu'),
    finKod: text('fin_kod'),
    seriyaNo: text('seriya_no'),

    // Təhsil/İş
    tehsilSeviyyesi: text('tehsil_seviyyesi'),
    ixtisas: text('ixtisas'),
    isYeri: text('is_yeri'),
    stajYeri: text('staj_yeri'),
    xariciDil: text('xarici_dil'),

    // CTH & Kurs
    cthStudentNumber: text('cth_student_number'),
    cohortId: text('cohort_id'),
    enrollmentDate: timestamp('enrollment_date').defaultNow(),
    englishLevel: text('english_level'),

    // Kurs Detayları
    kursId: text('kurs_id'),
    anaKategoriya: text('ana_kategoriya'),
    tehsilFormati: text('tehsil_formati'), // Eyni/Online
    telimDili: text('telim_dili'),
    baslamaTarixi: text('baslama_tarixi'),

    // Ödəniş
    odenisNovu: text('odenis_novu'), // Hisseli/Tam
    finalPrice: integer('final_price').default(0),

    // JSONB Columns (Kompleks Verilər üçün)
    veliMelumatlari: jsonb('veli_melumatlari'), // Valideyn info
    saglikMelumatlari: jsonb('saglik_melumatlari'), // Qan qrupu, xestelik
    sertifikatlar: jsonb('sertifikatlar'), // Hansi sertifikatlar istenilir
    odenisDetaylari: jsonb('odenis_detaylari'), // Endirim, taksit planı
    detaylar: jsonb('detaylar'), // Digər meta datalar
});

// ========================================
// KURSLAR TABLOSU
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
// YENİ TABLO: DMA TABEL
// ========================================
export const dma_tabel = pgTable('dma_tabel', {
    id: serial('id').primaryKey(),
    kurs_id: text('kurs_id'),
    ogrenci_id: integer('ogrenci_id'),
    tarih: text('tarih').notNull(),
    durum: text('durum').notNull(),
});

export const studentNotes = pgTable("student_notes", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id), // Hangi öğrenci?
    instructor: varchar("instructor", { length: 255 }), // Hangi hoca? (Şimdilik isim gireceğiz)
    konu: varchar("konu", { length: 255 }), // Ders konusu (Bıçak kullanımı vb.)
    not: text("not"), // Hoca'nın yazdığı uzun yorum
    puan: integer("puan"), // 1-100 arası puan (Opsiyonel)
    tarih: timestamp("tarih").defaultNow(), // Ne zaman girildi?
    attachmentUrl: text("attachment_url"), // Fotoğraf/Dosya URL
});