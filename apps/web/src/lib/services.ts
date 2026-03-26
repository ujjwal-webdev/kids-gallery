// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// --- TYPES ---

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDesc: string | null;
  mrp: string; // Decimal comes as string from JSON
  sellingPrice: string;
  costPrice: string | null;
  sku: string | null;
  stock: number;
  categoryId: string;
  brand: string | null;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  images?: ProductImage[];
}

// --- SERVICES ---

/**
 * Fetch all active categories, optionally as a tree.
 */
export async function getCategories(asTree = false): Promise<Category[]> {
  const endpoint = asTree ? '/categories/tree' : '/categories';
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 * 5 }, // Cache for 5 minutes
  });

  if (!res.ok) {
    console.error('Failed to fetch categories:', await res.text());
    return [];
  }

  const data = await res.json();
  return data.data || [];
}

/**
 * Fetch all products, optionally filtered by category slug.
 */
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const url = new URL(`${API_URL}/products`);
  if (categorySlug) {
    url.searchParams.append('category', categorySlug);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 * 5 },
  });

  if (!res.ok) {
    console.error('Failed to fetch products:', await res.text());
    return [];
  }

  const data = await res.json();
  return data.data || [];
}

/**
 * Fetch featured products specifically.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products/featured`, {
    next: { revalidate: 60 * 5 },
  });

  if (!res.ok) {
    console.error('Failed to fetch featured products:', await res.text());
    return [];
  }

  const data = await res.json();
  return data.data || [];
}

/**
 * Fetch a single product by its slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${slug}`, {
    next: { revalidate: 60 }, // Cache for 1 minute
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    console.error(`Failed to fetch product ${slug}:`, await res.text());
    return null;
  }

  const data = await res.json();
  return data.data || null;
}
