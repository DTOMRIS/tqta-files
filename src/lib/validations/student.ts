import { z } from 'zod';

/**
 * Öğrenci kayıt formu validation schema
 */
export const studentRegistrationSchema = z.object({
  // Şəxsi Məlumatlar
  ad: z.string().min(2, 'Ad minimum 2 simvol olmalıdır').max(50),
  soyad: z.string().min(2, 'Soyad minimum 2 simvol olmalıdır').max(50),
  ataAdi: z.string().optional(),
  dogumTarixi: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarix formatı: YYYY-MM-DD'),
  cinsiyet: z.enum(['Kişi', 'Qadın', 'Digər']),
  mobilTelefon: z.string().regex(/^\+994\d{9}$/, 'Telefon formatı: +994XXXXXXXXX'),
  whatsappNomresi: z.string().regex(/^\+994\d{9}$/).optional().or(z.literal('')),
  email: z.string().email('Düzgün email ünvanı daxil edin').optional().or(z.literal('')),
  elaqeVasitesi: z.string().optional(),
  evUnvani: z.string().optional(),

  // Təhsil və İş
  tehsilSeviyyesi: z.string().optional(),
  ixtisas: z.string().optional(),
  isYeri: z.string().optional(),
  stajYeri: z.string().optional(),
  xariciDil: z.string().optional(),

  // Vəli Məlumatları
  veliAdSoyad: z.string().optional(),
  veliYaxinliq: z.string().optional(),
  veliElaqe: z.string().optional(),
  veliIsPozisiyasi: z.string().optional(),
  veliIsUnvani: z.string().optional(),
  veliEvTelefonu: z.string().optional(),
  veliSosialStatus: z.string().optional(),
  veliEvUnvani: z.string().optional(),
  sehidYakini: z.boolean().default(false),
  qaziYakini: z.boolean().default(false),

  // Sənəd Məlumatları
  senedNovu: z.string().default('Şəxsiyyət vəsiqəsi'),
  finKod: z.string().regex(/^[A-Z0-9]{7}$/, 'FIN kod 7 simvol olmalıdır').optional().or(z.literal('')),
  seriyaNo: z.string().optional(),

  // Kurs Seçimi
  anaKategoriya: z.string().min(1, 'Ana kateqoriya seçilməlidir'),
  kursId: z.string().min(1, 'Kurs seçilməlidir'),
  tehsilFormati: z.string().optional(),
  telimDili: z.string().optional(),
  baslamaTarixi: z.string().optional(),

  // Sağlıq
  alerjiVarmi: z.string().default('Xeyr'),
  xronikiXestelik: z.string().optional(),
  qanQrupu: z.string().optional(),
  tibbiArayis: z.string().default('Xeyr'),

  // Sertifikatlar
  dmaSertifikati: z.boolean().default(false),
  turkiyeSertifikati: z.boolean().default(false),
  tqtaSertifikati: z.boolean().default(false),
  cthSertifikati: z.boolean().default(false),
  sertifikatDekontu: z.boolean().default(false),

  // Ödəniş
  odenisNovu: z.string().default('Tam ödəniş'),
  ilkOdenis: z.string().optional(),
  endirimKodu: z.string().optional(),
  odenisSecimi: z.string().optional(),
  discountType: z.string().default('Yoxdur'),
  discountPercent: z.number().min(0).max(100).default(0),

  // Müqavilə
  muqavileTipi: z.string().optional(),

  // CTH
  cthStudentNumber: z.string().optional(),
  cohortId: z.string().optional(),
  enrollmentDate: z.string().optional(),
  englishLevel: z.string().optional(),
  educationLevel: z.string().optional(),

  // Şərtlər
  sertleriQebulEtdim: z.boolean().refine((val) => val === true, {
    message: 'Şərtləri qəbul etməlisiniz',
  }),
  melumatIslemesiRazi: z.boolean().refine((val) => val === true, {
    message: 'Məlumat işlənməsi razılığı verilməlidir',
  }),
});

export type StudentRegistrationInput = z.infer<typeof studentRegistrationSchema>;

/**
 * Öğrenci güncelleme schema (daha esnek)
 */
export const studentUpdateSchema = studentRegistrationSchema.partial();

export type StudentUpdateInput = z.infer<typeof studentUpdateSchema>;







