// ~/types/api.ts

// ============================================
// AUTH & USERS
// ============================================

export interface User {
  id: number
  email: string
  first_name?: string
  last_name?: string
  is_staff?: boolean
}

/**
 * Actual response from Django /api/auth/login/
 */
export interface LoginResponse {
  token: string
  user_id: number
  email: string
}

/**
 * Actual response from Django /api/auth/register/
 */
export interface RegisterResponse {
  token: string
  user_id: number
  email: string
  // Django might return user object on register
  user?: User
}

/**
 * Login form data
 */
export interface LoginFormData {
  email: string
  password: string
}

/**
 * Register form data
 */
export interface RegisterFormData {
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
}

// ============================================
// CORE / MARKETING CONTENT
// ============================================

export interface Banner {
  id: number
  title: string
  subtitle: string
  image: string
  cta_text?: string
  cta_link?: string
  order: number
  is_active: boolean
}

export interface CoreValue {
  id: number
  title: string
  description: string
  icon: string
  order: number
}

export interface WhyChooseUs {
  id: number
  title: string
  description: string
  icon: string
  order: number
}

export interface TeamMember {
  id: number
  name: string
  title: string
  bio: string
  image: string
  department: string
  linkedin?: string
  twitter?: string
  email?: string
  order: number
  is_active: boolean
}

// ============================================
// CONTACT FORM
// ============================================

export interface ContactFormData {
  name: string
  email: string
  phone: string
  service_interest: string
  message: string
}

export interface ContactSubmissionResponse {
  id: number
  name: string
  email: string
  phone: string
  service_interest: string
  message: string
  submitted_at: string
}

// ============================================
// SOCIAL PROOF
// ============================================

export interface Client {
  id: number
  name: string
  logo: string
  website?: string
  is_featured: boolean
  order: number
}

export interface Testimonial {
  id: number
  client_name: string
  company?: string
  position: string
  avatar?: string
  content: string
  rating: number
  created_at: string
  formatted_date?: string
}

// ============================================
// GALLERY / PORTFOLIO
// ============================================

export interface ProjectImage {
  id: number
  image: string
  caption?: string
  is_cover: boolean
  order: number
}

export interface Project {
  id: number
  title: string
  slug: string
  client: string
  description: string
  print_method: string
  material_used: string
  finishing: string
  date_completed: string
  is_featured: boolean
  category: number
  category_name?: string
  images: ProjectImage[]
  created_at: string
}

export interface ServiceCategory {
  id: number
  name: string
  slug?: string
  icon?: string
  cover_image?: string
  description?: string
  parent: number | null
  subcategories: ServiceCategory[]
  projects: Project[]
}

// ============================================
// GENERIC
// ============================================

export interface ApiError {
  detail?: string
  message?: string
  [key: string]: string | string[] | undefined
}