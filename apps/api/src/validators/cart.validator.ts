import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().cuid(),
  variantId: z.string().cuid().optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be 0 or greater'),
});

export const syncCartSchema = z.object({
  items: z.array(z.object({
    productId: z.string(), // Allowing general string here if cuid check is too strict for some mock data
    variantId: z.string().optional(),
    quantity: z.number().int().min(1)
  }))
});
