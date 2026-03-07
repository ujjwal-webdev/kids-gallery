import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { paymentService } from '../services/payment.service';

// TODO: Implement payment controller methods
export const paymentController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.getAll(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.getById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.create(req.body);
      sendSuccess(res, result, 'Payment created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.update(req.params.id, req.body);
      sendSuccess(res, result, 'Payment updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await paymentService.delete(req.params.id);
      sendSuccess(res, null, 'Payment deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
