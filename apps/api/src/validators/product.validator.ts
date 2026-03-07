import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().optional(),
  shortDesc: z.string().max(500).optional(),
  mrp: z.number().positive(),
  sellingPrice: z.number().positive(),
  costPrice: z.number().positive().optional(),
  sku: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  categoryId: z.string().cuid(),
  brand: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  hsnCode: z.string().optional(),
  gstRate: z.number().min(0).max(28).default(18),
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'popular']).optional(),
  featured: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
