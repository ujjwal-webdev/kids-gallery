import { OrderStatus, PaymentMethod } from '../types/order';

export const ORDER_STATUSES: OrderStatus[] = [
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
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  RETURN_REQUESTED: 'Return Requested',
  RETURNED: 'Returned',
  REFUNDED: 'Refunded',
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  'UPI',
  'CARD',
  'NET_BANKING',
  'WALLET',
  'COD',
  'EMI',
];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  UPI: 'UPI',
  CARD: 'Credit/Debit Card',
  NET_BANKING: 'Net Banking',
  WALLET: 'Wallet',
  COD: 'Cash on Delivery',
  EMI: 'EMI',
};

export const APP_NAME = "Kid's Gallery";
export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';
export const FREE_DELIVERY_THRESHOLD = 499;
export const DEFAULT_DELIVERY_CHARGE = 49;
export const MAX_CART_QUANTITY = 10;
