/**
 * Rol Əsaslı Təhsil Sistemi - Rol Tərifləri
 * TQTA Təhsil Portalı
 */

export const ROLES = {
  ASPAZ: {
    kod: 'aspaz',
    ad: 'Aşpaz',
    muddetHefte: 12,
    videoSayi: 48,
    modulSayi: 6,
    sertifikatlar: ['TQTA', 'CTH'],
  },
  GARSON: {
    kod: 'garson',
    ad: 'Garson',
    muddetHefte: 8,
    videoSayi: 32,
    modulSayi: 5,
    sertifikatlar: ['TQTA', 'CTH'],
  },
  BARISTA: {
    kod: 'barista',
    ad: 'Barista',
    muddetHefte: 6,
    videoSayi: 24,
    modulSayi: 4,
    sertifikatlar: ['TQTA'],
  },
  QONAQLAMA: {
    kod: 'qonaqlama',
    ad: 'Qonaqlama',
    muddetHefte: 6,
    videoSayi: 24,
    modulSayi: 4,
    sertifikatlar: ['TQTA'],
  },
  IDAREETME: {
    kod: 'idareetme',
    ad: 'İdarəetmə',
    muddetHefte: 16,
    videoSayi: 64,
    modulSayi: 8,
    sertifikatlar: ['TQTA', 'CTH'],
  },
} as const;

// Aşpaz modulları (detallı struktur)
export const ASPAZ_MODULES = [
  {
    ad: 'Mətbəx Gigiyenası və HACCP',
    sira: 1,
    muddetHefte: 2,
    videoSayi: 8,
  },
  {
    ad: 'Bıçaq Texnikaları',
    sira: 2,
    muddetHefte: 2,
    videoSayi: 8,
  },
  {
    ad: 'Bişirmə Üsulları',
    sira: 3,
    muddetHefte: 3,
    videoSayi: 12,
  },
  {
    ad: 'Sous Hazırlama',
    sira: 4,
    muddetHefte: 2,
    videoSayi: 8,
  },
  {
    ad: 'Menyu Mühəndisliyi',
    sira: 5,
    muddetHefte: 2,
    videoSayi: 8,
  },
  {
    ad: 'Final Layihə',
    sira: 6,
    muddetHefte: 1,
    videoSayi: 4,
  },
];







