import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
  limit: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 20)),
});

export const idParamSchema = z.object({
  id: z.string().cuid(),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1),
});

export const addressSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  addressLine1: z.string().min(5).max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  pinCode: z.string().regex(/^\d{6}$/, 'Invalid PIN code'),
  isDefault: z.boolean().default(false),
  type: z.enum(['HOME', 'WORK', 'OTHER']).default('HOME'),
});
