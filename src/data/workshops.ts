// TQTA Workshop Verileri
// Şubat 2025 - Haziran 2025

export interface Workshop {
  id: string;
  ad: string;
  slug: string;
  tesvir: string;
  detayliTesvir?: string;
  muellim: string;
  muellimFoto?: string;
  muddet: string;
  qiymet: number;
  maksimumKatilimci?: number;
  minimumKatilimci?: number;
  baslamaTarixi?: string;
  bitmeTarixi?: string;
  yer: string;
  format: 'onsite' | 'online' | 'hibrit';
  kategori: string;
  yasAraligi?: string;
  aktif: boolean;
  oneCikan: boolean;
  sira: number;
  kapakResmi?: string;
  workshopMenyusu?: string[];
  texnikalar?: string[];
  xidmetler?: string[];
}

export const WORKSHOPS: Workshop[] = [
  // ŞUBAT 2025
  {
    id: '1',
    ad: 'Gənc Qurme: Suşi Təlimi',
    slug: 'genc-qurme-susi-telimi',
    tesvir: '14-17 yaş aralığındakı gənclər üçün suşi hazırlama sənəti',
    detayliTesvir: 'Mətbəx macərası üçün heç vaxt gec deyil - xüsusən də gənclər üçün!',
    muellim: 'Peşəkar Şef',
    muddet: '3 saat',
    qiymet: 35,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    yasAraligi: '14-17 yaş',
    aktif: true,
    oneCikan: true,
    sira: 1,
    workshopMenyusu: [
      'Suşi düyüsü',
      'Somon maki',
      'Krevet nigiri',
      'California roll',
      'Edamame (nümayiş)'
    ]
  },
  {
    id: '2',
    ad: 'Sevgililər Günü Xüsusi: Sevgilim Menyusu',
    slug: 'sevgililer-gunu-xususi',
    tesvir: 'Sevgililər Günü üçün romantik mətbəx macərası',
    muellim: 'Peşəkar Şef',
    muddet: '3 saat',
    qiymet: 40,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Xüsusi Günlər',
    aktif: true,
    oneCikan: true,
    sira: 2,
    workshopMenyusu: [
      'Mini bruschetta',
      'Pancarlı risotto',
      'Şokolad fondant',
      'Ev hazırlığı meyvəli limonata'
    ]
  },
  {
    id: '3',
    ad: 'Şəkərbura və Paxlava Sirləri',
    slug: 'sekirbura-ve-paxlava-sirleri',
    tesvir: 'Azərbaycan şirniyyatının ən parlaq incilərindən olan şəkərbura və paxlavanın ecazkar dünyası',
    muellim: 'Pastry Chef',
    muddet: '3 saat',
    qiymet: 35,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Şirniyyat',
    aktif: true,
    oneCikan: true,
    sira: 3,
    workshopMenyusu: [
      'Klassik Bakı şəkərburası',
      'Şəki paxlavası (fındıqlı)',
      'Ləzzətli badambura',
      'Şəffaf şəkər şərbəti'
    ]
  },
  {
    id: '4',
    ad: 'Azərbaycan Kabablarının Sirləri',
    slug: 'azerbaycan-kabablarinin-sirleri',
    tesvir: 'Azərbaycan mətbəxinin əvəzolunmaz ləzzəti olan kababların sirlərini öyrənin',
    muellim: 'Peşəkar Aşpaz',
    muddet: '3 saat',
    qiymet: 45,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 4,
    workshopMenyusu: [
      'Lülə kabab',
      'Tikə kabab',
      'Antrikot kabab',
      'Cız-bız',
      'Quyruq kabab'
    ]
  },
  {
    id: '5',
    ad: 'Kiçik Qurme: Pizza və Desert Əyləncəsi',
    slug: 'kicik-qurme-pizza-desert',
    tesvir: '5-9 yaş aralığındakı uşaqlar üçün əyləncəli və dadlı bir menyu',
    muellim: 'Uşaq Şefi',
    muddet: '2 saat',
    qiymet: 25,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Uşaqlar',
    yasAraligi: '5-9 yaş',
    aktif: true,
    oneCikan: false,
    sira: 5,
    workshopMenyusu: [
      'Qarışıq pizza',
      'Ağ şokoladlı parça brauni',
      'Meyvəli şirə'
    ]
  },
  {
    id: '6',
    ad: 'Sadəcə Espresso: İtalyan Notaları',
    slug: 'sadece-espresso-italyan-notalari',
    tesvir: 'Professional avadanlıqlardan istifadə edərək düzgün üsullarla ideal Espresso hazırlamağı öyrənin',
    muellim: 'Usta Barista',
    muddet: '3 saat',
    qiymet: 30,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kafe',
    aktif: true,
    oneCikan: true,
    sira: 6,
    workshopMenyusu: [
      'Həqiqi İtalyan Espressosu',
      'Klassik Cappuccino',
      'Məxməri Caffè Latte',
      'Ənənəvi Flat White'
    ]
  },
  // MART 2025
  {
    id: '7',
    ad: 'Novruz Şirniyyatları',
    slug: 'novruz-sirniyyatlari',
    tesvir: 'Novruz süfrəsinin ən sevimli və ləzzətli şirniyyatlarını bişirməyi öyrənin',
    muellim: 'Pastry Chef',
    muddet: '3 saat',
    qiymet: 35,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Şirniyyat',
    aktif: true,
    oneCikan: true,
    sira: 7,
    workshopMenyusu: [
      'Ənənəvi Novruz şəkərburası',
      'Ləzzətli qoz-fındıq paxlavası',
      'İçi şəkər tozu və darçınla doldurulmuş qoğal',
      'Zərif badambura'
    ]
  },
  {
    id: '8',
    ad: 'Azərbaycan Plovları',
    slug: 'azerbaycan-plovlari',
    tesvir: 'Azərbaycan mətbəxinin şah yeməyi olan plovun sirlərini kəşf edin',
    muellim: 'Peşəkar Aşpaz',
    muddet: '4 saat',
    qiymet: 40,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 8,
    workshopMenyusu: [
      'Şah Plov',
      'Səbzəli Plov',
      'Şirin Plov',
      'Mərci Plov'
    ]
  },
  // NİSAN 2025
  {
    id: '9',
    ad: 'Qutab və Corat Qutabı Hazırlama Sirləri',
    slug: 'qutab-ve-corat-qutabi',
    tesvir: 'Sumqayıtın ən məşhur xəmir yeməklərindən olan qutabın hazırlanma sirlərini öyrənin',
    muellim: 'Peşəkar Aşpaz',
    muddet: '3 saat',
    qiymet: 35,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 9,
    workshopMenyusu: [
      'Corat qutabı',
      'Göyərtili qutab',
      'Pendirli qutab',
      'Ətli qutab'
    ]
  },
  // MAY 2025
  {
    id: '10',
    ad: 'Əlifba Bayramı Xüsusi',
    slug: 'elifba-bayrami-xususi',
    tesvir: 'Əlifba bayramını ən şirin şəkildə qeyd etmək istəyən kiçik məzunlarımız üçün',
    muellim: 'Uşaq Şefi',
    muddet: '2 saat',
    qiymet: 19,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Uşaqlar',
    yasAraligi: '5-8 yaş',
    aktif: true,
    oneCikan: false,
    sira: 10,
    workshopMenyusu: [
      'Hərf şəkilli peçenyelər',
      'Rəngli makaron',
      'Mini sendviçlər',
      'Meyvəli desert'
    ]
  },
  // HAZİRAN 2025
  {
    id: '11',
    ad: 'Yay Sərinliyi: Dondurma və Şərbət',
    slug: 'yay-serinliyi-dondurma-serbet',
    tesvir: 'İsti yay günlərini sərinlədəcək ev şəraitində təbii dondurma və ənənəvi şərbətlərin hazırlanma sirləri',
    muellim: 'Pastry Chef',
    muddet: '3 saat',
    qiymet: 35,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Şirniyyat',
    aktif: true,
    oneCikan: false,
    sira: 11,
    workshopMenyusu: [
      'Fıstıqlı dondurma',
      'Qarpız şərbəti',
      'Nanəli limon şərbəti',
      'Meyvəli buz parçaları'
    ]
  },
  // QƏHVƏ VƏ İÇKİ WORKSHOPLARI
  {
    id: '12',
    ad: 'Latte Art və Qəhvə Sirləri',
    slug: 'latte-art-ve-qehve-sirleri',
    tesvir: 'Qəhvə hazırlama bacarıqlarınızı yeni səviyyəyə qaldırın və ən mürəkkəb Latte Art naxışlarını yaratmağı öyrənin',
    muellim: 'Usta Barista',
    muddet: '3 saat',
    qiymet: 35,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kafe',
    aktif: true,
    oneCikan: true,
    sira: 12
  },
  {
    id: '13',
    ad: 'Türk Qəhvəsi: Tarixdən Süzülən Ləzzət',
    slug: 'turk-qehvesi',
    tesvir: 'Tarixdə xüsusi yeri olan Türk qəhvəsinin 500 illik səyahətinə qoşulun',
    muellim: 'Usta Barista',
    muddet: '3 saat',
    qiymet: 30,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kafe',
    aktif: true,
    oneCikan: false,
    sira: 13
  },
  // MƏTBƏX SİRLƏRİ
  {
    id: '14',
    ad: 'Mətbəx Sirləri: Vaz-ke-çə bil-mə-di-yi-miz və-ris-lə-ri-miz',
    slug: 'metbex-sirleri',
    tesvir: 'Klassik restoran ləzzətlərini TQTA fərqi ilə öyrənin',
    muellim: 'Peşəkar Şeflər',
    muddet: '1 gün',
    qiymet: 45,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 14,
    workshopMenyusu: [
      'Sezar salatası',
      'Göbələkli risotto',
      'Café de Paris souslu bonfile',
      'Crème brûlée'
    ]
  },
  {
    id: '15',
    ad: 'Pidə və Lahmacun Ustaları',
    slug: 'pide-ve-lahmacun-ustalari',
    tesvir: 'Türk mətbəxinin ən sevilen ləzzətləri olan pidə və lahmacunun professional sirlərini öyrənin',
    muellim: 'Peşəkar Aşpaz',
    muddet: '4 saat',
    qiymet: 45,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 15
  },
  {
    id: '16',
    ad: 'İtalyan Pizza Workshop',
    slug: 'italyan-pizza-workshop',
    tesvir: 'İtalyan mətbəxinin əfsanəvi ləzzəti olan pizzanın bütün sirlərini öyrənin',
    muellim: 'Peşəkar Şef',
    muddet: '4 saat',
    qiymet: 40,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 16,
    workshopMenyusu: [
      'Klassik Marqarita pizza',
      'Pepperoni pizza',
      'Dörd pendir pizzası',
      'Tərəvəzli pizza'
    ]
  },
  {
    id: '17',
    ad: 'Burger Ustaları Workshop',
    slug: 'burger-ustalari',
    tesvir: 'Burger kotletindən kartof qızartmasına, soğan halqalarından ev mayonezinə qədər bu möhtəşəm ləzzətlərin sirlərini öyrənin',
    muellim: 'Peşəkar Şef',
    muddet: '4 saat',
    qiymet: 45,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 17
  },
  {
    id: '18',
    ad: 'Xəmir İşləri: Xəngəl & Düşbərədəki Sirlər',
    slug: 'xemir-isleri-xengel-dusbere',
    tesvir: 'Xəngəlin nazik yayılmasından düşbərənin zərif bükmələrinə qədər hər mərhələsində bir sirr',
    muellim: 'Peşəkar Aşpaz',
    muddet: '4 saat',
    qiymet: 40,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: true,
    sira: 18
  },
  {
    id: '19',
    ad: 'Məzə Ustaları Workshop',
    slug: 'meze-ustalari',
    tesvir: 'Həm ənənəvi Azərbaycan qəlyanaltılarını, həm də Türk mətbəxinin məşhur məzələrini hazırlamağı öyrənin',
    muellim: 'Peşəkar Aşpaz',
    muddet: '3 saat',
    qiymet: 35,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Kulinari',
    aktif: true,
    oneCikan: false,
    sira: 19
  },
  // BÖLGƏ MƏTBƏXLƏRİ
  {
    id: '20',
    ad: 'Şəki Mətbəxi Workshop',
    slug: 'seki-metbexi',
    tesvir: 'Şəkinin yüzillik mətbəx sirlərini, pitinin o məxsusi ətirini öyrənin',
    muellim: 'Regional Şef',
    muddet: '3 saat',
    qiymet: 40,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Regional',
    aktif: true,
    oneCikan: true,
    sira: 20
  },
  {
    id: '21',
    ad: 'Lənkəran Mətbəxi Workshop',
    slug: 'lenkeran-metbexi',
    tesvir: 'Cənub bölgəsinin ləzzət sirlərini, ləvənginin hazırlanma incəliklərini öyrənin',
    muellim: 'Regional Şef',
    muddet: '3 saat',
    qiymet: 45,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Regional',
    aktif: true,
    oneCikan: true,
    sira: 21
  },
  {
    id: '22',
    ad: 'Gəncə Mətbəxi Workshop',
    slug: 'gence-metbexi',
    tesvir: 'Qədim şəhərin əsrlik reseptlərini, doğramacın hazırlanma sirlərini öyrənin',
    muellim: 'Regional Şef',
    muddet: '3 saat',
    qiymet: 40,
    yer: 'TQTA Mətbəxi',
    format: 'onsite',
    kategori: 'Regional',
    aktif: true,
    oneCikan: false,
    sira: 22
  }
];





