import { Router } from 'express';
import { couponController } from '../controllers/coupon.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const couponRoutes = Router();

// TODO: Implement coupon validation (check eligibility, expiry, usage limits)
couponRoutes.post('/validate', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Validate coupon code against user's cart and order amount
    const { code } = req.body as { code: string };
    res.json({ success: true, message: `Coupon ${code} validation - TODO` });
  } catch (error) {
    next(error);
  }
});
