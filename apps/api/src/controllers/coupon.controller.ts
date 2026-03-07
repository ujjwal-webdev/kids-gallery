import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { couponService } from '../services/coupon.service';
import { AuthRequest } from '../types';

export const couponController = {
  async validateCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const { code, cartTotal } = req.body;
      const result = await couponService.validateCoupon(code, cartTotal, userId);
      sendSuccess(res, result, 'Coupon is valid');
    } catch (error) {
      next(error);
    }
  },

  async getAllCoupons(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.getAllCoupons();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async createCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.createCoupon(req.body);
      sendSuccess(res, result, 'Coupon created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.updateCoupon(req.params.id, req.body);
      sendSuccess(res, result, 'Coupon updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      await couponService.deleteCoupon(req.params.id);
      sendSuccess(res, null, 'Coupon deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
