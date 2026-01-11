'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { KURSLAR } from '@/data/kurslar';
import { Button } from "@/components/ui/button";
import { 
    ArrowLeft, Clock, Calendar, Award, Users, Star, 
    Download, MessageCircle, Briefcase, CheckCircle, 
    ChefHat, Coffee, UtensilsCrossed, Hotel, Plane,
    BookOpen, Target, Phone,
    ChevronDown, ChevronUp, GraduationCap, Globe
} from 'lucide-react';

// Kurs resimleri
const COURSE_IMAGES = {
    'cth-foh-l2': '/brand/wine-service-for-customers-at-luxury-restaurant.jpg',
    'cth-barista-l2': '/brand/coffee-test.jpg',
    'cth-cookery-l2': '/brand/cth-level-4-diploma-professional-culinary-arts-cover-img.jpg',
    'cth-english-l1': '/brand/egitim-otagimiz.jpeg',
    'dma-ofisiant': '/brand/wine-service-for-customers-at-luxury-restaurant.jpg',
    'dma-barista': '/brand/kafe-barista.jpeg',
    'dma-aspaz-l3': '/brand/mutfak.jpeg',
    'dma-qapici': '/brand/happy-young-couple-checking-in-to-luxury-hotel.jpg',
    'dma-qeydiyyatci': '/brand/happy-young-couple-checking-in-to-luxury-hotel.jpg',
    'dma-turoperator': '/brand/2560px-Virgin_Atlantic_logo.svg.png',
    'dma-beledci': '/brand/binamiz.jpeg',
    'dma-xadime': '/brand/housekeeping dma.png',
    'dma-konfrans': '/brand/egitim-zali-1.jpeg',
    'std-barista-ekspress': '/brand/coffee-test.jpg',
    'std-barmen': '/brand/male-bartender-pouring-wine-for-customer.jpg',
    'std-qennadci': '/brand/cth-level-3-diploma-confectionery-patisserie-cover-image.jpg',
    'std-aspaz-l3': '/brand/mutfak.jpeg',
    'std-pide': '/brand/mutfak-3.jpeg',
    'std-pizza': '/brand/mutfak-3.jpeg',
    'std-doner': '/brand/kebap-workshop.jpeg',
    'std-hamburger': '/brand/mutfak-3.jpeg',
    'std-restoran-mudiri': '/brand/egitim-otagimiz.jpeg',
    'std-coffeeshop': '/brand/coffeeshop-idareciligi.png',
    'std-franchise': '/brand/franchise.png',
};

// PDF dosyaları
const AVAILABLE_SYLLABI = ['cth-barista-l2', 'cth-foh-l2', 'cth-cookery-l2'];

// Kurs ikonları
const COURSE_ICONS = {
    'cth-foh-l2': UtensilsCrossed,
    'cth-barista-l2': Coffee,
    'cth-cookery-l2': ChefHat,
    'cth-english-l1': BookOpen,
    'dma-ofisiant': UtensilsCrossed,
    'dma-barista': Coffee,
    'dma-aspaz-l3': ChefHat,
    'dma-qapici': Hotel,
    'dma-qeydiyyatci': Hotel,
    'dma-turoperator': Plane,
    'dma-beledci': Globe,
    'dma-xadime': Hotel,
    'dma-konfrans': Users,
    'std-qennadci': ChefHat,
    'std-barmen': Coffee,
    'std-aspaz-l3': ChefHat,
    'std-restoran-mudiri': Briefcase,
    'std-coffeeshop': Coffee,
};

// İş imkanları
const JOB_OPPORTUNITIES = {
    'cth-foh-l2': ['Restoran Meneceri', 'Baş Ofisiant', 'F&B Supervisor', 'Otel Restoran Müdürü'],
    'cth-barista-l2': ['Baş Barista', 'Kafe Müdürü', 'Barista Təlimçi', 'Qəhvə Mütəxəssisi'],
    'cth-cookery-l2': ['Aşpaz', 'Sous Chef', 'Pastry Chef', 'Mətbəx Müdürü'],
    'cth-english-l1': ['Turizm Mütəxəssisi', 'Otel Resepsionist', 'Gid'],
    'dma-ofisiant': ['Ofisiant', 'Baş Ofisiant', 'Restoran Administratoru', 'Növbə Reisi'],
    'dma-barista': ['Barista', 'Kafe Əməkdaşı', 'Qəhvə Ustası'],
    'dma-aspaz-l3': ['Aşpaz', 'Mətbəx Köməkçisi', 'Line Cook', 'Prep Cook'],
    'dma-qapici': ['Otel Qapıçısı', 'Bellboy', 'Doorman', 'Concierge Köməkçisi'],
    'dma-qeydiyyatci': ['Resepsionist', 'Front Desk Agent', 'Rezervasiya Əməkdaşı'],
    'dma-turoperator': ['Turagent', 'Turoperator', 'Səyahət Məsləhətçisi'],
    'dma-beledci': ['Turist Bələdçisi', 'Ekskursiya Rəhbəri', 'Gid'],
    'dma-xadime': ['Otel Xadiməçisi', 'Housekeeping Supervisor', 'Room Attendant'],
    'dma-konfrans': ['Event Manager', 'Tədbir Təşkilatçısı', 'Konfrans Koordinatoru'],
    'std-qennadci': ['Qənnadçı', 'Pastry Chef', 'Şirniyyat Ustası', 'Tort Dekoratoru'],
    'std-barmen': ['Barmen', 'Baş Barmen', 'Bar Müdürü'],
    'std-aspaz-l3': ['Aşpaz', 'Sous Chef', 'Mətbəx Müdürü'],
    'std-restoran-mudiri': ['Restoran Müdürü', 'F&B Manager', 'General Manager'],
    'std-coffeeshop': ['Kafe Müdürü', 'Coffee Shop Sahibi'],
};

// Öğrenme çıktıları
const LEARNING_OUTCOMES = {
    'cth-foh-l2': [
        'Peşəkar qonaq qarşılama texnikaları',
        'Restoran xidmət standartları',
        'Menyu bilgisi və tövsiyə bacarıqları',
        'Şərab və içki xidməti',
        'Müştəri şikayətlərinin həlli',
        'Komanda işi və liderlik'
    ],
    'cth-barista-l2': [
        'Espresso hazırlama mükəmməlliyi',
        'Süd köpürtmə texnikaları',
        'Latte Art yaratma bacarığı',
        'Qəhvə növləri və mənşəyi',
        'Avadanlıq istifadəsi və təmiri',
        'Müştəri xidməti sənəti'
    ],
    'cth-cookery-l2': [
        'Klassik bıçaq texnikaları',
        'Əsas bişirmə metodları',
        'Qida təhlükəsizliyi və gigiyena',
        'Porsiya nəzarəti',
        'Təqdimat və plating sənəti',
        'Mətbəx təşkilatı'
    ],
    'dma-ofisiant': [
        'Peşəkar servis texnikaları',
        'Masanın düzgün açılması',
        'Sifariş qəbulu və ötürülməsi',
        'İçki xidməti qaydaları',
        'Qonaq psixologiyası',
        'Satış texnikaları'
    ],
    'dma-barista': [
        'Qəhvə hazırlama əsasları',
        'Espresso maşını istifadəsi',
        'Süd texnikaları',
        'İçki reseptləri',
        'Müştəri ünsiyyəti',
        'Kafe gigiyenası'
    ],
    'dma-aspaz-l3': [
        'Professional aşpazlıq texnikaları',
        'Milli və dünya mətbəxi',
        'Qida təhlükəsizliyi (HACCP)',
        'Menyu planlaması',
        'Xərc nəzarəti',
        'Mətbəx idarəçiliyi'
    ],
    'dma-qapici': [
        'Qonaq qarşılama və yola salma protokolları',
        'Baqaj daşıma texnikaları',
        'Taksi və nəqliyyat koordinasiyası',
        'VIP qonaq xidməti',
        'Təhlükəsizlik prosedurları',
        'Otel lobbi idarəetməsi'
    ],
    'dma-xadime': [
        'Otaq təmizliyi standartları',
        'Yataq düzəltmə texnikaları',
        'Kimyəvi təmizləyicilərin istifadəsi',
        'Mini-bar və amenities idarəsi',
        'Çamaşırxana əməliyyatları',
        'Gigiyena və dezinfeksiya'
    ],
    'dma-qeydiyyatci': [
        'Check-in/Check-out prosedurları',
        'Rezervasiya sistemləri',
        'Müştəri məlumatlarının idarəsi',
        'Ödəniş əməliyyatları',
        'Şikayət idarəetməsi',
        'Telefon etiketi'
    ],
    'dma-turoperator': [
        'Tur paketləri hazırlama',
        'Bilet bronlama sistemləri',
        'Viza prosedurları',
        'Müştəri məsləhəti',
        'Turizm qanunvericiliyi',
        'Satış texnikaları'
    ],
    'dma-beledci': [
        'Ekskursiya planlaması',
        'Tarix və mədəniyyət bilikləri',
        'Qrup idarəetməsi',
        'İlk yardım əsasları',
        'Natiqlik bacarıqları',
        'Xarici dil kommunikasiyası'
    ],
    'std-qennadci': [
        'Tort hazırlama texnikaları',
        'Şokolad işləmə',
        'Krem növləri və souslar',
        'Dekorasiya sənəti',
        'Çörək və xəmir məmulatları',
        'Qida təhlükəsizliyi'
    ],
    'dma-konfrans': [
        'Tədbir planlaması',
        'Büdcə idarəetməsi',
        'Texniki koordinasiya',
        'Müştəri münasibətləri',
        'Risk idarəetməsi',
        'Komanda idarəçiliyi'
    ],
    'std-restoran-mudiri': [
        'Restoran əməliyyatlarının idarəsi',
        'P&L analizi və maliyyə idarəetmə',
        'Menyu mühəndisliyi',
        'İnsan resursları idarəçiliyi',
        'Marketinq strategiyaları',
        'Keyfiyyət nəzarəti'
    ],
    'std-coffeeshop': [
        'Kafe konsepti yaratma',
        'Biznes planı hazırlama',
        'Təchizat zənciri idarəetməsi',
        'Müştəri loyallıq proqramları',
        'Branding və marketinq',
        'Əməliyyat proseslərinin optimallaşdırılması'
    ],
    'std-franchise': [
        'Françayz müqaviləsi hazırlama',
        'Standartlaşdırma prosesləri',
        'Keyfiyyət nəzarəti sistemləri',
        'Şəbəkə genişləndirilməsi',
        'Royalti və ödəniş sistemləri',
        'Hüquqi aspektlər'
    ],
};

// Tərəfdaş şirkətlər - Gri logolar
const PARTNERS = [
    { name: 'Hilton', logo: '/partners/hilton.svg' },
    { name: 'Marriott', logo: '/partners/marriott.svg' },
    { name: 'Four Seasons', logo: '/partners/fourseasons.svg' },
    { name: 'Hyatt', logo: '/partners/hyatt.svg' },
    { name: 'Fairmont', logo: '/partners/fairmont.svg' },
    { name: 'Sheraton', logo: '/partners/sheraton.svg' },
];

// FAQ
const FAQ_DATA = {
    'CTH': [
        { q: 'CTH sertifikatı nədir?', a: 'CTH (Confederation of Tourism & Hospitality) İngiltərə əsaslı beynəlxalq akreditasiya orqanıdır. Sertifikatlarımız 100+ ölkədə tanınır.' },
        { q: 'İmtahan necə keçir?', a: 'İmtahanlar praktiki və nəzəri hissələrdən ibarətdir. İmtahanlar yalnız akademiyamızda keçirilir.' },
        { q: 'Sertifikat nə qədərə başa gəlir?', a: 'Sertifikat rüsumu kurs qiymətinə daxildir. Əlavə xərclər yalnız xüsusi hallarda (təkrar imtahan, sertifikat surəti) tətbiq olunur.' },
    ],
    'DMA': [
        { q: 'DMA proqramı ödənişsizdir?', a: 'Bəli! Dövlət Məşğulluq Agentliyi tərəfindən maliyyələşdirilir. Tələbələr aylıq 200 AZN təqaüd alır.' },
        { q: 'Kimlər müraciət edə bilər?', a: 'İşsiz şəxslər, torpaq payı olub digər işi olmayanlar, işaxtaran şəxslər (20% kvota). Üstün hüquq: 3 ildən artıq işləməyənlər, peşəsi olmayanlar, şəhid ailəsi üzvləri.' },
        { q: 'Dərslərə qatılım məcburidirmi?', a: 'Bəli! Dərslərə qatılım məcburidir. 8 dəfə dərsə qatılmayan tələbə proqramdan xaric edilir.' },
        { q: 'İş təminatı varmı?', a: 'Proqram bitdikdən sonra tərəfdaş şirkətlərimizlə iş müsahibəsinə göndəririk. 90%+ məzunumuz iş tapır.' },
    ],
    'STANDART': [
        { q: 'Taksit var mı?', a: 'Bəli, 3 aylıq taksit imkanı təqdim edirik.' },
        { q: 'Sertifikat verilirmi?', a: 'Bəli, kurs sonunda TQTA sertifikatı verilir.' },
        { q: 'Praktika var mı?', a: 'Bəli, bütün kurslarımız praktiki məşğələlərdən ibarətdir.' },
    ],
};

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const course = KURSLAR.find(k => k.id === id);
    const [openFaq, setOpenFaq] = useState(null);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gradient-to-br from-[#0A192F] to-[#1a3a5c]">
                <h1 className="text-3xl font-bold text-white">Kurs tapılmadı</h1>
                <p className="text-white/60">Axtardığınız kurs mövcud deyil</p>
                <Button onClick={() => router.push('/kurslar')} className="bg-[#C5A022] hover:bg-[#d4af37] text-[#0A192F]">
                    Bütün Kurslara Bax
                </Button>
            </div>
        );
    }

    const CourseIcon = COURSE_ICONS[id] || BookOpen;
    const courseImage = COURSE_IMAGES[id] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80';
    const learningOutcomes = LEARNING_OUTCOMES[id] || LEARNING_OUTCOMES['dma-ofisiant'];
    const jobs = JOB_OPPORTUNITIES[id] || [];
    const faqs = FAQ_DATA[course.tip] || FAQ_DATA['STANDART'];

    const praktikaPct = Math.round((course.muddet.dersProgrami.praktika / course.muddet.toplamSaat) * 100);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO SECTION */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={courseImage} 
                        alt={course.ad}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
                </div>

                {/* Back Button */}
                <button 
                    onClick={() => router.back()} 
                    className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Geri</span>
                </button>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                    <div className="max-w-2xl">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                                course.tip === 'CTH' 
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                    : course.tip === 'DMA'
                                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                    : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            }`}>
                                {course.tip === 'CTH' && <Globe className="h-4 w-4" />}
                                {course.tip === 'DMA' && <Award className="h-4 w-4" />}
                                {course.tip}
                                {course.cth && ` - ${course.cth.level}`}
                            </span>
                            {course.qiymet.dmaOdenissiz && (
                                <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-500/20 text-green-300 border border-green-500/30">
                                    ✓ Dövlət Maliyyələşdirməsi
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {course.ad}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-white/70 mb-8">
                            Beynəlxalq standartlarda peşəkar təhsil alaraq karyeranıza güclü başlanğıc edin
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="flex items-center gap-2 text-white/80">
                                <Calendar className="h-5 w-5 text-[#C5A022]" />
                                <span>{course.muddet.toplamGun} gün</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Clock className="h-5 w-5 text-[#C5A022]" />
                                <span>{course.muddet.toplamSaat} saat</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Users className="h-5 w-5 text-[#C5A022]" />
                                <span>Kiçik qruplar (max 12)</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Star className="h-5 w-5 text-[#C5A022]" />
                                <span>4.9 (120+ məzun)</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a 
                                href={`https://wa.me/994517696181?text=Salam, "${course.ad}" kursuna qeydiyyat olmaq istəyirəm.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-[#C5A022] text-[#0A192F] font-bold rounded-xl hover:bg-[#d4af37] transition-all hover:scale-105 shadow-lg shadow-[#C5A022]/30"
                            >
                                İndi Qeydiyyat Ol
                            </a>
                            {AVAILABLE_SYLLABI.includes(id) && (
                                <a 
                                    href={`/syllabi/${id}.pdf`} 
                                    download 
                                    className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                                >
                                    <Download className="h-5 w-5" />
                                    Proqramı Yüklə
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Price Card - Floating */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-80">
                        <div className="text-center mb-4">
                            {course.qiymet.dmaOdenissiz ? (
                                <>
                                    <div className="text-4xl font-bold text-green-600">PULSUZ</div>
                                    <div className="text-sm text-gray-500">Dövlət tərəfindən ödənilir</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-4xl font-bold text-[#0A192F]">{course.qiymet.satisAZN} ₼</div>
                                    <div className="text-sm text-gray-500">Taksit imkanı mövcuddur</div>
                                </>
                            )}
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Beynəlxalq sertifikat</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Praktiki təcrübə</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>İş təminatı dəstəyi</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Ömür boyu dəstək</span>
                            </div>
                        </div>

                        <a 
                            href={`https://wa.me/994517696181?text=Salam, "${course.ad}" kursu haqqında məlumat almaq istəyirəm.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-center"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <MessageCircle className="h-5 w-5" />
                                WhatsApp ilə Əlaqə
                            </span>
                        </a>
                        
                        <a href="tel:+994517696181" className="block w-full py-3 mt-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-center">
                            <span className="flex items-center justify-center gap-2">
                                <Phone className="h-5 w-5" />
                                +994 51 769 61 81
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* PROGRAM STRUCTURE */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left - Visual */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#0A192F] mb-6">Proqram Strukturu</h2>
                            
                            {/* Circular Progress */}
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                                    <circle
                                        cx="128"
                                        cy="128"
                                        r="100"
                                        stroke="#e5e7eb"
                                        strokeWidth="20"
                                        fill="none"
                                    />
                                    <circle
                                        cx="128"
                                        cy="128"
                                        r="100"
                                        stroke="#C5A022"
                                        strokeWidth="20"
                                        fill="none"
                                        strokeDasharray={`${praktikaPct * 6.28} ${(100 - praktikaPct) * 6.28}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-bold text-[#0A192F]">{praktikaPct}%</span>
                                    <span className="text-gray-500">Praktika</span>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex justify-center gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#C5A022]"></div>
                                    <span className="text-gray-700">Praktika: {course.muddet.dersProgrami.praktika} saat</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                                    <span className="text-gray-700">Nəzəriyyə: {course.muddet.dersProgrami.nezeriyye} saat</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Info Cards */}
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-[#0A192F] to-[#1a3a5c] rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#C5A022]/20 rounded-xl flex items-center justify-center">
                                        <Calendar className="h-6 w-6 text-[#C5A022]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">{course.muddet.toplamGun} Gün</div>
                                        <div className="text-white/60">Toplam müddət</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">{course.muddet.toplamSaat} Saat</div>
                                        <div className="text-white/60">Təlim saatı</div>
                                    </div>
                                </div>
                            </div>

                            {course.cth && (
                                <div className="bg-gradient-to-r from-[#C5A022] to-[#d4af37] rounded-2xl p-6 text-[#0A192F]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                                            <GraduationCap className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">{course.cth.level}</div>
                                            <div className="opacity-70">CTH UK Sertifikatı</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTH INTERNATIONAL OPPORTUNITIES */}
            {course.tip === 'CTH' && (
                <section className="py-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 relative overflow-hidden">
                    {/* World Map Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <svg className="w-full h-full" viewBox="0 0 1000 500" fill="white">
                            <ellipse cx="500" cy="250" rx="450" ry="200" stroke="white" strokeWidth="2" fill="none"/>
                            <ellipse cx="500" cy="250" rx="300" ry="200" stroke="white" strokeWidth="1" fill="none"/>
                            <ellipse cx="500" cy="250" rx="150" ry="200" stroke="white" strokeWidth="1" fill="none"/>
                            <line x1="50" y1="250" x2="950" y2="250" stroke="white" strokeWidth="1"/>
                            <line x1="500" y1="50" x2="500" y2="450" stroke="white" strokeWidth="1"/>
                        </svg>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-6 relative">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-purple-200 text-sm font-medium mb-6">
                                <Globe className="h-4 w-4" />
                                Beynəlxalq Tanınma
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Xaricdə İş İmkanları
                            </h2>
                            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
                                CTH sertifikatı 100+ ölkədə tanınır. Avropa, Körfəz ölkələri və dünyanın hər yerində 
                                prestijli otel və restoranlarda işləmək imkanı əldə edin.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {/* Europe & Turkey */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all group">
                                <div className="text-4xl mb-4">🇪🇺</div>
                                <h3 className="text-xl font-bold text-white mb-2">Avropa & Türkiyə</h3>
                                <p className="text-purple-200 text-sm mb-4">Türkiyə, İngiltərə, Almaniya, İsveçrə və digər ölkələrdə iş imkanları</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">İstanbul</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Antalya</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">London</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Zürich</span>
                                </div>
                            </div>

                            {/* Gulf & Russia */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all group">
                                <div className="text-4xl mb-4">🇦🇪</div>
                                <h3 className="text-xl font-bold text-white mb-2">Körfəz & Rusiya</h3>
                                <p className="text-purple-200 text-sm mb-4">BƏƏ, Qətər, Rusiya - yüksək maaşlı mövqelər</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Dubai</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Moskva</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Doha</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Soçi</span>
                                </div>
                            </div>

                            {/* Asia & Americas */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all group">
                                <div className="text-4xl mb-4">🌏</div>
                                <h3 className="text-xl font-bold text-white mb-2">Asiya & Amerika</h3>
                                <p className="text-purple-200 text-sm mb-4">Sinqapur, Maldiv, ABŞ, Kanada - beynəlxalq karyera yolları</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Singapore</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">Maldives</span>
                                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-purple-200">New York</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#C5A022] mb-1">100+</div>
                                <div className="text-purple-200 text-sm">Tanınan ölkə</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#C5A022] mb-1">$2,500+</div>
                                <div className="text-purple-200 text-sm">Orta xarici maaş</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#C5A022] mb-1">5★</div>
                                <div className="text-purple-200 text-sm">Otellərdə iş</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#C5A022] mb-1">Ömürlük</div>
                                <div className="text-purple-200 text-sm">Etibarlı sertifikat</div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center mt-12">
                            <a 
                                href={`https://wa.me/994517696181?text=Salam, "${course.ad}" kursu və xaricdə iş imkanları haqqında məlumat almaq istəyirəm.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A022] text-[#0A192F] font-bold rounded-xl hover:bg-[#d4af37] transition-all hover:scale-105 shadow-lg shadow-[#C5A022]/30"
                            >
                                <Globe className="h-5 w-5" />
                                Xarici İş İmkanları Haqqında Öyrən
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* DMA SPECIAL SECTION */}
            {course.tip === 'DMA' && (
                <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-6 relative">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
                                    <Award className="h-4 w-4" />
                                    Dövlət Dəstəkli Proqram
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-6">
                                    Dövlət Məşğulluq Agentliyi ilə Əməkdaşlıq
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Bu proqram Azərbaycan Respublikası Dövlət Məşğulluq Agentliyi (DMA) tərəfindən 
                                    maliyyələşdirilir. Siz heç bir ödəniş etmədən peşəkar təhsil alır və 
                                    iş bazarına hazır mütəxəssis olursunuz.
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">100% Pulsuz Təhsil</h4>
                                            <p className="text-blue-200 text-sm">Bütün xərclər dövlət tərəfindən ödənilir</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">Rəsmi Sertifikat</h4>
                                            <p className="text-blue-200 text-sm">DMA tərəfindən tanınan peşə sertifikatı</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">İş Təminatı Dəstəyi</h4>
                                            <p className="text-blue-200 text-sm">Proqram sonrası iş müsahibələrinə yönləndirmə</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <div className="text-center mb-6">
                                    <div className="text-6xl font-bold text-white mb-2">PULSUZ</div>
                                    <div className="text-blue-200">Dövlət tərəfindən maliyyələşdirilir</div>
                                </div>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-blue-200">Təhsil haqqı</span>
                                        <span className="text-white font-semibold">0 ₼</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-blue-200">Kitab və materiallar</span>
                                        <span className="text-white font-semibold">0 ₼</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-blue-200">Sertifikat rüsumu</span>
                                        <span className="text-white font-semibold">0 ₼</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-white font-bold text-lg">Toplam</span>
                                        <span className="text-green-400 font-bold text-2xl">PULSUZ</span>
                                    </div>
                                </div>
                                
                                <a 
                                    href={`https://wa.me/994517696181?text=Salam, "${course.ad}" DMA proqramına qeydiyyat olmaq istəyirəm. Şərtlər haqqında məlumat ala bilərəm?`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors text-center"
                                >
                                    Pulsuz Qeydiyyat
                                </a>
                                <p className="text-center text-blue-200 text-xs mt-4">
                                    * Yalnız DMA şərtlərinə uyğun namizədlər üçün
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* WHAT YOU'LL LEARN */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Nə Öyrənəcəksiniz?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Bu proqramı bitirdikdən sonra sahənin peşəkarı kimi işə başlamağa hazır olacaqsınız
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {learningOutcomes.map((outcome, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                            >
                                <div className="w-10 h-10 bg-[#C5A022]/10 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="h-5 w-5 text-[#C5A022]" />
                                </div>
                                <h3 className="font-semibold text-[#0A192F]">{outcome}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAREER OPPORTUNITIES */}
            {jobs.length > 0 && (
                <section className="py-16 bg-[#0A192F]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Karyera İmkanları</h2>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                Bu kurs ilə aşağıdakı vəzifələrə müraciət edə bilərsiniz
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            {jobs.map((job, index) => (
                                <div 
                                    key={index}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#C5A022]/50 transition-colors"
                                >
                                    <Briefcase className="h-6 w-6 text-[#C5A022] mb-3" />
                                    <h3 className="font-semibold text-white">{job}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-[#C5A022] mb-2">90%+</div>
                                <div className="text-white/60">İş təminatı nisbəti</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-[#C5A022] mb-2">1,000₼</div>
                                <div className="text-white/60">Orta başlanğıc maaş</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-[#C5A022] mb-2">50+</div>
                                <div className="text-white/60">Tərəfdaş şirkət</div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* PARTNERS */}
            <section className="py-16 bg-white border-y">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-gray-400 text-sm uppercase tracking-wider mb-10">Məzunlarımız bu şirkətlərdə işləyir</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                        {PARTNERS.map((partner, index) => (
                            <div key={index} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <img 
                                    src={partner.logo} 
                                    alt={partner.name}
                                    className="h-8 md:h-10 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span className="hidden text-gray-400 font-semibold text-lg">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Tez-tez Verilən Suallar</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-[#0A192F]">{faq.q}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4 text-gray-600">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-20 bg-gradient-to-r from-[#0A192F] via-[#1a3a5c] to-[#0A192F]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <CourseIcon className="h-16 w-16 text-[#C5A022] mx-auto mb-6" />
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Karyeranıza Bu Gün Başlayın
                    </h2>
                    <p className="text-xl text-white/70 mb-8">
                        {course.muddet.toplamGun} gündə peşəkar sertifikat alın, həyat boyu karyera qazanın
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href={`https://wa.me/994517696181?text=Salam, "${course.ad}" kursuna qeydiyyat olmaq istəyirəm.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 bg-[#C5A022] text-[#0A192F] font-bold text-lg rounded-xl hover:bg-[#d4af37] transition-all hover:scale-105 shadow-lg shadow-[#C5A022]/30"
                        >
                            Pulsuz Məsləhət Al
                        </a>
                        <a 
                            href="tel:+994517696181"
                            className="px-10 py-4 bg-transparent text-white font-semibold text-lg rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all"
                        >
                            Zəng Et: +994 51 769 61 81
                        </a>
                    </div>
                </div>
            </section>

            {/* MOBILE STICKY CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 lg:hidden z-50">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        {course.qiymet.dmaOdenissiz ? (
                            <div className="text-xl font-bold text-green-600">PULSUZ</div>
                        ) : (
                            <div className="text-xl font-bold text-[#0A192F]">{course.qiymet.satisAZN} ₼</div>
                        )}
                        <div className="text-xs text-gray-500">{course.muddet.toplamGun} gün</div>
                    </div>
                    <a 
                        href={`https://wa.me/994517696181?text=Salam, "${course.ad}" kursuna qeydiyyat olmaq istəyirəm.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 bg-[#C5A022] text-[#0A192F] font-bold rounded-xl text-center"
                    >
                        Qeydiyyat
                    </a>
                </div>
            </div>

            {/* Spacer for mobile sticky CTA */}
            <div className="h-20 lg:hidden"></div>
        </div>
    );
}
