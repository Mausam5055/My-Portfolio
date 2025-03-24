export interface Education {
  degree: string;
  institution: string;
  year: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description?: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  image: string;
  description: string;
  driveLinks?: string[];
}

export interface Qualification {
  id: string;
  degree: string;
  institution: string;
  year: string;
  image: string;
  driveLink: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  logo: string;
  link: string;
  description: string;
  skills: string[];
  credentialId?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
}

export interface Artwork {
  title: string;
  image: string;
  description: string;
  medium: string;
  year: string;
  dimensions: string;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

export interface Journey {
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  description: string;
  subphotos?: {
    url: string;
    title: string;
    description: string;
  }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  title: string;
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  email: string;
  phone: string;
  socials: SocialLink[];
  faqs: FAQ[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

export interface Inspiration {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  link?: string;
  category: 'tech' | 'art' | 'business' | 'personal';
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  timeline: string;
  progress: number;
  icon: string;
  milestones: {
    title: string;
    completed: boolean;
  }[];
}

export interface FunFact {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'tech' | 'personal' | 'travel' | 'hobby';
}

export interface ContentBox { // Added ContentBox interface
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Quote { // Added Quote interface
  text: string;
  author: string;
}

export type Chapter = {
  id: string;
  title: string;
  image: string;
  description: string;
  driveLinks: string[]; // Changed from driveLink to driveLinks array
}

export type BlogPost = {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
};