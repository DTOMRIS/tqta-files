import { GraduationCap, Award, Globe, BookOpen, Clock, Users, ChefHat, Coffee, Utensils } from "lucide-react";

// --- RENK PALETİ (EKSİK OLAN KISIM) ---
export const GOLD = "#C5A022";
export const GOLD_BG = "rgba(197, 160, 34, 0.1)";
export const NAVY_BLUE = "#0A192F";
export const TEAL = "#0097A7";
export const TEAL_BG = "rgba(0, 151, 167, 0.1)";

// --- NAV LİNKLERİ ---
export const NAV_LINKS = [
  { label: "Ana Səhifə", href: "#home" },
  { label: "Haqqımızda", href: "#about" },
  { label: "Proqramlar", href: "#courses" },
  { label: "Atölyələr", href: "#workshops" },
  { label: "Karyera Testi", href: "#assessment" },
  { label: "İnvestisiya", href: "#investment" },
  { label: "Əlaqə", href: "#contact" },
];

// --- WORKSHOPS ---
export const WORKSHOPS = [
  {
    id: 1,
    title: "Milli Mətbəx Sirləri",
    description: "Azərbaycan mətbəxinin incəliklərini peşəkar şeflərdən öyrənin.",
    duration: "3 Gün",
    level: "Başlanğıc",
    instructor: "Şef Elvin",
    price: 150,
    image: "https://images.unsplash.com/photo-1626804475297-411dbe6314c9?auto=format&fit=crop&q=80&w=800",
    category: "Kulinariya"
  },
  {
    id: 2,
    title: "Barista Sənəti 101",
    description: "Qəhvə növləri, qovurma üsulları və mükəmməl espresso hazırlama.",
    duration: "2 Gün",
    level: "Orta",
    instructor: "Barista Leyla",
    price: 120,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    category: "İçki"
  },
  {
    id: 3,
    title: "Restoran İdarəçiliyi",
    description: "Uğurlu restoran biznesi qurmaq üçün lazım olan təməl biliklər.",
    duration: "1 Həftə",
    level: "İrəli",
    instructor: "Mehmet Bəy",
    price: 300,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
    category: "Biznes"
  }
];

// --- COURSES ---
export const COURSES = [
  {
    id: "pro-chef",
    title: "Professional Aşpazlıq",
    level: "CTH Level 2",
    duration: "6 Ay",
    description: "Beynəlxalq standartlarda professional aşpazlıq təhsili.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80",
    modules: 12,
    students: 150,
    rating: 4.9
  },
  {
    id: "pastry",
    title: "Şirniyyat Sənəti",
    level: "CTH Level 2",
    duration: "4 Ay",
    description: "Modern və klassik şirniyyatların hazırlanması.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80",
    modules: 8,
    students: 120,
    rating: 4.8
  },
  {
    id: "service",
    title: "Restoran Xidməti",
    level: "CTH Level 2",
    duration: "3 Ay",
    description: "Yüksək səviyyəli restoran xidməti və qonaqpərvərlik.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80",
    modules: 6,
    students: 200,
    rating: 4.9
  }
];

// --- INSTRUCTORS ---
export const INSTRUCTORS = [
  {
    id: 1,
    name: "Cihan Bıçakçı",
    role: "Baş Şef & Təsisçi",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80",
    bio: "20 illik beynəlxalq təcrübəyə malik Michelin ulduzlu restoran təcrübəsi.",
    specialties: ["Modern Mətbəx", "Restoran İdarəçiliyi"]
  },
  {
    id: 2,
    name: "Fırat Dursun",
    role: "Master Şef",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80",
    bio: "Türk və Osmanlı mətbəxinin incəlikləri üzrə mütəxəssis.",
    specialties: ["Türk Mətbəx", "Ət Texnologiyaları"]
  },
  {
    id: 3,
    name: "Mehmet Arif",
    role: "Kulinariya Direktoru",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    bio: "Beynəlxalq qida təhlükəsizliyi və menyu planlama eksperti.",
    specialties: ["Qida Təhlükəsizliyi", "Menyu Mühəndisliyi"]
  }
];

// --- TESTIMONIALS ---
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Aysel Məmmədova",
    role: "Məzun - 2024",
    content: "TQTA mənə sadəcə yemək bişirməyi yox, bu işin fəlsəfəsini öyrətdi. İndi öz restoranımı idarə edirəm.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Rəşad Əliyev",
    role: "Sous Chef @ Hilton",
    content: "Burada aldığım beynəlxalq sertifikat sayəsində qlobal otellərdə iş tapmaq çox asan oldu.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  }
];

// --- KARYERA TESTİ SORULARI (EKSİK OLAN KISIM) ---
export const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    text: "Mətbəxdə ən çox nəyi sevirsiniz?",
    options: [
      { text: "Yeni dadlar yaratmağı", score: { creative: 2, technical: 1 } },
      { text: "Dəqiqliyi və nizamı", score: { creative: 0, technical: 2 } },
      { text: "Komanda ilə işləməyi", score: { leadership: 2, social: 2 } }
    ]
  },
  {
    id: 2,
    text: "Stressli anlarda necə davranırsınız?",
    options: [
      { text: "Sakit qalıb həll yolu axtarıram", score: { leadership: 2 } },
      { text: "Hərəkətə keçib işi bitirirəm", score: { practical: 2 } },
      { text: "Digərlərinə kömək edirəm", score: { social: 2 } }
    ]
  },
  {
    id: 3,
    text: "Gələcəkdə özünüzü harada görürsünüz?",
    options: [
      { text: "Öz restoranımda", score: { entrepreneur: 3 } },
      { text: "5 ulduzlu oteldə şef kimi", score: { professional: 2 } },
      { text: "Dünyanı gəzərkən", score: { explorer: 2 } }
    ]
  }
];

// --- BAŞARI SİMÜLATÖRÜ VERİLERİ (EKSİK OLAN KISIM) ---
export const MOCK_TRAJECTORIES = [
  { year: 1, salary: 500, role: "Stajyer" },
  { year: 2, salary: 800, role: "Commis Chef" },
  { year: 3, salary: 1200, role: "Demi Chef" },
  { year: 4, salary: 1800, role: "Chef de Partie" },
  { year: 5, salary: 2500, role: "Sous Chef" }
];