
export interface Course {
  id: string;
  title: string;
  level: string;
  duration: string;
  image: string;
  description: string;
  certification: string;
  price?: number;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

export enum Section {
  HERO = 'hero',
  COURSES = 'courses',
  INVESTMENT = 'investment',
  DASHBOARD = 'dashboard',
  ABOUT = 'about',
  CONTACT = 'contact',
  ASSESSMENT = 'assessment',
  SIMULATOR = 'simulator',
  BLOG = 'blog',
  ANALYTICS = 'analytics',
  CHECKOUT = 'checkout'
}

export interface AgentTrajectory {
  id: string;
  intent: string;
  path: string[];
  decisionNodes: string[];
  outcome: 'Converted' | 'Dropped' | 'Pending';
  reasoning: string;
  probability: number;
}

export interface AnalyticsData {
  dailyLeads: number[];
  conversionRate: number;
  popularCourse: string;
  revenueForecast: number;
}
