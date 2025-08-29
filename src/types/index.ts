// Base types
export type ID = string | number;

export type URL = string;

// Project related types
export interface ProjectLink {
  url: URL;
  label: string;
  type: "github" | "live" | "demo" | "docs";
}

export interface Project {
  readonly id: ID;
  title: string;
  description: string;
  longDescription?: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  imageUrl: string;
  imageAlt?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "archived";
  dateCreated: string; // ISO date string
  tags?: readonly string[];
  // Legacy support - will be deprecated
  githubUrl?: string;
  liveUrl?: string;
}

// Experience related types
export interface ExperienceAchievement {
  description: string;
  impact?: string;
}

export interface Experience {
  readonly id: ID;
  company: string;
  position: string;
  location?: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string, undefined for current position
  duration: string; // Human readable duration
  description: string | string[]; // Support both formats
  achievements?: readonly ExperienceAchievement[];
  technologies: readonly string[];
  companyUrl?: URL;
  companyLogo?: string;
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
}

// Contact related types
export interface SocialLink {
  platform: string;
  url: URL;
  username: string;
  icon?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  timezone?: string;
  socialLinks: readonly SocialLink[];
  resumeUrl?: URL;
  availability: "available" | "busy" | "not-looking";
  // Legacy support - will be deprecated
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

// Personal information types
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  bio: string;
  avatar: string;
  avatarAlt?: string;
  tagline?: string;
  yearsOfExperience: number;
}

// Portfolio data aggregate type
export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: readonly Project[];
  experience: readonly Experience[];
  contactInfo: ContactInfo;
}

// Utility types for components
export type ProjectStatus = Project["status"];
export type ExperienceType = Experience["type"];
export type AvailabilityStatus = ContactInfo["availability"];
