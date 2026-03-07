import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import { adminMiddleware } from '../../middleware/admin.middleware';
import { dashboardRoutes } from './dashboard.routes';
import { adminProductRoutes } from './product.routes';
import { adminOrderRoutes } from './order.routes';
import { adminCouponRoutes } from './coupon.routes';

export const adminRouter = Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.use('/dashboard', dashboardRoutes);
adminRouter.use('/products', adminProductRoutes);
adminRouter.use('/orders', adminOrderRoutes);
adminRouter.use('/coupons', adminCouponRoutes);
