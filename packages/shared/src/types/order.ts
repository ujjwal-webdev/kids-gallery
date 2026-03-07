export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED'
  | 'REFUNDED';

export type PaymentStatus =
  | 'PENDING'
  | 'PAID'
  | 'FAILED'
  | 'REFUNDED'
  | 'COD_PENDING'
  | 'COD_COLLECTED';

export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET' | 'COD' | 'EMI';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  gstRate: number;
  gstAmount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  addressId: string;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  taxAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  couponDiscount?: number;
  deliveryNotes?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
