
import { Course, Module, BlogPost, AgentTrajectory, AssessmentQuestion, StudentProfile } from './types';

export const NAVY_BLUE = 'bg-[#0A192F]';
export const TEAL = 'text-[#0097A7]';
export const TEAL_BG = 'bg-[#0097A7]';
export const GOLD = 'text-[#C5A022]';
export const GOLD_BG = 'bg-[#C5A022]';

// ========== TƏHSİL PROQRAMLARI ==========
export const COURSES: (Course & { category: string; tip: string; syllabus?: string })[] = [
  // --- KULİNARİYA ---
  {
    id: 'cth-cookery-l2',
    category: 'Kulinariya',
    tip: 'CTH',
    title: 'Professional Cookery L2 CTH',
    level: 'Level 2 Award',
    duration: '20 gün / 80 saat',
    description: 'Beynəlxalq CTH sertifikatlı aşpazlıq. Qida təhlükəsizliyi, bıçaq texnikaları, əsas pişirmə metodları.',
    certification: 'CTH Level 2',
    image: '/brand/cth-level-4-diploma-professional-culinary-arts-cover-img.jpg',
    price: 1200,
    syllabus: '/syllabi/cth-cookery-l2.pdf'
  },
  {
    id: 'dma-aspaz-l3',
    category: 'Kulinariya',
    tip: 'DMA',
    title: 'Peşəkar Aşpazlıq L3 DMA',
    level: 'Pulsuz - DMA',
    duration: '49 gün / 292 saat',
    description: 'Dövlət dəstəkli pulsuz proqram. Türk mətbəxi, dünya mətbəxi, şirniyyat bazası, soyuq mətbəx.',
    certification: 'DMA Sertifikat',
    image: '/brand/aspazlık dma 3.png',
    price: 0,
    syllabus: '/syllabi/aşpazdma 3.pdf'
  },
  {
    id: 'cth-barista-l2',
    category: 'Kulinariya',
    tip: 'CTH',
    title: 'Barista Skills L2 CTH',
    level: 'Level 2 Award',
    duration: '10 gün / 25 saat',
    description: 'Espresso hazırlığı, latte art, qəhvə növləri, brewing metodları, müştəri xidməti.',
    certification: 'CTH Level 2',
    image: '/brand/coffee-test.jpg',
    price: 1000,
    syllabus: '/syllabi/cth-barista-l2.pdf'
  },
  {
    id: 'dma-barista',
    category: 'Kulinariya',
    tip: 'DMA',
    title: 'Professional Barista DMA',
    level: 'Pulsuz - DMA',
    duration: '30 gün / 154 saat',
    description: 'Dövlət dəstəkli pulsuz proqram. Espresso makinası, qəhvə kimyası, kafe idarəetməsi.',
    certification: 'DMA Sertifikat',
    image: '/brand/barista telimi.png',
    price: 0,
    syllabus: '/syllabi/barista dma .pdf'
  },
  {
    id: 'std-barmen',
    category: 'Kulinariya',
    tip: 'STANDART',
    title: 'Professional Barmen',
    level: 'Professional',
    duration: '30 gün / 157 saat',
    description: 'Klassik və müasir kokteyllər, şərab bilikləri, bar avadanlıqları, müştəri psixologiyası.',
    certification: 'TQTA Sertifikat',
    image: '/brand/male-bartender-pouring-wine-for-customer.jpg',
    price: 900,
    syllabus: '/syllabi/barmen.pdf'
  },
  {
    id: 'dma-ofisiant',
    category: 'Kulinariya',
    tip: 'DMA',
    title: 'Restoran Ofisiantı DMA',
    level: 'Pulsuz - DMA',
    duration: '30 gün / 180 saat',
    description: 'Masa xidməti, menyu bilikləri, şərab servisi, VIP qonaq xidməti.',
    certification: 'DMA Sertifikat',
    image: '/brand/wine-service-for-customers-at-luxury-restaurant.jpg',
    price: 0,
    syllabus: '/syllabi/ofisiant .pdf'
  },
  {
    id: 'cth-foh-l2',
    category: 'Kulinariya',
    tip: 'CTH',
    title: 'Front of House L2 CTH',
    level: 'Level 2 Certificate',
    duration: '30 gün / 155 saat',
    description: 'Restoran ön sıra xidməti, rezervasiya, müştəri münasibətləri, şikayət idarəetməsi.',
    certification: 'CTH Level 2',
    image: '/brand/wine-service-for-customers-at-luxury-restaurant.jpg',
    price: 1000,
    syllabus: '/syllabi/cth-foh-l2.pdf'
  },
  {
    id: 'std-qennadci',
    category: 'Kulinariya',
    tip: 'STANDART',
    title: 'Qənnadçı-Şirniyyatçı',
    level: 'Professional',
    duration: '30 gün / 120 saat',
    description: 'Tort dekorasiyası, şokolad işləmə, Fransız şirniyyatları, çörək növləri.',
    certification: 'TQTA Sertifikat',
    image: '/brand/cth-level-3-diploma-confectionery-patisserie-cover-image.jpg',
    price: 1200,
    syllabus: '/syllabi/Qennadci Sirniyyatci .pdf'
  },
  
  // --- TURİZM ---
  {
    id: 'dma-qeydiyyatci',
    category: 'Turizm',
    tip: 'DMA',
    title: 'Otel Qeydiyyatçısı DMA',
    level: 'Pulsuz - DMA',
    duration: '29 gün / 170 saat',
    description: 'Front office əməliyyatları, rezervasiya sistemləri, check-in/out prosedurları.',
    certification: 'DMA Sertifikat',
    image: '/brand/happy-young-couple-checking-in-to-luxury-hotel.jpg',
    price: 0,
    syllabus: '/syllabi/mehmanxana qaydiyatçası.pdf'
  },
  {
    id: 'dma-qapici',
    category: 'Turizm',
    tip: 'DMA',
    title: 'Mehmanxana Qapıçısı DMA',
    level: 'Pulsuz - DMA',
    duration: '20 gün / 107 saat',
    description: 'Belman xidməti, qonaq qarşılama, bağaj idarəetməsi, VIP xidmət.',
    certification: 'DMA Sertifikat',
    image: '/brand/belman dma.png',
    price: 0,
    syllabus: '/syllabi/Mehmanxana qapıçısı (Belman).pdf'
  },
  {
    id: 'dma-xadime',
    category: 'Turizm',
    tip: 'DMA',
    title: 'Otel Xadiməsi DMA',
    level: 'Pulsuz - DMA',
    duration: '29 gün / 164 saat',
    description: 'Otaq təmizliyi, çarşab dəyişimi, gigiyena standartları, xüsusi istəklər.',
    certification: 'DMA Sertifikat',
    image: '/brand/housekeeping dma.png',
    price: 0,
    syllabus: '/syllabi/Otel xadiməsi (təmizlik işləri).pdf'
  },
  {
    id: 'dma-turoperator',
    category: 'Turizm',
    tip: 'DMA',
    title: 'Turoperator və Turagent DMA',
    level: 'Pulsuz - DMA',
    duration: '30 gün / 168 saat',
    description: 'Tur paketləri, bilet satışı, viza prosesləri, CRM sistemləri.',
    certification: 'DMA Sertifikat',
    image: '/brand/tur agent.png',
    price: 0,
    syllabus: '/syllabi/Turizm Agenti pdf.pdf'
  },
  {
    id: 'dma-konfrans',
    category: 'Turizm',
    tip: 'DMA',
    title: 'Konfrans Təşkilatçısı DMA',
    level: 'Pulsuz - DMA',
    duration: '27 gün / 129 saat',
    description: 'Event planlaşdırma, texniki koordinasiya, sponsor münasibətləri.',
    certification: 'DMA Sertifikat',
    image: '/brand/konferasn beledcisi.png',
    price: 0,
    syllabus: '/syllabi/Konfrans və tədbir təşkilatçısı.pdf'
  },
  {
    id: 'dma-beledci',
    category: 'Turizm',
    tip: 'DMA',
    title: 'Milli Park Bələdçisi DMA',
    level: 'Pulsuz - DMA',
    duration: '30 gün / 171 saat',
    description: 'Ekoturizm, flora/fauna bilikləri, qrup idarəetməsi, ilk yardım.',
    certification: 'DMA Sertifikat',
    image: '/brand/milli park beledcisi.png',
    price: 0,
    syllabus: '/syllabi/Milli park bələdçisi.pdf'
  },
  
  // --- İDARƏETMƏ ---
  {
    id: 'std-restoran-mudiri',
    category: 'İdarəetmə',
    tip: 'STANDART',
    title: 'Restoran İdarəçiliyi',
    level: 'Liderlik',
    duration: '20 gün / 84 saat',
    description: 'P&L analizi, menyu mühəndisliyi, HR, marketing strategiyaları.',
    certification: 'TQTA Diploma',
    image: '/brand/restoran yönetimi.png',
    price: 1800,
    syllabus: '/syllabi/tqta yönetici eğitimleri.docx'
  },
  {
    id: 'std-coffeeshop',
    category: 'İdarəetmə',
    tip: 'STANDART',
    title: 'Coffee Shop İdarəçiliyi',
    level: 'Liderlik',
    duration: '20 gün / 84 saat',
    description: 'Kafe konsepti, təchizat zənciri, müştəri loyallığı, branding.',
    certification: 'TQTA Diploma',
    image: '/brand/coffeeshop-idareciligi.png',
    price: 1800
  },
  {
    id: 'std-franchise',
    category: 'İdarəetmə',
    tip: 'STANDART',
    title: 'Françayzinq İdarəetmə',
    level: 'Business',
    duration: '5 gün / 24 saat',
    description: 'Françayz müqaviləsi, standartlaşdırma, keyfiyyət nəzarəti.',
    certification: 'TQTA Sertifikat',
    image: '/brand/franchise.png',
    price: 400
  }
];

// ========== WORKSHOP'LAR (35 workshop - Fevral-İyun 2026) ==========
export const WORKSHOPS = [
  // ===== FEVRAL 2026 =====
  // 1. Gənc Qurme: Suşi Təlimi (14-17 yaş)
  { 
    id: 'w-feb-susi', 
    month: 'Fevral', 
    day: '7', 
    title: '🍣 Gənc Qurme: Suşi Təlimi', 
    description: 'Gənclər üçün suşi düyüsü, somon maki, krevet nigiri və California roll hazırlama.', 
    age: '14-17', 
    price: '35 AZN', 
    image: '/brand/susi ws.png', 
    category: 'genc', 
    spots: 10,
    menu: ['Suşi düyüsü', 'Somon maki', 'Krevet nigiri', 'California roll', 'Edamame (nümayiş)'],
    techniques: ['Düyü hazırlama', 'Maki bükmə', 'Nigiri formalaşdırma']
  },
  // 2. Sevgililər Günü Xüsusi
  { 
    id: 'w-sevgili', 
    month: 'Fevral', 
    day: '14', 
    title: '❤️ Sevgilim Menyusu', 
    description: 'Sevgililər Günü xüsusi romantik menyu — Mini bruschetta, pancarlı risotto, şokolad fondant.', 
    age: '18+', 
    price: '40 AZN (cütlük)', 
    image: '/brand/sevgililer-gunu-workshop.jpeg', 
    special: true, 
    category: 'yetiskin', 
    spots: 12, 
    menu: ['Mini bruschetta', 'Pancarlı risotto', 'Şokolad fondant', 'Ev limonatası'], 
    techniques: ['Risotto hazırlanması', 'Sous texnikaları', 'Desert bəzəmə', 'Romantik süfrə bəzəmə'], 
    includes: ['Bütün materiallar', 'Resept kitabçası', 'Sertifikat']
  },
  // 3. Şəkərbura və Paxlava Sirləri
  { 
    id: 'w-feb-sekerbura', 
    month: 'Fevral', 
    day: '21', 
    title: '🥮 Şəkərbura və Paxlava Sirləri', 
    description: 'Şərq şirniyyatının sehri — klassik Bakı şəkərburası, Şəki paxlavası, badambura.', 
    age: '16+', 
    price: '35 AZN', 
    image: '/brand/sekerbura.png', 
    category: 'pastacilik', 
    spots: 12,
    menu: ['Klassik Bakı şəkərburası', 'Şəki paxlavası (fındıqlı)', 'Ləzzətli badambura', 'Şəffaf şəkər şərbəti'],
    techniques: ['Şəkərburanın incə xəmiri', 'Paxlava qatlarının düzülməsi', 'Şərbət bişirmə temperaturu', 'Yaradıcı bəzəmə'],
    includes: ['Hazırlanan şirniyyatları evə aparmaq', 'Şirniyyat Ustası sertifikatı', 'Çay və kofe ikramı']
  },
  // 4. Azərbaycan Kabab Sirləri
  { 
    id: 'w-feb-kabab', 
    month: 'Fevral', 
    day: '22', 
    title: '🍖 Azərbaycan Kabablarının Sirləri', 
    description: 'Lülə, tikə, antrikot, cız-bız, quyruq kabab — ət seçimindən bişirməyə qədər.', 
    age: '18+', 
    price: '45 AZN', 
    image: '/brand/workshop kebab.png', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Lülə kabab', 'Tikə kabab', 'Antrikot kabab', 'Cız-bız', 'Quyruq kabab', 'Köz pomidor və bibər'],
    techniques: ['Ət seçimi və kəsim', 'Marinasiya qaydaları', 'Kömür və manqal istifadəsi', 'Düzgün təqdimat'],
    includes: ['Halal sertifikatlı ətlər', 'Təndir çörəyi', 'Təzə göyərti']
  },
  // 5. Kiçik Qurme: Pizza və Desert (5-9 yaş)
  { 
    id: 'w-feb-kid-pizza', 
    month: 'Fevral', 
    day: '15', 
    title: '🧒 Kiçik Qurme: Pizza və Desert', 
    description: 'Balaca mətbəx həvəskarları üçün pizza və brauni hazırlama əyləncəsi.', 
    age: '5-9', 
    price: '25 AZN', 
    image: '/brand/mini qurme pizza ws.png', 
    category: 'cocuklar', 
    spots: 12,
    menu: ['Qarışıq pizza', 'Ağ şokoladlı parça brauni', 'Meyvəli şirə'],
    techniques: ['Pizza xəmiri hazırlama', 'Ərzaqların təhlükəsiz kəsilməsi', 'Sous hazırlama', 'Desert bəzəmə'],
    includes: ['Uşaq sertifikatı', 'Valideynlə birlikdə']
  },
  // 6. Uşaqlarla Pizza Əyləncəsi (6-12 yaş)
  { 
    id: 'w-feb-kid-pizza2', 
    month: 'Fevral', 
    day: '16', 
    title: '🍕 Uşaqlarla Pizza Əyləncəsi', 
    description: 'Mini-pizza, Marqarita və tərəvəzli pizza — yaradıcılıq və dadlar!', 
    age: '6-12', 
    price: '25 AZN', 
    image: '/brand/mini qurme pizza ws.png', 
    category: 'cocuklar', 
    spots: 12,
    menu: ['Mini-pizza', 'Klassik Marqarita pizza', 'Tərəvəzli pizza'],
    techniques: ['Pizza xəmiri yoğurma', 'Sous hazırlama', 'Üst materialların düzülməsi', 'Peçdə bişirmə']
  },
  // 7. Sadəcə Espresso
  { 
    id: 'w-feb-espresso', 
    month: 'Fevral', 
    day: '28', 
    title: '☕ Sadəcə Espresso: İtalyan Notaları', 
    description: 'Professional espresso, cappuccino, latte, flat white və latte art texnikaları.', 
    age: '16+', 
    price: '30 AZN', 
    image: '/brand/espersoo latte art workshop.png', 
    category: 'icecek', 
    spots: 8,
    menu: ['İtalyan Espressosu', 'Klassik Cappuccino', 'Caffè Latte', 'Flat White'],
    techniques: ['Espresso hazırlama', 'Süd köpürtmə', 'Latte Art (ürək, yarpaq)', 'Qəhvə növləri']
  },

  // ===== MART 2026 =====
  // 8. Novruz Şirniyyatları
  { 
    id: 'w-mar-novruz', 
    month: 'Mart', 
    day: '8', 
    title: '🌸 Novruz Şirniyyatları', 
    description: 'Baharın ən şirin ənənələri — şəkərbura, paxlava, qoğal, badambura.', 
    age: '16+', 
    price: '35 AZN', 
    image: '/brand/baklava-workshop.jpeg', 
    special: true, 
    category: 'pastacilik', 
    spots: 12,
    menu: ['Ənənəvi Novruz şəkərburası', 'Qoz-fındıq paxlavası', 'Qoğal', 'Badambura'],
    techniques: ['Şəkərbura xəmiri və içliyi', 'Paxlava qatları', 'Qoğal xəmiri', 'Badambura texnikası'],
    includes: ['Novruz söhbətləri', 'Şirniyyatları evə aparmaq', 'Çay və kofe ikramı']
  },
  // 9. Azərbaycan Plovları
  { 
    id: 'w-mar-plov', 
    month: 'Mart', 
    day: '15', 
    title: '🍚 Azərbaycan Plovları', 
    description: 'Milli yeməyimizin tarixini yazaq — Şah plov, səbzəli, şirin, mərci plov.', 
    age: '18+', 
    price: '40 AZN', 
    image: '/brand/shahplov baku.webp', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Şah Plov', 'Səbzəli Plov', 'Şirin Plov', 'Mərci Plov'],
    techniques: ['Düyü seçimi və hazırlanması', 'Ət qovurma', 'Dəmləmə üsulları', 'Qazmaq hazırlama'],
    includes: ['Plov tarixi söhbəti', 'Şah plov yarışması', 'Dequstasiya']
  },
  // 10. Uşaqlarla Novruzlaşirin (6-12 yaş)
  { 
    id: 'w-mar-kid-novruz', 
    month: 'Mart', 
    day: '21', 
    title: '🧒 Uşaqlarla Novruzlaşirin', 
    description: 'Balaca şirniyyat ustaları üçün Novruz şirniyyatları — şəkərbura, mini paxlava.', 
    age: '6-12', 
    price: '25 AZN', 
    image: '/brand/sekerbura.png', 
    category: 'cocuklar', 
    spots: 12,
    menu: ['Şəkərbura (sadələşdirilmiş)', 'Mini paxlava', 'Rəngli şəkərli peçenyelər', 'Novruz şərbəti'],
    techniques: ['Xəmir yoğurma', 'İçlik hazırlama', 'Forma vermə', 'Bəzəmə texnikaları'],
    includes: ['İlk Aşpazlıq Diplomu', 'Valideynlə birlikdə', 'Şirniyyatları evə aparmaq']
  },

  // ===== NİSAN 2026 =====
  // 11. Qutab və Corat Qutabı
  { 
    id: 'w-apr-qutab', 
    month: 'Nisan', 
    day: '4', 
    title: '🥟 Qutab və Corat Qutabı Sirləri', 
    description: 'Xəmirin sehri — göyərtili, pendirli, ətli qutab və Corat qutabı.', 
    age: '16+', 
    price: '30 AZN', 
    image: '/brand/qutap workshop.png', 
    category: 'yetiskin', 
    spots: 12,
    menu: ['Corat qutabı', 'Göyərtili qutab', 'Pendirli qutab', 'Ətli qutab'],
    techniques: ['Qutab xəmiri hazırlama', 'İçlik hazırlama', 'Sacda bişirmə', 'Ənənəvi təqdimat'],
    includes: ['Corat qutabı tarixi', 'Dequstasiya', 'Çay süfrəsi']
  },
  // 11-1. Qutab Ustaları
  { 
    id: 'w-apr-qutab2', 
    month: 'Nisan', 
    day: '11', 
    title: '🥟 Qutab Ustaları Workshop', 
    description: 'Göyərtili, ətli, balqabaqlı, pendirli qutab — sacın üzərində rəqs edən ləzzətlər.', 
    age: '16+', 
    price: '35 AZN', 
    image: '/brand/qutap workshop.png', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Göyərtili Qutab', 'Ətli Qutab', 'Balqabaqlı Qutab', 'Pendirli Qutab'],
    techniques: ['Un seçimi', 'Su-un nisbəti', 'Xəmir elastikliyi', 'Nazik yayma', 'Kənarların bağlanması']
  },
  // 12. Kiçik Qurme: Makarna Əyləncəsi (5-9 yaş)
  { 
    id: 'w-apr-kid-makarna', 
    month: 'Nisan', 
    day: '12', 
    title: '🧒 Kiçik Qurme: Makarna Əyləncəsi', 
    description: 'Rəngli makarna dünyası — üç rəngli fettuccine, pomidor sousu, mini köftələr.', 
    age: '5-9', 
    price: '25 AZN', 
    image: '/brand/makaron pasta ws.png', 
    category: 'cocuklar', 
    spots: 12,
    menu: ['Üç rəngli fettuccine', 'Pomidor sousu', 'Mini köftələr', 'Şokolad mussu'],
    techniques: ['Makarna xəmiri yoğurma', 'Rəngləndirmə', 'Kəsmə və forma vermə', 'Sadə sous hazırlama']
  },
  // 12-1. Balaca Pizzaçılar (7-12 yaş)
  { 
    id: 'w-apr-kid-pizza', 
    month: 'Nisan', 
    day: '19', 
    title: '🍕 Balaca Pizzaçılar Workshop', 
    description: 'Mini Marqarita, gülərüz pizza, şokolad-banan desert pizzası.', 
    age: '7-12', 
    price: '25 AZN', 
    image: '/brand/mini qurme pizza ws.png', 
    category: 'cocuklar', 
    spots: 12,
    menu: ['Mini Marqarita pizza', 'Tərəvəzli gülərüz pizza', 'Şokolad-banan desert pizzası', 'Meyvə şirəsi'],
    techniques: ['Pizza xəmiri ilə işləmə', 'Pomidor sousu hazırlama', 'Təhlükəsiz alətlər', 'Bəzəmə']
  },

  // ===== MAY 2026 =====
  // 13. Əlifba Bayramı Xüsusi (5-8 yaş)
  { 
    id: 'w-may-elifba', 
    month: 'May', 
    day: '16', 
    title: '🎓 Əlifba Bayramı Xüsusi', 
    description: 'Kiçik məzunlar üçün hərf şəkilli peçenyelər, rəngli makaron, mini sendviçlər.', 
    age: '5-8', 
    price: '19 AZN', 
    special: true,
    image: '/brand/makaron pasta ws.png', 
    category: 'cocuklar', 
    spots: 15,
    menu: ['Hərf şəkilli peçenyelər', 'Rəngli makaron', 'Mini sendviçlər', 'Meyvəli desert'],
    techniques: ['Peçenye xəmiri hazırlama', 'Hərf formaları', 'Desert bəzəmə', 'Təhlükəsiz alətlər'],
    includes: ['Əlifba Bayramı xatirə fotoşəkli', 'İlk Aşpazlıq Diplomu', 'Valideynlə birlikdə']
  },

  // ===== HAZİRAN 2026 =====
  // 14. Yay Sərinliyi: Dondurma və Şərbət
  { 
    id: 'w-jun-dondurma', 
    month: 'İyun', 
    day: '7', 
    title: '🍨 Yay Sərinliyi: Dondurma və Şərbət', 
    description: 'Ev şəraitində təbii dondurma — fıstıqlı dondurma, qarpız şərbəti, nanəli limon.', 
    age: '16+', 
    price: '35 AZN', 
    image: '/brand/dondurma.png', 
    category: 'yetiskin', 
    spots: 12,
    menu: ['Fıstıqlı dondurma', 'Qarpız şərbəti', 'Nanəli limon şərbəti', 'Meyvəli buz parçaları'],
    techniques: ['Dondurma əsası', 'Təbii meyvə şərbətləri', 'Tekstura və saxlama', 'Təqdimat']
  },
  // 15. Yay Məzələri
  { 
    id: 'w-jun-meze', 
    month: 'İyun', 
    day: '14', 
    title: '🥗 Yay Məzələri', 
    description: 'Yay süfrələrinin vazkeçilməzləri — badımcan kürüsü, çoban salatı, humus, cacıq.', 
    age: '16+', 
    price: '30 AZN', 
    image: '/brand/meze.jpg', 
    category: 'yetiskin', 
    spots: 12,
    menu: ['Badımcan kürüsü', 'Çoban salatı', 'Humus', 'Cacıq'],
    techniques: ['Badımcan bişirmə', 'Göyərtilərin hazırlanması', 'Məzə qarnirləri', 'Soyuq saxlama']
  },
  // 16. Kiçik Qurme: Yay Tətili (7-12 yaş)
  { 
    id: 'w-jun-kid-yay', 
    month: 'İyun', 
    day: '21', 
    title: '🧒 Kiçik Qurme: Yay Tətili Xüsusi', 
    description: 'Yay tətilində əyləncəli mətbəx — rəngarəng sendviçlər, meyvəli yoğurt, mini keklər.', 
    age: '7-12', 
    price: '25 AZN', 
    image: '/brand/kucuk  gurme yay tatili.png',
    category: 'cocuklar', 
    spots: 12,
    menu: ['Rəngarəng sendviçlər', 'Meyvəli yoğurt', 'Tərəvəz çubuqları', 'Mini şokolad kekləri'],
    techniques: ['Təhlükəsiz bıçaq istifadəsi', 'Sandwich hazırlama', 'Meyvə-tərəvəz təmizləmə', 'Yoğurt qarışdırma']
  },

  // ===== QƏHVƏ VƏ İÇKİ WORKSHOPLARI (HƏR AY) =====
  // Latte Art və Qəhvə Sirləri II
  { 
    id: 'w-latte-art-2', 
    month: 'Mart', 
    day: '22', 
    title: '☕ Latte Art və Qəhvə Sirləri II', 
    description: 'Mürəkkəb latte art nümunələri, temperatur nəzarəti, ənənəvi olmayan dəmləmə.', 
    age: '16+', 
    price: '35 AZN', 
    image: '/brand/espersoo latte art workshop.png', 
    category: 'icecek', 
    spots: 8,
    techniques: ['Mürəkkəb Latte Art', 'Temperatur nəzarəti', 'Alternativ dəmləmə', 'Barista texnikaları']
  },
  // Çay Dəmləmə İncəsənəti
  { 
    id: 'w-cay', 
    month: 'Nisan', 
    day: '26', 
    title: '🍵 Çay Dəmləmə İncəsənəti', 
    description: 'Lənkəran çayından Yapon matçasına — çay növləri və dəmləmə sirləri.', 
    age: '16+', 
    price: '25 AZN', 
    image: '/brand/cay-sufresi.png', 
    category: 'icecek', 
    spots: 10,
    menu: ['Klassik Qara Çay', 'Yaşıl Çay', 'Ağ Çay', 'Hibiskus Çayı', 'Bitki Çayları'],
    techniques: ['Çay növlərinin xüsusiyyətləri', 'İdeal dəmləmə temperaturu', 'Çay dəstgahı sənəti', 'Çay süfrəsi adətləri']
  },
  // Türk Qəhvəsi
  { 
    id: 'w-turk-qehve', 
    month: 'May', 
    day: '10', 
    title: '☕ Türk Qəhvəsi: Tarixdən Süzülən Ləzzət', 
    description: '500 illik səyahət — ənənəvi Türk qəhvəsi, köpük sirləri, dibək qəhvəsi.', 
    age: '16+', 
    price: '30 AZN', 
    image: '/brand/turk-kahvesi.png', 
    category: 'icecek', 
    spots: 10,
    menu: ['Orta şəkərli Türk qəhvəsi', 'Kəklikotu ətirli qəhvə', 'Darçın-qəranfilli qəhvə', 'Dibək qəhvəsi'],
    techniques: ['Ənənəvi hazırlama', 'Köpük və qeyməli bişirmə', 'Su və qənd təqdimatı', 'Fincan seçimi']
  },
  // Yay Kokteylləri və Soyuq Qəhvələr
  { 
    id: 'w-yay-kokteyl', 
    month: 'İyun', 
    day: '28', 
    title: '🍹 Yay Kokteylləri və Soyuq Qəhvələr', 
    description: 'Yayın ən sərin ləzzətləri — Cold Brew, Frappe, Mocktail, ev limonatası.', 
    age: '16+', 
    price: '30 AZN', 
    image: '/brand/male-bartender-pouring-wine-for-customer.jpg', 
    category: 'icecek', 
    spots: 10,
    menu: ['Cold Brew Coffee', 'Buzlu Frappe', 'Tropik Mocktail', 'Ev limonatası', 'Meyvəli Smoothie'],
    techniques: ['Cold Brew texnikası', 'Meyvə şərbətləri', 'Qarışdırma üsulları', 'Bəzəmə sənəti']
  },

  // ===== MƏTBƏX SİRLƏRİ WORKSHOPLARI =====
  // Mətbəx Sirləri - Qərb
  { 
    id: 'w-metbex-qerb', 
    month: 'Mart', 
    day: '29', 
    title: '🍽️ Mətbəx Sirləri: Qərb Mətbəxi', 
    description: 'Sezar salatası, göbələkli risotto, bonfile, crème brûlée.', 
    age: '18+', 
    price: '45 AZN', 
    image: '/brand/italian-food.jpeg', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Sezar salatası (toyuqlu)', 'Göbələkli risotto', 'Café de Paris souslu bonfile', 'Crème brûlée'],
    techniques: ['Professional bıçaq texnikaları', 'Restoranvari plating', 'Sous hazırlama', 'Temperatur nəzarəti']
  },
  // Mətbəx Sirləri - Azərbaycan
  { 
    id: 'w-metbex-az', 
    month: 'Nisan', 
    day: '5', 
    title: '🍽️ Mətbəx Sirləri: Azərbaycan', 
    description: 'Toyuq suyuna düşbərə, üç bacı dolması, narşərab souslu qovurma, paxlava.', 
    age: '18+', 
    price: '40 AZN', 
    image: '/brand/azerbaycan mutfagi.jpg', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Toyuq suyuna düşbərə', 'Üç bacı dolması', 'Narşərab souslu qovurma', 'Badamlı paxlava'],
    techniques: ['Professional bıçaq texnikaları', 'Plating', 'Sous hazırlama', 'Azərbaycan çay dəstgahı']
  },
  // Pidə və Lahmacun
  { 
    id: 'w-pide', 
    month: 'May', 
    day: '3', 
    title: '🫓 Pidə və Lahmacun Ustaları', 
    description: 'Türk mətbəxinin sevimli ləzzətləri — quşbaşı ətli pidə, klassik lahmacun.', 
    age: '18+', 
    price: '45 AZN', 
    image: '/brand/pide lahmacun.png', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Quşbaşı ətli pidə', 'Pendirli pidə', 'Qarışıq pidə', 'Klassik lahmacun', 'Acılı lahmacun'],
    techniques: ['Un seçimi və xəmir hazırlama', 'Maya dozası', 'Xəmir açma', 'Sobada bişirmə']
  },
  // İtalyan Pizza
  { 
    id: 'w-pizza', 
    month: 'May', 
    day: '24', 
    title: '🍕 İtalyan Pizza Workshop', 
    description: 'Napoli üsulu pizza — Marqarita, pepperoni, dörd pendir, tərəvəzli.', 
    age: '16+', 
    price: '40 AZN', 
    image: '/brand/mini qurme pizza ws.png', 
    category: 'yetiskin', 
    spots: 12,
    menu: ['Klassik Marqarita', 'Pepperoni pizza', 'Dörd pendir pizzası', 'Tərəvəzli pizza', 'Pestolu pizza'],
    techniques: ['Napoli üsulu xəmir', 'Klassik pizza sousu', 'Xəmir açma', 'Professional soba istifadəsi']
  },
  // Ev Konservləri və Mürəbbə
  { 
    id: 'w-konserv', 
    month: 'İyun', 
    day: '7', 
    title: '🫙 Ev Konservləri və Mürəbbə', 
    description: 'Mövsüm meyvə-tərəvəzlərini saxlama — turşular, mürəbbələr, sterilizasiya.', 
    age: '16+', 
    price: '35 AZN', 
    image: '/brand/mürebbe.png',
    category: 'yetiskin', 
    spots: 12,
    menu: ['Pomidor-xiyar turşusu', 'Badımcan kürüsü', 'Qoz mürəbbəsi', 'Çiyələk mürəbbəsi', 'Ərik mürəbbəsi'],
    techniques: ['Sterilizasiya üsulları', 'Konservləşdirmə', 'Mürəbbə bişirmə', 'Saxlama şərtləri']
  },
  // Burger Ustaları (Böyüklər)
  { 
    id: 'w-burger', 
    month: 'Fevral', 
    day: '8', 
    title: '🍔 Burger Ustaları Workshop', 
    description: 'Çizburger, qabırğa əti burger, tempura soğan, kajun kartof qızartması.', 
    age: '18+', 
    price: '45 AZN', 
    image: '/brand/mini gurma burger ws.png', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Çizburger', 'Qabırğa əti burger', 'Tempura soğan halqaları', 'Kajun kartof qızartması', 'Sarımsaqlı acılı mayonez'],
    techniques: ['Burger əti hazırlama', 'Sous hazırlama', 'Qızartma texnikaları', 'Tempura hazırlama']
  },
  // Balaca Burgerçilər (7-12 yaş)
  { 
    id: 'w-kid-burger', 
    month: 'Mart', 
    day: '1', 
    title: '🧒 Balaca Burgerçilər Workshop', 
    description: 'Mini-çizburger, ev üsulu kartof, ballı ranch sousu, şokolad cookie.', 
    age: '7-12', 
    price: '25 AZN', 
    image: '/brand/mini gurma burger ws.png', 
    category: 'cocuklar', 
    spots: 12,
    menu: ['Mini-çizburger', 'Ev üsulu kartof qızartması', 'Ballı ranch sousu', 'Şokolad cookie'],
    techniques: ['Təhlükəsiz bıçaq istifadəsi', 'Burger kotleti hazırlama', 'Sadə sous hazırlama', 'Bəzəmə']
  },
  // Xəmir İşləri: Xəngəl & Düşbərə
  { 
    id: 'w-xemir', 
    month: 'Nisan', 
    day: '18', 
    title: '🥟 Xəmir İşləri: Xəngəl və Düşbərə', 
    description: 'Guru xəngəl, ətli düşbərə, ev üsulu pelmeni — xəmirin sehrli dünyası.', 
    age: '16+', 
    price: '40 AZN', 
    image: '/brand/xengel.webp', 
    category: 'yetiskin', 
    spots: 10,
    menu: ['Guru Xəngəl', 'Ətli Düşbərə', 'Ev Üsulu Pelmeni'],
    techniques: ['Un seçimi', 'Xəmir temperaturu', 'İstirahət müddəti', 'İncə yayma', 'Kəsmə üsulları']
  },
  // Məzə Ustaları
  { 
    id: 'w-meze-usta', 
    month: 'May', 
    day: '17', 
    title: '🥗 Məzə Ustaları Workshop', 
    description: 'Şakşuka, haydari, humus, badımcan kürüsü, çoban salatı, lobya püresi.', 
    age: '16+', 
    price: '35 AZN', 
    image: '/brand/meze.jpg', 
    category: 'yetiskin', 
    spots: 12,
    menu: ['Şakşuka', 'Haydari', 'Humus', 'Badımcan Kürüsü', 'Çoban Salatı', 'Lobya Püresi'],
    techniques: ['Badımcan közləmə', 'Bıçaq texnikaları', 'Ədviyyat balansı', 'Zeytun yağı-limon nisbəti']
  },

  // ===== AZƏRBAYCANIN BÖLGƏ MƏTBƏXLƏRİ =====
  // Şəki Mətbəxi
  { 
    id: 'w-seki', 
    month: 'Mart', 
    day: '28', 
    title: '🏔️ Şəki Mətbəxi Workshop', 
    description: 'Şəki pitisi, pərvərda, Şəki çörəyi, Şəki düşbərəsi.', 
    age: '18+', 
    price: '40 AZN', 
    image: '/brand/piti.webp', 
    category: 'bolge', 
    spots: 10,
    menu: ['Şəki pitisi', 'Pərvərda (nümayiş)', 'Şəki çörəyi', 'Şəki düşbərəsi'],
    techniques: ['Piti bişirmə', 'Şəki xörəkləri', 'Ənənəvi reseptlər']
  },
  // Lənkəran Mətbəxi
  { 
    id: 'w-lenkeran', 
    month: 'Nisan', 
    day: '25', 
    title: '🌴 Lənkəran Mətbəxi Workshop', 
    description: 'Toyuq ləvəngisi, Lənkəran küküsü, albuxara plovu.', 
    age: '18+', 
    price: '45 AZN', 
    image: '/brand/lenkeran.webp', 
    category: 'bolge', 
    spots: 10,
    menu: ['Toyuq ləvəngisi', 'Lənkəran küküsü', 'Albuxara plovu', 'Lənkəran çayı dəstgahı'],
    techniques: ['Ləvəngi hazırlama', 'Cənub mətbəxi sirləri']
  },
  // Gəncə Mətbəxi
  { 
    id: 'w-gence', 
    month: 'May', 
    day: '31', 
    title: '🏛️ Gəncə Mətbəxi Workshop', 
    description: 'Gəncə doğramacı, səbzi qovurma, Gəncə kətəsi, sulu xingal.', 
    age: '18+', 
    price: '40 AZN', 
    image: '/brand/gence-goy-ketesi.webp', 
    category: 'bolge', 
    spots: 10,
    menu: ['Gəncə doğramacı', 'Səbzi qovurma', 'Gəncə kətəsi', 'Sulu xingal'],
    techniques: ['Qədim reseptlər', 'Doğramac hazırlama', 'Kətə yoğrulması']
  },
];

// ========== MASTERCLASS'LAR ==========
export const MASTERCLASSES = [
  {
    id: 'mc-1',
    title: 'Dünya Mətbəxi: İtaliya',
    instructor: 'TQTA',
    duration: '4 saat',
    description: 'Pasta fresca, risotto, tiramisu — İtalyan kulinariyasının əsasları.',
    price: '89 AZN',
    image: '/brand/italian-food.jpeg',
    date: 'Hər Şənbə'
  },
  {
    id: 'mc-2',
    title: 'Türk Mətbəxi Sirləri',
    instructor: 'TQTA',
    duration: '5 saat',
    description: 'Mantı, lahmacun, künəfə — ənənəvi Türk dadları.',
    price: '79 AZN',
    image: '/brand/turk-mutfagi.webp',
    date: 'Hər Bazar'
  },
  {
    id: 'mc-3',
    title: 'Şərab və Yemək Uyumu',
    instructor: 'TQTA',
    duration: '3 saat',
    description: 'Şərab seçimi, degustasiya, yemək-şərab kombinasiyaları.',
    price: '99 AZN',
    image: '/brand/wine-service-for-customers-at-luxury-restaurant.jpg',
    date: 'Ayda 2 dəfə'
  },
  {
    id: 'mc-4',
    title: 'Korporativ Team Building',
    instructor: 'TQTA',
    duration: '3-5 saat',
    description: 'Şirkətlər üçün kulinariya yarışları və komanda quruculuğu.',
    price: 'Sorğu ilə',
    image: '/brand/ogrencilerimizle.jpeg',
    date: 'Rezervasiya ilə'
  }
];

export const STUDENT_CURRICULUM: Module[] = [
  {
    id: 'mod1',
    title: 'Giriş və Təhlükəsizlik',
    lessons: [
      { id: 'l1', title: 'Mətbəxdə İş Sağlamlığı', duration: '45 dəq', completed: true },
      { id: 'l2', title: 'Bıçaq Texnikaları', duration: '60 dəq', completed: true },
    ]
  },
  {
    id: 'mod2',
    title: 'Fransız Sousları',
    lessons: [
      { id: 'l3', title: 'Beşamel və Veloute', duration: '90 dəq', completed: false },
      { id: 'l4', title: 'Hollandaise Sirləri', duration: '75 dəq', completed: false },
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: '2025 Kulinariya Trendləri',
    slug: '2025-trends',
    excerpt: 'Molekulyar qastronomiya və yerli məhsulların harmoniyası...',
    content: 'Tam mətn burada yerləşəcək...',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    date: '15 Yanvar 2025',
    category: 'Trendlər'
  },
  {
    id: 'b2',
    title: 'CTH Sertifikatının Üstünlükləri',
    slug: 'cth-benefits',
    excerpt: 'Beynəlxalq arenada iş tapmağın ən qısa yolu...',
    content: 'Tam mətn burada yerləşəcək...',
    image: 'https://images.unsplash.com/photo-1523240715639-99a8088fb972?auto=format&fit=crop&q=80&w=600',
    date: '10 Yanvar 2025',
    category: 'Təhsil'
  }
];

export const MOCK_TRAJECTORIES: AgentTrajectory[] = [
  {
    id: 'tr-1',
    intent: 'Karyera dəyişikliyi',
    path: ['Hero', 'Courses', 'Chat'],
    decisionNodes: ['Trust', 'International Certification'],
    outcome: 'Converted',
    reasoning: 'Beynəlxalq tanınma istifadəçini qərar verməyə sövq etdi.',
    probability: 0.92
  },
  {
    id: 'tr-2',
    intent: 'Qiymət araşdırması',
    path: ['Courses', 'Simulator'],
    decisionNodes: ['Price Sensitivity'],
    outcome: 'Dropped',
    reasoning: 'Maliyyə şərtləri büdcəyə uyğun gəlmədi.',
    probability: 0.22
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Community - Komanda ruhu
  { id: 1, category: 'Community', text: 'Komanda ilə işləmək mənə enerji verir', image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=600' },
  { id: 2, category: 'Community', text: 'Başqalarına kömək etmək məni xoşbəxt edir', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600' },
  { id: 3, category: 'Community', text: 'Qonaqları qarşılamaq və onlarla ünsiyyət qurmaq xoşuma gəlir', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600' },
  
  // Craftsmanship - Sənətkarlıq
  { id: 4, category: 'Craftsmanship', text: 'Mətbəxdə hər şeyin mükəmməl və nizamlı olması vacibdir', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600' },
  { id: 5, category: 'Craftsmanship', text: 'Detallara diqqət yetirmək mənim güclü tərəfimdir', image: 'https://images.unsplash.com/photo-1607631568010-a87245c0dbd8?w=600' },
  { id: 6, category: 'Craftsmanship', text: 'Yeni bir texnika öyrənmək üçün saatlarla məşq edə bilərəm', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600' },
  
  // Leadership - Liderlik
  { id: 7, category: 'Leadership', text: 'Qərarlar vermək və məsuliyyət daşımaq məni qorxutmur', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600' },
  { id: 8, category: 'Leadership', text: 'İnsanları motivasiya etmək və yönləndirmək bacarığım var', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600' },
  { id: 9, category: 'Leadership', text: 'Çətin vəziyyətlərdə sakit qalıb çözüm tapa bilirəm', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600' },
  
  // Optimism - Nikbinlik
  { id: 10, category: 'Optimism', text: 'Yeni yerləri kəşf etmək və səyahət etmək xoşuma gəlir', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600' },
  { id: 11, category: 'Optimism', text: 'Müxtəlif mədəniyyətlər və insanlarla tanış olmaq istəyirəm', image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600' },
  { id: 12, category: 'Optimism', text: 'Gələcəyə ümidlə baxıram və planlarım var', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600' },
  
  // Mentorship - Mentorluq
  { id: 13, category: 'Mentorship', text: 'Bildiklərimi başqalarına öyrətmək xoşuma gəlir', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600' },
  { id: 14, category: 'Mentorship', text: 'Gənclərə yol göstərmək və tövsiyələr vermək istəyirəm', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600' },
  { id: 15, category: 'Mentorship', text: 'Təcrübəmi paylaşmaqdan zövq alıram', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600' },
];

export const MOCK_STUDENTS: StudentProfile[] = [
  { name: "Aysel Məmmədova", course: "Professional Cookery", gpa: "4.8", specialization: "Pastry", graduationYear: "2024" }
];
