// TQTA Kurumsal Eğitimler ve Sunumlar

export interface KurumsalEgitim {
  id: string;
  ad: string;
  slug: string;
  tesvir: string;
  detayliTesvir?: string;
  muddet: string;
  qiymet?: number;
  minimumKatilimci: number;
  maksimumKatilimci?: number;
  format: 'onsite' | 'online' | 'hibrit';
  kategori: string;
  xidmetler: string[];
  aktif: boolean;
  oneCikan: boolean;
  sira: number;
  kapakResmi?: string;
}

export const KURUMSAL_EGITIMLER: KurumsalEgitim[] = [
  {
    id: '1',
    ad: 'Mətbəxdə Komanda Quruculuğu',
    slug: 'metbexde-komanda-quruculugu',
    tesvir: 'Komandanızın ruhunu mətbəxdə kəşf edin',
    detayliTesvir: 'Komandanızla birlikdə dünya mətbəxinin sirlərinə səyahət edin. Professional şeflərimizin rəhbərliyi altında əməkdaşlıq, ünsiyyət və yaradıcılıq bacarıqlarını inkişaf etdirin.',
    muddet: '2-4 saat',
    minimumKatilimci: 10,
    maksimumKatilimci: 20,
    format: 'onsite',
    kategori: 'Komanda Quruculuğu',
    xidmetler: [
      'Professional şeflərin rəhbərliyi',
      'Bütün lazımi məhsul və ləvazimatlar',
      'Önlük və digər mətbəx aksesuarları',
      'Hazırlanan yeməklərin dequstasiyası',
      'Xatirə şəkilləri',
      'Sertifikatlar'
    ],
    aktif: true,
    oneCikan: true,
    sira: 1
  },
  {
    id: '2',
    ad: 'Məhsul Təqdimatları',
    slug: 'mehsul-teqdimatlari',
    tesvir: 'Brendinizin hekayəsini ən təsirli şəkildə anladın',
    detayliTesvir: 'Yeni məhsulunuzu və ya xidmətinizi təqdim etmək üçün canlı və interaktiv bir mətbəx təcrübəsi. Demo mətbəximiz və dequstasiya zalımız brendinizin dadını və hekayəsini ən təsirli şəkildə çatdırmağa imkan verir.',
    muddet: '2-6 saat',
    minimumKatilimci: 10,
    maksimumKatilimci: 80,
    format: 'onsite',
    kategori: 'Təqdimat',
    xidmetler: [
      'Canlı kulinariya nümayişləri',
      'İnteraktiv dequstasiyalar',
      'Məhsul test sessiyaları',
      'Qrup müzakirələri üçün rahat məkan',
      '10-80 nəfərlik zallar'
    ],
    aktif: true,
    oneCikan: true,
    sira: 2
  },
  {
    id: '3',
    ad: 'Peşəkar Təlim Proqramları',
    slug: 'pesekar-telim-proqramlari',
    tesvir: 'Şirkətiniz üçün xüsusi hazırlanmış korporativ təlim proqramları',
    detayliTesvir: 'Restoran, otel və qida sənayesi şirkətləri üçün xüsusi hazırlanmış korporativ təlim proqramları. Komandanızın peşəkar bacarıqlarını artırın və xidmət keyfiyyətini yüksəldin.',
    muddet: 'Müqavilə əsasında',
    minimumKatilimci: 10,
    format: 'hibrit',
    kategori: 'Təlim',
    xidmetler: [
      'Peşəkar təlim proqramları (onsite/online)',
      'Mətbəx komandası hazırlığı',
      'Xidmət standartları təlimi',
      'Franchise sistemi təlimi',
      'Sertifikat',
      'Material və qida'
    ],
    aktif: true,
    oneCikan: true,
    sira: 3
  },
  {
    id: '4',
    ad: 'Xüsusi Tədbirlər',
    slug: 'xususi-tedbirler',
    tesvir: 'Ad günü, yubiley, korporativ bayramlar üçün xüsusi tədbirlər',
    detayliTesvir: 'Xüsusi günlərinizi bizim professional komandamızla birlikdə unutulmaz xatirələrə çevirin. TQTA-nın müasir mətbəx və ferah məkanlarında təşkil edəcəyimiz tədbirlərlə qonaqlarınıza fərqli və əyləncəli bir təcrübə yaşadın.',
    muddet: 'Tədbirə görə',
    minimumKatilimci: 10,
    maksimumKatilimci: 80,
    format: 'onsite',
    kategori: 'Tədbir',
    xidmetler: [
      '10-80 nəfərlik rahat tədbir məkanı',
      'Professional mətbəx avadanlıqları',
      'Təcrübəli şeflər komandası',
      'Fərdi yanaşma və məsləhət',
      'Xüsusi menyu tərtibatı',
      'Peşəkar təşkilatçılıq'
    ],
    aktif: true,
    oneCikan: false,
    sira: 4
  }
];





