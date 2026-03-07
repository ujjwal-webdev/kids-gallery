export { APP_NAME, CURRENCY_SYMBOL, FREE_DELIVERY_THRESHOLD, DEFAULT_DELIVERY_CHARGE } from '@kids-gallery/shared';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/profile',
  WISHLIST: '/wishlist',
} as const;
