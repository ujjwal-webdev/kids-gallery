import { Router } from 'express';
import { couponController } from '../controllers/coupon.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

export const couponRoutes = Router();

couponRoutes.post('/validate', authMiddleware, couponController.validateCoupon);
couponRoutes.get('/', authMiddleware, adminMiddleware, couponController.getAllCoupons);
couponRoutes.post('/', authMiddleware, adminMiddleware, couponController.createCoupon);
couponRoutes.put('/:id', authMiddleware, adminMiddleware, couponController.updateCoupon);
couponRoutes.delete('/:id', authMiddleware, adminMiddleware, couponController.deleteCoupon);

