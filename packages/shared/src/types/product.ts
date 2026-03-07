export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  type: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
  sku?: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDesc?: string;
  mrp: number;
  sellingPrice: number;
  costPrice?: number;
  sku?: string;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  categoryId: string;
  brand?: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;
  metaTitle?: string;
  metaDesc?: string;
  hsnCode?: string;
  gstRate: number;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  children?: Category[];
}
