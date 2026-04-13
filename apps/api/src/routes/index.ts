import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { productRoutes } from './product.routes';
import { categoryRoutes } from './category.routes';
import { cartRoutes } from './cart.routes';
import { orderRoutes } from './order.routes';
import { userRoutes } from './user.routes';
import { couponRoutes } from './coupon.routes';
import { reviewRoutes } from './review.routes';
import { bannerRoutes } from './banner.routes';
import { paymentRoutes } from './payment.routes';
import { deliveryRoutes } from './delivery.routes';
import { adminRouter } from './admin';
import { guestOrderRoutes } from './guest-order.routes';
import { wishlistRoutes } from './wishlist.routes';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/coupons', couponRoutes);
router.use('/reviews', reviewRoutes);
router.use('/banners', bannerRoutes);
router.use('/payments', paymentRoutes);
router.use('/delivery', deliveryRoutes);
router.use('/admin', adminRouter);
router.use('/guest-orders', guestOrderRoutes);
router.use('/wishlist', wishlistRoutes);

