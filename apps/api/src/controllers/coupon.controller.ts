import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { couponService } from '../services/coupon.service';

export const couponController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.getAllCoupons();
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.getCouponById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.createCoupon(req.body);
      sendSuccess(res, result, 'Coupon created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.updateCoupon(req.params.id, req.body);
      sendSuccess(res, result, 'Coupon updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await couponService.deleteCoupon(req.params.id);
      sendSuccess(res, null, 'Coupon deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
