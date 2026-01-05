/**
 * Qamifikasiya Sistemi - Rozetlər, XP, Səviyyələr
 * TQTA Təhsil Portalı
 */

// XP Mükafatları
export const XP_REWARDS = {
  VIDEO_IZLEME: 50, // İlk video izləmə
  MODUL_TAMAMLA: 500, // Modul tamamlama
  QUIZ_KEÇ: 200, // Quiz keçmə
  GUNLUK_GIRIS: 10, // Gündəlik giriş
  ARDICIL_7_GUN: 350, // 7 gün ardıcıl giriş
  HEFTE_1CI: 1000, // Həftəlik 1-ci
  ILK_VIDEO: 50, // İlk videonu izlə
  SERH_YAZ: 30, // Şərh yazma (5 şərh = 150 XP)
} as const;

// Səviyyələr
export const LEVELS = [
  {
    seviyye: 1,
    ad: 'Şagird',
    minXP: 0,
    maxXP: 999,
    təsvir: 'Başlanğıc səviyyə',
  },
  {
    seviyye: 2,
    ad: 'Köməkçi',
    minXP: 1000,
    maxXP: 2999,
    təsvir: 'Video izləmə tamamlandı',
  },
  {
    seviyye: 3,
    ad: 'Usta',
    minXP: 3000,
    maxXP: 5999,
    təsvir: 'Modullar tamamlandı',
  },
  {
    seviyye: 4,
    ad: 'Baş Aşpaz',
    minXP: 6000,
    maxXP: Infinity,
    təsvir: 'Sertifikat alındı',
  },
] as const;

// Rozetlər
export const BADGES = [
  {
    kod: 'bicak_ustasi',
    ad: 'Bıçaq Ustası',
    təsvir: 'Bıçaq modulunu bitirdi',
    şərt: 'Bıçaq Texnikaları modulunu tamamla',
    xp: 500,
    rəng: 'gumus',
    ikon: 'sword',
  },
  {
    kod: 'gigiyena_qehremani',
    ad: 'Gigiyena Qəhrəmanı',
    təsvir: 'HACCP testini keçdi',
    şərt: 'HACCP testini 80%+ ilə keç',
    xp: 300,
    rəng: 'yashil',
    ikon: 'shield-check',
  },
  {
    kod: 'suret_cempionu',
    ad: 'Sürət Çempionu',
    təsvir: '24 saat quiz rekordu',
    şərt: 'Quiz-i ən sürətli tamamla',
    xp: 200,
    rəng: 'qizil',
    ikon: 'zap',
  },
  {
    kod: 'komanda_oyuncusu',
    ad: 'Komanda Oyunçusu',
    təsvir: '5 şərh yazdı',
    şərt: '5 şərh yaz',
    xp: 150,
    rəng: 'mavi',
    ikon: 'users',
  },
  {
    kod: 'ilk_addim',
    ad: 'İlk Addım',
    təsvir: 'İlk videonu izlədi',
    şərt: 'İlk videonu izlə',
    xp: 50,
    rəng: 'bronz',
    ikon: 'play',
  },
  {
    kod: 'heftenin_ulduzu',
    ad: 'Həftənin Ulduzu',
    təsvir: 'Həftəlik 1-ci oldu',
    şərt: 'Həftəlik yarışda 1-ci ol',
    xp: 1000,
    rəng: 'platin',
    ikon: 'star',
  },
  {
    kod: 'ardicil_7',
    ad: 'Ardıcıl 7',
    təsvir: '7 gün ardıcıl giriş',
    şərt: '7 gün ardıcıl giriş et',
    xp: 350,
    rəng: 'qirmizi',
    ikon: 'flame',
  },
  {
    kod: 'sous_sehrbazi',
    ad: 'Sous Sehrbazı',
    təsvir: 'Sous modulunu bitirdi',
    şərt: 'Sous Hazırlama modulunu tamamla',
    xp: 500,
    rəng: 'narinci',
    ikon: 'chef-hat',
  },
] as const;

// Rozet rəngləri
export const BADGE_COLORS = {
  gumus: { bg: 'bg-gray-200', text: 'text-gray-800', border: 'border-gray-300' },
  yashil: { bg: 'bg-green-200', text: 'text-green-800', border: 'border-green-300' },
  qizil: { bg: 'bg-yellow-200', text: 'text-yellow-800', border: 'border-yellow-300' },
  mavi: { bg: 'bg-blue-200', text: 'text-blue-800', border: 'border-blue-300' },
  bronz: { bg: 'bg-orange-200', text: 'text-orange-800', border: 'border-orange-300' },
  platin: { bg: 'bg-purple-200', text: 'text-purple-800', border: 'border-purple-300' },
  qirmizi: { bg: 'bg-red-200', text: 'text-red-800', border: 'border-red-300' },
  narinci: { bg: 'bg-orange-300', text: 'text-orange-900', border: 'border-orange-400' },
} as const;

// Liderlik lövhəsi tipləri
export const LEADERBOARD_TYPES = {
  SINIF: 'sinif',
  MEKTEB: 'mekteb',
  HEFTELIK: 'heftelik',
  AYLIQ: 'ayliq',
} as const;







