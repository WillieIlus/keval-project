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
export function flattenCategories(categories: any[], level = 0): any[] {
  let result: any[] = [];
  categories.forEach(cat => {
    const prefix = level > 0 ? '— '.repeat(level) : '';
    result.push({
      id: cat.id,
      label: `${prefix}${cat.name}`,
      originalName: cat.name
    });
    if (cat.subcategories && cat.subcategories.length > 0) {
      result = result.concat(flattenCategories(cat.subcategories, level + 1));
    }
  });
  return result;
}