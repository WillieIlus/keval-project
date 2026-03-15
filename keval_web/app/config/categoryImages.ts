/**
 * Category image mapping for Services section.
 * Uses cover_image from API when available; falls back to this map by category name.
 * Add local paths: '/images/categories/business-cards.jpg'
 */
export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'business cards': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'business card': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'brochures': 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80',
  'brochure': 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80',
  'flyers': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  'flyer': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  'posters': 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80',
  'poster': 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80',
  'banners': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  'roll-up': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  'roll up': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  'packaging': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'packaging boxes': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'books': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
  'book printing': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
  'garment': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  't-shirts': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  'branding': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'stationery': 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80',
  'letterheads': 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80',
  'invitations': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  'cards': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
}

export const DEFAULT_CATEGORY_IMAGE =
  'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80'
