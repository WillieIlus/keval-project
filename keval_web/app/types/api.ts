// ~/types/api.ts

// ============================================
// AUTH & USERS
// ============================================

/**
 * Matches the Django CustomUser model serializer.
 */
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean; // Used for Admin badge in dashboard
  // Add other profile fields if your Django User model has them (e.g., avatar)
}

/**
 * Response structure from /api/auth/login/ and /api/auth/register/
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Payload for registration endpoint
 */
export interface RegisterCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

/**
 * Payload for login endpoint
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

// ============================================
// CORE / MARKETING CONTENT
// ============================================

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;     // URL to the image
  cta_text?: string; // Optional call-to-action text
  cta_link?: string; // Optional link
  order: number;
  is_active: boolean; // Used in core store getter 'activeBanners'
}

export interface CoreValue {
  id: number;
  title: string;
  description: string;
  icon: string;      // specific icon name or image URL
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

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
}

// ============================================
// SOCIAL PROOF (Clients & Testimonials)
// ============================================

export interface Client {
  id: number;
  name: string;
  logo: string;       // URL to logo image
  website?: string;
  is_featured: boolean; // Used to filter 'featuredClients'
  order: number;
}

export interface Testimonial {
  id: number;
  client_name: string;
  company?: string;
  client_position: string; // Used in template: {{ testimonial.client_position }}
  avatar?: string;
  content: string;
  rating: number;     // 1-5 integer
  created_at: string; // ISO Date string
}

// ============================================
// GALLERY / PORTFOLIO
// ============================================

export interface ProjectImage {
  id: number;
  image: string;      // URL
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
  
  // Technical details
  print_method: string;
  material_used: string;
  finishing: string;
  
  date_completed: string; // ISO Date string
  is_featured: boolean;   // Used in dashboard stats
  
  // Relationships
  category: number;       // ID of the category
  category_name?: string; // Flattened field from serializer for easy display
  
  images: ProjectImage[];
  created_at: string;
}

/**
 * Recursive category structure for the sidebar/navigation
 */
export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  cover_image?: string;
  description?: string;
  
  parent: number | null; // ID of parent category or null if top-level
  
  // Nested data from Django Serializers
  subcategories: ServiceCategory[]; 
  projects: Project[];
}

// ============================================
// GENERIC API UTILS
// ============================================

/**
 * Standard Django REST Framework error format
 */
export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: string | string[] | undefined; // For field-specific errors
}