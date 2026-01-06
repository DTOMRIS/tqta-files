
import { Course, Module, BlogPost, AgentTrajectory, AssessmentQuestion, StudentProfile } from './types';

export const NAVY_BLUE = 'bg-[#0A192F]';
export const TEAL = 'text-[#0097A7]';
export const TEAL_BG = 'bg-[#0097A7]';
export const GOLD = 'text-[#C5A022]';
export const GOLD_BG = 'bg-[#C5A022]';

export const COURSES: (Course & { category: string })[] = [
  {
    id: 'c1',
    category: 'Kulinariya',
    title: 'Peşəkar Aşpazlıq Proqramı',
    level: 'Professional',
    duration: '2-7 Ay',
    description: 'Mətbəx təhlükəsizliyi, kulinariya texnikaları, Türk və Dünya mətbəxi.',
    certification: 'CTH Level 3',
    image: 'https://images.unsplash.com/photo-1577214282222-03478d206217?auto=format&fit=crop&q=80&w=600',
    price: 1200
  },
  {
    id: 'm1',
    category: 'İdarəetmə',
    title: 'Restoran İdarəçiliyi',
    level: 'Liderlik',
    duration: '1 Ay',
    description: 'Maliyyə, marketing və personal idarəetməsi strategiyaları.',
    certification: 'Management Diploma',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600',
    price: 850
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
  { id: 1, category: 'Community', text: 'Komanda ilə işləmək mənə enerji verir', image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?auto=format&fit=crop&q=80&w=600' },
  { id: 2, category: 'Craftsmanship', text: 'Mətbəxdə hər şeyin mükəmməl və nizamlı olması vacibdir', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600' }
];

export const MOCK_STUDENTS: StudentProfile[] = [
  { name: "Aysel Məmmədova", course: "Professional Cookery", gpa: "4.8", specialization: "Pastry", graduationYear: "2024" }
];
