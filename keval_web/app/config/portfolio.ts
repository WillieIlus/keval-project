/**
 * Portfolio section configuration.
 * Maps API category names to short, clean filter tab labels.
 */
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'all': 'All Projects',
  'branding': 'Branding',
  'design': 'Branding',
  'business cards': 'Branding',
  'stationery': 'Branding',
  'letterheads': 'Branding',
  'digital print': 'Digital Print',
  'digital printing': 'Digital Print',
  'commercial printing': 'Digital Print',
  'commercial & paper printing': 'Digital Print',
  'brochures': 'Digital Print',
  'flyers': 'Digital Print',
  'posters': 'Digital Print',
  'large format': 'Large Format',
  'banners': 'Large Format',
  'roll-up': 'Large Format',
  'roll up': 'Large Format',
  'packaging': 'Packaging',
  'packaging boxes': 'Packaging',
  'books': 'Books',
  'book printing': 'Books',
  'garment': 'Garment',
  'garment printing': 'Garment',
  't-shirts': 'Garment',
  'invitations': 'Digital Print',
  'cards': 'Branding'
}

/**
 * Fallback titles for generic project names.
 * Use category-based fallback when title is generic.
 */
export const GENERIC_TITLE_PATTERNS = ['trial', 'test', 'new project', 'sample', 'untitled', 'project 1', 'project 2']

export const CATEGORY_FALLBACK_TITLES: Record<string, string[]> = {
  'branding': ['Premium Business Cards', 'Corporate Branding Suite', 'Brand Identity Package'],
  'digital print': ['Corporate Brochure Printing', 'Marketing Collateral Set', 'Event Flyer Series'],
  'large format': ['Roll-Up Banner Display', 'Exhibition Stand Graphics', 'Retail Signage'],
  'packaging': ['Product Packaging Set', 'Custom Box Design', 'Branded Packaging Suite'],
  'books': ['Annual Report Printing', 'Book Printing Project', 'Publication Design'],
  'garment': ['Event Branding Materials', 'Promotional Apparel', 'Team Wear Collection']
}

export function getCategoryDisplayName(apiName: string): string {
  const key = (apiName || '').toLowerCase().trim()
  return CATEGORY_DISPLAY_NAMES[key] ?? apiName
}

/**
 * Print-related placeholder images when project has no cover.
 */
export const PROJECT_PLACEHOLDER_IMAGES: Record<string, string> = {
  'branding': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  'digital print': 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80',
  'large format': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  'packaging': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'books': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
  'garment': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
}

const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80'

export function getProjectPlaceholderImage(categoryName?: string): string {
  if (!categoryName) return DEFAULT_PLACEHOLDER
  const key = Object.keys(PROJECT_PLACEHOLDER_IMAGES).find(k =>
    categoryName.toLowerCase().includes(k)
  )
  return key ? PROJECT_PLACEHOLDER_IMAGES[key] : DEFAULT_PLACEHOLDER
}

export function getProjectDisplayTitle(title: string, categoryName?: string): string {
  const t = (title || '').trim()
  if (!t) return 'Project'
  const lower = t.toLowerCase()
  if (GENERIC_TITLE_PATTERNS.some(p => lower.includes(p))) {
    const catKey = (categoryName || '').toLowerCase()
    for (const [key, fallbacks] of Object.entries(CATEGORY_FALLBACK_TITLES)) {
      if (catKey.includes(key)) {
        const idx = Math.abs(t.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % fallbacks.length
        return fallbacks[idx]
      }
    }
    return 'Premium Print Project'
  }
  return t
}
