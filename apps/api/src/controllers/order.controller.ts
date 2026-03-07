import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { orderService } from '../services/order.service';

// TODO: Implement order controller methods
export const orderController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.getAll(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.getById(req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.create(req.body);
      sendSuccess(res, result, 'Order created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.update(req.params.id, req.body);
      sendSuccess(res, result, 'Order updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await orderService.delete(req.params.id);
      sendSuccess(res, null, 'Order deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
