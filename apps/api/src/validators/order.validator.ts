import { z } from 'zod';

export const createOrderSchema = z.object({
  addressId: z.string().cuid(),
  paymentMethod: z.enum(['UPI', 'CARD', 'NET_BANKING', 'WALLET', 'COD', 'EMI']),
  couponCode: z.string().optional(),
  deliveryNotes: z.string().max(500).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'PACKED',
    'SHIPPED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
    'RETURN_REQUESTED',
    'RETURNED',
    'REFUNDED',
  ]),
  note: z.string().optional(),
});
