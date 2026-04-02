import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { guestOrderService } from '../services/guest-order.service';

export const guestOrderController = {
  async createGuestOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await guestOrderService.createGuestOrder(req.body);
      sendSuccess(res, result, 'Order placed successfully', 201);
    } catch (error) {
      next(error);
    }
  },
};
