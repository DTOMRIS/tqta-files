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

// ========================================
// TQTA PORTAL: ROL ƏSASLI TƏHSİL SİSTEMİ
// ========================================

// 1. ROLLAR (Aşpaz, Garson, Barista, Qonaqlama, İdarəetmə)
export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    kod: text('kod').notNull().unique(), // 'aspaz', 'garson', 'barista', 'qonaqlama', 'idareetme'
    adAz: text('ad_az').notNull(), // Azərbaycan dilində ad
    təsvirAz: text('tesvir_az'), // Təsvir
    muddetHefte: integer('muddet_hefte').notNull(), // Həftə sayı
    videoSayi: integer('video_sayi').notNull(), // Ümumi video sayı
    modulSayi: integer('modul_sayi').notNull(), // Modul sayı
    sertifikatlar: jsonb('sertifikatlar'), // ['TQTA', 'CTH'] və s.
    aktiv: boolean('aktiv').default(true),
    sira: integer('sira').default(0), // Göstərmə sırası
    createdAt: timestamp('created_at').defaultNow(),
});

// 2. MODULLAR (Hər rol üçün modullar)
export const modules = pgTable('modules', {
    id: serial('id').primaryKey(),
    rolId: integer('rol_id').references(() => roles.id).notNull(),
    adAz: text('ad_az').notNull(), // Modul adı (AZ)
    təsvirAz: text('tesvir_az'), // Təsvir (AZ)
    sira: integer('sira').notNull(), // Modul sırası
    muddetHefte: integer('muddet_hefte').notNull(), // Həftə sayı
    videoSayi: integer('video_sayi').notNull(), // Video sayı
    aktiv: boolean('aktiv').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});

// 3. DƏRSLƏR/VİDEOLAR
export const lessons = pgTable('lessons', {
    id: serial('id').primaryKey(),
    modulId: integer('modul_id').references(() => modules.id).notNull(),
    adAz: text('ad_az').notNull(), // Dərs adı
    təsvirAz: text('tesvir_az'), // Dərs təsviri
    videoUrl: text('video_url'), // Video URL (Vimeo/Bunny.net)
    videoId: text('video_id'), // Video ID
    videoMuddet: integer('video_muddet'), // Video müddəti (saniyə)
    sira: integer('sira').notNull(), // Dərs sırası
    tip: text('tip').default('video'), // 'video', 'quiz', 'assignment'
    aktiv: boolean('aktiv').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});

// 4. TƏLƏBƏ İRLİLƏYİŞİ (Video izləmə, modul tamamlama)
export const studentProgress = pgTable('student_progress', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
    modulId: integer('modul_id').references(() => modules.id).notNull(),
    rolId: integer('rol_id').references(() => roles.id).notNull(),
    izləndi: boolean('izlendi').default(false),
    izləməVaxtı: integer('izleme_vaxti'), // Saniyə
    tamamlanmaFaizi: integer('tamamlanma_faizi').default(0), // 0-100
    tamamlanmaTarixi: timestamp('tamamlanma_tarixi'),
    createdAt: timestamp('created_at').defaultNow(),
});

// ========================================
// QAMİFİKASİYA SİSTEMİ (GAMIFICATION)
// ========================================

// 5. XP PUNKTLARI
export const xpPoints = pgTable('xp_points', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    xp: integer('xp').notNull().default(0), // Ümumi XP
    seviyye: integer('seviyye').default(1), // 1: Şagird, 2: Köməkçi, 3: Usta, 4: Baş Aşpaz
    seviyyeAdi: text('seviyye_adi').default('Şagird'), // Seviyyə adı
    sonGuncelleme: timestamp('son_guncelleme').defaultNow(),
});

// 6. XP ƏMƏLİYYATLARI (XP əlavə/çıxma tarixçəsi)
export const xpTransactions = pgTable('xp_transactions', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    xp: integer('xp').notNull(), // +500, -100 və s.
    səbəb: text('sebeb').notNull(), // 'video_izleme', 'modul_tamamla', 'rozet_kazan'
    təsvir: text('tesvir'), // 'Bıçaq modulunu bitirdi'
    createdAt: timestamp('created_at').defaultNow(),
});

// 7. ROZETLƏR (BADGES)
export const badges = pgTable('badges', {
    id: serial('id').primaryKey(),
    kod: text('kod').notNull().unique(), // 'bicak_ustasi', 'gigiyena_qehremani'
    adAz: text('ad_az').notNull(), // Rozet adı
    təsvirAz: text('tesvir_az'), // Təsvir
    şərt: text('sert').notNull(), // Şərt mətni
    xp: integer('xp').notNull(), // XP mükafatı
    rəng: text('reng').notNull(), // 'gumus', 'yashil', 'qizil', 'mavi', 'bronz', 'platin', 'qirmizi', 'narinci'
    ikon: text('ikon'), // İkon adı
    aktiv: boolean('aktiv').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});

// 8. TƏLƏBƏ ROZETLƏRİ
export const studentBadges = pgTable('student_badges', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    badgeId: integer('badge_id').references(() => badges.id).notNull(),
    qazanmaTarixi: timestamp('qazanma_tarixi').defaultNow(),
});

// 9. LİDERLİK LÖVHƏSİ
export const leaderboard = pgTable('leaderboard', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    tip: text('tip').notNull(), // 'sinif', 'mekteb', 'heftelik', 'ayliq'
    xp: integer('xp').notNull(),
    sıra: integer('sira').notNull(),
    dövr: text('dovr'), // '2025-01', '2025-W03' və s.
    createdAt: timestamp('created_at').defaultNow(),
});

// ========================================
// MƏN/MƏN DEYİL ANKET SİSTEMİ
// ========================================

// 10. KARYERA ANKETİ (Mən/Mən Deyil)
export const careerAssessment = pgTable('career_assessment', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    cavablar: jsonb('cavablar').notNull(), // [{ sual_id, cavab: 'men' | 'men_deyil', vaxt }]
    optimizm: integer('optimizm').default(0), // 0-100
    liderlik: integer('liderlik').default(0),
    icma: integer('icma').default(0),
    senetkarlik: integer('senetkarlik').default(0),
    mentorluq: integer('mentorluq').default(0),
    umumiNəticə: text('umumi_netice'), // 'aspaz', 'garson' və s.
    muddet: integer('muddet'), // Saniyə (60 saniyə məqsədi)
    tamamlanmaTarixi: timestamp('tamamlanma_tarixi').defaultNow(),
});

// 11. ANKET SUALLARI
export const assessmentQuestions = pgTable('assessment_questions', {
    id: serial('id').primaryKey(),
    şəkilUrl: text('sekil_url').notNull(), // Şəkil URL
    sualMətni: text('sual_metni').notNull(), // Sual mətni (AZ)
    kateqoriya: text('kateqoriya').notNull(), // 'optimizm', 'liderlik', 'icma', 'senetkarlik', 'mentorluq'
    çəki: integer('ceki').default(20), // Faiz (15%, 20%, 25%)
    sira: integer('sira').notNull(),
    aktiv: boolean('aktiv').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});

// ========================================
// TƏLƏBƏ ROL SEÇİMİ
// ========================================

// 12. TƏLƏBƏ ROL MÜNASİBƏTİ
export const studentRoles = pgTable('student_roles', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id).notNull(),
    rolId: integer('rol_id').references(() => roles.id).notNull(),
    başlamaTarixi: timestamp('baslama_tarixi').defaultNow(),
    bitməTarixi: timestamp('bitme_tarixi'),
    status: text('status').default('aktiv'), // 'aktiv', 'tamamlandi', 'dayandirildi'
    tamamlanmaFaizi: integer('tamamlanma_faizi').default(0),
});

// ========================================
// İÇERİK YÖNETİM SİSTEMİ (CMS)
// ========================================

// 13. BLOG YAZILARI
export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    baslik: text('baslik').notNull(), // Başlıq
    slug: text('slug').notNull().unique(), // URL-friendly slug
    ozet: text('ozet'), // Qısa təsvir
    icerik: text('icerik').notNull(), // Tam məzmun (Markdown/HTML)
    kapakResmi: text('kapak_resmi'), // Kapak şəkli URL
    kategori: text('kategori'), // 'xəbər', 'məqalə', 'duyuru'
    yazarId: integer('yazar_id').references(() => users.id),
    yazarAdi: text('yazar_adi'), // Yazar adı (cache)
    goruntulenme: integer('goruntulenme').default(0), // Görüntülənmə sayı
    begeni: integer('begeni').default(0), // Bəyənmə sayı
    yayinlanmaTarixi: timestamp('yayinlanma_tarixi'),
    aktif: boolean('aktif').default(false), // Yayında mı?
    oneCikan: boolean('one_cikan').default(false), // Əsas səhifədə göstəriləcək mi?
    sira: integer('sira').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// 14. WORKSHOPLAR
export const workshops = pgTable('workshops', {
    id: serial('id').primaryKey(),
    ad: text('ad').notNull(), // Workshop adı
    slug: text('slug').notNull().unique(),
    təsvir: text('tesvir'), // Qısa təsvir
    detayliTəsvir: text('detayli_tesvir'), // Tam məzmun
    kapakResmi: text('kapak_resmi'),
    muellim: text('muellim'), // Müəllim adı
    muellimFoto: text('muellim_foto'),
    muddet: text('muddet'), // '2 saat', '1 gün' və s.
    qiymet: integer('qiymet'), // AZN
    maksimumKatilimci: integer('maksimum_katilimci'),
    minimumKatilimci: integer('minimum_katilimci').default(5),
    baslamaTarixi: timestamp('baslama_tarixi'),
    bitmeTarixi: timestamp('bitme_tarixi'),
    yer: text('yer'), // 'TQTA Mətbəxi', 'Online'
    format: text('format').default('onsite'), // 'onsite', 'online', 'hibrit'
    kategori: text('kategori'), // 'aşpazlıq', 'barista', 'pastry'
    aktif: boolean('aktif').default(true),
    oneCikan: boolean('one_cikan').default(false),
    sira: integer('sira').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// 15. MASTERCLASSLAR
export const masterclasses = pgTable('masterclasses', {
    id: serial('id').primaryKey(),
    ad: text('ad').notNull(),
    slug: text('slug').notNull().unique(),
    təsvir: text('tesvir'),
    detayliTəsvir: text('detayli_tesvir'),
    kapakResmi: text('kapak_resmi'),
    muellim: text('muellim'),
    muellimFoto: text('muellim_foto'),
    muellimBio: text('muellim_bio'), // Müəllim bioqrafiyası
    muddet: text('muddet'),
    qiymet: integer('qiymet'),
    maksimumKatilimci: integer('maksimum_katilimci'),
    baslamaTarixi: timestamp('baslama_tarixi'),
    bitmeTarixi: timestamp('bitme_tarixi'),
    yer: text('yer'),
    format: text('format').default('onsite'),
    kategori: text('kategori'),
    aylik: boolean('aylik').default(false), // Aylıq masterclass mı?
    aktif: boolean('aktif').default(true),
    oneCikan: boolean('one_cikan').default(false), // Ana səhifədə göstəriləcək mi?
    sira: integer('sira').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// 16. KURUMSAL EĞİTİMLER
export const kurumsalEgitimler = pgTable('kurumsal_egitimler', {
    id: serial('id').primaryKey(),
    ad: text('ad').notNull(),
    slug: text('slug').notNull().unique(),
    təsvir: text('tesvir'),
    detayliTəsvir: text('detayli_tesvir'),
    kapakResmi: text('kapak_resmi'),
    muddet: text('muddet'),
    qiymet: integer('qiymet'), // Şirkət üçün qiymət
    minimumKatilimci: integer('minimum_katilimci').default(10),
    maksimumKatilimci: integer('maksimum_katilimci'),
    format: text('format').default('onsite'), // 'onsite', 'online', 'hibrit'
    kategori: text('kategori'), // 'aşpazlıq', 'qonaq_xidməti', 'idarəetmə'
    xidmetler: jsonb('xidmetler'), // ['Sertifikat', 'Material', 'Qida'] və s.
    aktif: boolean('aktif').default(true),
    oneCikan: boolean('one_cikan').default(false),
    sira: integer('sira').default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// ========================================
// CONTEXT GRAPH SYSTEM (Event Clock)
// ========================================

// 17. CONTEXT EVENTS (Decision Traces)
export const contextEvents = pgTable('context_events', {
    id: serial('id').primaryKey(),
    timestamp: timestamp('timestamp').defaultNow().notNull(),
    entityType: text('entity_type').notNull(), // 'student', 'application', 'question', 'lesson', 'assessment', 'lead'
    entityId: text('entity_id').notNull(),
    eventType: text('event_type').notNull(), // 'decision', 'observation', 'action', 'reasoning', 'lead_captured', 'lead_contacted', 'lead_converted'
    actor: text('actor').notNull(), // user_id or 'system'
    action: text('action').notNull(), // what happened
    reasoning: text('reasoning'), // why it happened (THE KEY PART!)
    context: jsonb('context'), // additional context
    outcome: text('outcome'), // what resulted
    trajectory: jsonb('trajectory'), // path through state space (array of steps)
    leadId: integer('lead_id').references(() => leads.id), // Lead tracking için (nullable)
    createdAt: timestamp('created_at').defaultNow(),
});

// 18. AGENT TRAJECTORIES (Informed Walks)
export const agentTrajectories = pgTable('agent_trajectories', {
    id: serial('id').primaryKey(),
    task: text('task').notNull(), // what the agent was doing
    startTime: timestamp('start_time').defaultNow().notNull(),
    endTime: timestamp('end_time'),
    path: jsonb('path').notNull(), // array of trajectory steps
    entitiesTouched: jsonb('entities_touched'), // which entities were accessed
    decisions: jsonb('decisions'), // decisions made during trajectory
    outcome: text('outcome'),
    createdAt: timestamp('created_at').defaultNow(),
});

// 19. QUESTIONS & ANSWERS (Soru-Cevap Sistemi)
export const questions = pgTable('questions', {
    id: serial('id').primaryKey(),
    studentId: integer('student_id').references(() => students.id),
    sual: text('sual').notNull(),
    cavab: text('cavab'),
    kateqoriya: text('kateqoriya'), // 'kurs', 'qeydiyyat', 'odeme', 'cth', 'umumi'
    status: text('status').default('gözləyir'), // 'gözləyir', 'cavablandırıldı', 'bağlandı'
    cavabVerən: text('cavab_veren'), // user_id
    cavabTarixi: timestamp('cavab_tarixi'),
    createdAt: timestamp('created_at').defaultNow(),
});

// ========================================
// LEAD CAPTURE & AI ASSISTANT SYSTEM
// ========================================

// 20. LEADS (Potansiyel Müşteriler)
export const leads = pgTable('leads', {
    id: serial('id').primaryKey(),
    adSoyad: text('ad_soyad').notNull(),
    telefon: text('telefon').notNull(),
    email: text('email').notNull(),
    ilgilenilenProgram: text('ilgilenilen_program'), // null olabilir
    mesaj: text('mesaj'),
    kaynak: text('kaynak').default('landing_page'), // 'landing_page', 'ai_chat', 'program_detail', 'workshop_detail'
    durum: text('durum').default('yeni'), // 'yeni', 'arandı', 'kayıt_oldu', 'iptal', 'nəticəsiz'
    notlar: text('notlar'),
    atananPersonel: integer('atanan_personel').references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// 21. AI CHAT HISTORY (Beledçiniz Sohbet Geçmişi)
export const aiChatHistory = pgTable('ai_chat_history', {
    id: serial('id').primaryKey(),
    sessionId: text('session_id').notNull(), // UUID - her kullanıcı için unique
    userMessage: text('user_message').notNull(),
    aiResponse: text('ai_response').notNull(),
    context: jsonb('context'), // RAG'den gelen belgeler (programs, workshops, etc.)
    leadId: integer('lead_id').references(() => leads.id), // Eğer lead'e dönüştüyse
    createdAt: timestamp('created_at').defaultNow(),
});

// Context Events'e leadId field'ı ekle (mevcut tabloyu güncelle)
// Not: Bu migration'da yapılacak, şimdilik contextEvents tablosuna leadId eklenmeyecek
// Çünkü mevcut yapıyı bozmamak için ayrı bir migration dosyası oluşturulacak
// Notes tablosu
export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  courseId: integer('course_id').references(() => kurslar.id),
  lessonId: integer('lesson_id').references(() => lessons.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});