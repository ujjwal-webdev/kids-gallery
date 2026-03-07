import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { couponService } from '../services/coupon.service';

// TODO: Implement coupon controller methods
export const couponController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.getAll(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.getById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.create(req.body);
      sendSuccess(res, result, 'Coupon created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponService.update(req.params.id, req.body);
      sendSuccess(res, result, 'Coupon updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await couponService.delete(req.params.id);
      sendSuccess(res, null, 'Coupon deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
