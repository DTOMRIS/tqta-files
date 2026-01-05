// TQTA Masterclass Verileri

export interface Masterclass {
  id: string;
  ad: string;
  slug: string;
  tesvir: string;
  detayliTesvir?: string;
  muellim: string;
  muellimFoto?: string;
  muellimBio?: string;
  muddet: string;
  qiymet: number;
  maksimumKatilimci?: number;
  baslamaTarixi?: string;
  bitmeTarixi?: string;
  yer: string;
  format: 'onsite' | 'online' | 'hibrit';
  kategori: string;
  aylik: boolean;
  aktif: boolean;
  oneCikan: boolean;
  sira: number;
  kapakResmi?: string;
}

export const MASTERCLASSES: Masterclass[] = [
  {
    id: '1',
    ad: 'Mətbəx Sirləri: Vaz-ke-çə bil-mə-di-yi-miz və-ris-lə-ri-miz',
    slug: 'metbex-sirleri-masterclass',
    tesvir: 'Klassik restoran ləzzətlərini TQTA fərqi ilə öyrənin',
    detayliTesvir: 'Qərb və Azərbaycan mətbəxinin klassik ləzzətləri. Professional bıçaq texnikaları, restoranvari plating və təqdimat.',
    muellim: 'Peşəkar Şeflər',
    muellimBio: 'TQTA Professional Komanda',
    muddet: '1 gün',
    qiymet: 45,
    maksimumKatilimci: 20,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aylik: true,
    aktif: true,
    oneCikan: true,
    sira: 1
  },
  {
    id: '2',
    ad: 'Azərbaycanın Bölgə Mətbəxləri',
    slug: 'azerbaycanin-bolge-metbexleri',
    tesvir: 'Şəki, Lənkəran, Gəncə mətbəxlərinin sirləri',
    detayliTesvir: 'Şəki pitisi, Lənkəran ləvəngisi, Gəncə doğramacı - regional mətbəxlərimizin ənənəvi reseptləri',
    muellim: 'Regional Şeflər',
    muellimBio: 'Şəki, Lənkəran, Gəncə mətbəxləri',
    muddet: '3 saat',
    qiymet: 40,
    maksimumKatilimci: 15,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Regional',
    aylik: true,
    aktif: true,
    oneCikan: true,
    sira: 2
  }
];





