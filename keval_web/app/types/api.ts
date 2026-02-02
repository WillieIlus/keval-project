// ~/types/api.ts

// ============================================
// UTILITIES (Recommended)
// ============================================

/**
 * Standard Django DRF Pagination Response
 * Usage: PaginatedResponse<Project>
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Generic params for filtering/pagination
 */
export interface ApiQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  category?: number;
  is_featured?: boolean;
}

// ============================================
// AUTH & USERS
// ============================================

export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
}

export interface LoginResponse {
  token: string;
  user_id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
}

export interface RegisterResponse {
  token: string;
  user_id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  user?: User;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}

// ============================================
// CORE / MARKETING CONTENT
// ============================================

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string; // URL from API
  cta_text?: string;
  cta_link?: string;
  order: number;
  is_active: boolean;
}

export interface CoreValue {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface WhyChooseUs {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  department: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  order: number;
  is_active: boolean;
}

// ============================================
// CONTACT FORM
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
}

export interface ContactSubmissionResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
  submitted_at: string;
}

// ============================================
// SOCIAL PROOF
// ============================================

export interface Client {
  id: number;
  name: string;
  logo: string;
  website?: string;
  is_featured: boolean;
  order: number;
}

export interface Testimonial {
  id: number;
  client_name: string;
  company?: string;
  position: string;
  avatar?: string;
  content: string;
  rating: number;
  created_at: string;
  formatted_date?: string;
}

// ============================================
// GALLERY / PORTFOLIO
// ============================================

export interface ProjectImage {
  id: number;
  image: string;
  caption?: string;
  is_cover: boolean;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  client: string;
  description: string;
  print_method: string;
  material_used: string;
  finishing: string;
  date_completed: string;
  is_featured: boolean;
  category: number;
  category_name?: string;
  images: ProjectImage[];
  created_at: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug?: string;
  icon?: string;
  cover_image?: string;
  description?: string;
  parent: number | null;
  subcategories: ServiceCategory[]; // Recursive type
  projects: Project[];
}

// ============================================
// GENERIC ERRORS
// ============================================

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: string | string[] | undefined;
}

// ============================================
// FORM DATA TYPES (Create / Update)
// NOTE: Union type `File | string | null` handles:
// 1. File: New upload
// 2. string: Existing image URL (no change)
// 3. null: Remove image
// ============================================

export interface BannerFormData {
  title: string;
  subtitle: string;
  image: File | string | null;
  cta_text: string;
  cta_link: string;
  order: number;
  is_active: boolean;
}

export interface ClientFormData {
  name: string;
  logo: File | string | null;
  website: string;
  is_featured: boolean;
  order: number;
}

export interface CoreValueFormData {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface WhyChooseUsFormData {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface TestimonialFormData {
  client_name: string;
  company: string;
  position: string;
  avatar: File | string | null;
  content: string;
  rating: number;
}

export interface TeamMemberFormData {
  name: string;
  title: string;
  bio: string;
  image: File | string | null;
  department: string;
  linkedin: string;
  twitter: string;
  email: string;
  order: number;
  is_active: boolean;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  client: string;
  description: string;
  print_method: string;
  material_used: string;
  finishing: string;
  date_completed: string; // YYYY-MM-DD
  is_featured: boolean;
  category: number | null;
}

export interface ProjectImageFormData {
  image: File | string | null;
  caption: string;
  is_cover: boolean;
  order: number;
}