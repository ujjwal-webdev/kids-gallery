import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { orderService } from '../services/order.service';

export const orderController = {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const result = await orderService.createOrder(userId, req.body as {
        addressId: string;
        paymentMethod: string;
        couponCode?: string;
        deliveryNotes?: string;
      });
      sendSuccess(res, result, 'Order placed successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const result = await orderService.getOrders(userId, req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const result = await orderService.getOrderById(userId, req.params.id);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const result = await orderService.cancelOrder(userId, req.params.id);
      sendSuccess(res, result, 'Order cancelled successfully');
    } catch (error) {
      next(error);
    }
  },

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, note } = req.body as { status: string; note?: string };
      const result = await orderService.updateOrderStatus(req.params.id, status, note);
      sendSuccess(res, result, 'Order status updated');
    } catch (error) {
      next(error);
    }
  },

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.getAllOrders(req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },
};
