/**
 * Mən/Mən Deyil Anket Sistemi
 * Escoffier modelindən ilham alınaraq
 * 60 saniyəlik vizual anket
 */

// Qiymətləndirmə kateqoriyaları
export const ASSESSMENT_CATEGORIES = {
  OPTIMIZM: {
    kod: 'optimizm',
    ad: 'Optimizm',
    çəki: 15,
    təsvir: 'Gələcəyə və dəyişikliyə münasibət',
  },
  LIDERLIK: {
    kod: 'liderlik',
    ad: 'Liderlik',
    çəki: 20,
    təsvir: 'Komanda idarəetmə marağı',
  },
  ICMA: {
    kod: 'icma',
    ad: 'İcma',
    çəki: 15,
    təsvir: 'Sosial mühit əhəmiyyəti',
  },
  SENETKARLIQ: {
    kod: 'senetkarlik',
    ad: 'Sənətkarlıq',
    çəki: 25,
    təsvir: 'Kulinariya ustalığına dəyər',
  },
  MENTORLUQ: {
    kod: 'mentorluq',
    ad: 'Mentorluq',
    çəki: 25,
    təsvir: 'Təhsil və rəhbərlik istəyi',
  },
} as const;

// Nümunə suallar (şəkil təsviri + sual mətni)
export const SAMPLE_QUESTIONS = [
  {
    şəkilTəsviri: 'Aşpaz komandası birlikdə işləyir',
    sualMətni: 'Komanda ilə işləmək mənə enerji verir',
    kateqoriya: 'icma',
  },
  {
    şəkilTəsviri: 'Tək başına mutfaqda çalışan şəxs',
    sualMətni: 'Tək işləməyi üstün tuturam',
    kateqoriya: 'senetkarlik',
  },
  {
    şəkilTəsviri: 'Yeni resept sınayan şəxs',
    sualMətni: 'Yeni şeylər sınamağı sevirəm',
    kateqoriya: 'optimizm',
  },
  {
    şəkilTəsviri: 'Yorğun görünən işçi',
    sualMətni: 'Hazırki işim məni yorur',
    kateqoriya: 'optimizm',
  },
  {
    şəkilTəsviri: 'Mentor tələbəyə öyrədir',
    sualMətni: 'Başqalarına öyrətmək xoşuma gəlir',
    kateqoriya: 'mentorluq',
  },
  {
    şəkilTəsviri: 'Mükafat alan aşpaz',
    sualMətni: 'Uğur qazanmaq mənim üçün vacibdir',
    kateqoriya: 'liderlik',
  },
  {
    şəkilTəsviri: 'Çətin vəziyyətdə olan şəxs',
    sualMətni: 'Çətinliklərdən qorxmuram',
    kateqoriya: 'optimizm',
  },
  {
    şəkilTəsviri: 'Yaradıcı yemək təqdimatı',
    sualMətni: 'Yaradıcılıq mənim güclü tərəfimdir',
    kateqoriya: 'senetkarlik',
  },
] as const;

// Anket parametrləri
export const ASSESSMENT_CONFIG = {
  MUDDET_SANIYE: 60, // 60 saniyə məqsədi
  MIN_SUAL_SAYI: 8, // Minimum sual sayı
  MAX_SUAL_SAYI: 12, // Maksimum sual sayı
} as const;







