import { z } from 'zod';

export const createGuestOrderSchema = z.object({
  // Customer info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  email: z.string().email('Invalid email address'),

  // Shipping address
  address: z.object({
    line1: z.string().min(3, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(6, 'Pincode must be 6 digits').max(6),
  }),

  // Cart items
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        variantId: z.string().optional(),
        quantity: z.number().int().min(1).max(10),
      }),
    )
    .min(1, 'At least one item is required'),

  paymentMethod: z.literal('COD'),
  deliveryNotes: z.string().max(500).optional(),
});

export type CreateGuestOrderInput = z.infer<typeof createGuestOrderSchema>;
