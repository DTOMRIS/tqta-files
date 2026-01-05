/**
 * Azərbaycan Dili və Lokalizasiya Sabitləri
 * TQTA Təhsil Portalı - UTF-8 Encoding
 */

// Tarix formatı: DD.MM.YYYY
export const DATE_FORMAT = 'DD.MM.YYYY';

// Vaxt formatı: HH:MM (24 saat)
export const TIME_FORMAT = 'HH:MM';

// Valyuta: AZN (₼)
export const CURRENCY = {
  code: 'AZN',
  symbol: '₼',
  name: 'Azərbaycan Manatı',
};

// Saat qurşağı: AZT (UTC+4)
export const TIMEZONE = {
  code: 'AZT',
  offset: '+04:00',
  name: 'Azərbaycan Standart Vaxtı',
};

// Xüsusi Azərbaycan hərfləri
export const AZERI_LETTERS = {
  ə: { upper: 'Ə', lower: 'ə', unicode: { upper: 'U+018F', lower: 'U+0259' } },
  ğ: { upper: 'Ğ', lower: 'ğ', unicode: { upper: 'U+011E', lower: 'U+011F' } },
  ı: { upper: 'I', lower: 'ı', unicode: { upper: 'U+0049', lower: 'U+0131' } },
  i: { upper: 'İ', lower: 'i', unicode: { upper: 'U+0130', lower: 'U+0069' } },
  ö: { upper: 'Ö', lower: 'ö', unicode: { upper: 'U+00D6', lower: 'U+00F6' } },
  ş: { upper: 'Ş', lower: 'ş', unicode: { upper: 'U+015E', lower: 'U+015F' } },
  ü: { upper: 'Ü', lower: 'ü', unicode: { upper: 'U+00DC', lower: 'U+00FC' } },
  ç: { upper: 'Ç', lower: 'ç', unicode: { upper: 'U+00C7', lower: 'U+00E7' } },
};

// Locale
export const LOCALE = 'az-AZ';







