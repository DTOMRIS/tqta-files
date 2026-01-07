// src/app/landing/types.ts
// Bu dosya opsiyonel - sadece TypeScript hatalarını önlemek için

export enum Section {
  HERO = 'home',
  ABOUT = 'about',
  COURSES = 'courses',
  CONTACT = 'contact',
  ASSESSMENT = 'assessment',
  SIMULATOR = 'simulator'
}

export interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  certification: string;
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
}