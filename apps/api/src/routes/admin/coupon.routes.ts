import { Router } from 'express';
import { couponController } from '../../controllers/coupon.controller';

export const adminCouponRoutes = Router();

adminCouponRoutes.get('/', couponController.getAllCoupons);
adminCouponRoutes.post('/', couponController.createCoupon);
adminCouponRoutes.put('/:id', couponController.updateCoupon);
adminCouponRoutes.delete('/:id', couponController.deleteCoupon);

