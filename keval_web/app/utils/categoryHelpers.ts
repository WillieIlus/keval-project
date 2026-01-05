// types.ts (optional, but good for safety)
interface Category {
  id: number;
  name: string;
  subcategories?: Category[]; // Your API calls this 'subcategories'
}

interface FlatOption {
  id: number;
  label: string; // This will hold "— Child Name"
  originalName: string;
}

// The Helper Function
export function flattenCategories(
  categories: Category[], 
  level = 0
): FlatOption[] {
  
  let result: FlatOption[] = [];

  categories.forEach(cat => {
    // 1. Add the current category
    // We add dashes based on the 'level' of depth
    const prefix = level > 0 ? '— '.repeat(level) : '';
    
    result.push({
      id: cat.id,
      label: `${prefix}${cat.name}`, // "— — Subcategory"
      originalName: cat.name
    });

    // 2. If it has children, recursively add them (level + 1)
    if (cat.subcategories && cat.subcategories.length > 0) {
      result = result.concat(flattenCategories(cat.subcategories, level + 1));
    }
  });

  return result;
}