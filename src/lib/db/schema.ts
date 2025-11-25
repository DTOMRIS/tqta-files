import { pgTable, serial, text, timestamp, boolean, jsonb, integer } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
    id: serial('id').primaryKey(),

    // Şəxsi Məlumatlar
    ad: text('ad').notNull(),
    soyad: text('soyad').notNull(),
    ataAdi: text('ata_adi'),
    email: text('email').notNull(),
    telefon: text('telefon').notNull(),
    dogumTarihi: text('dogum_tarixi'), // YYYY-MM-DD format
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

    // Sistem
    kayitTarihi: timestamp('kayit_tarixi').defaultNow().notNull(),
    aktif: boolean('aktif').default(true).notNull(),

    // Əlavə detaylar
    detaylar: jsonb('detaylar'),
});
