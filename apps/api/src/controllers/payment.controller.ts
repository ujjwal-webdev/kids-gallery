import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { paymentService } from '../services/payment.service';
import { AuthRequest } from '../types';

export const paymentController = {
  async createRazorpayOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.body;
      const result = await paymentService.createRazorpayOrder(orderId);
      sendSuccess(res, result, 'Razorpay order created');
    } catch (error) {
      next(error);
    }
  },

  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
      const result = await paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      sendSuccess(res, result, 'Payment verified successfully');
    } catch (error) {
      next(error);
    }
  },

  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers['x-razorpay-signature'] as string;
      const result = await paymentService.handleWebhook((req as AuthRequest).rawBody ?? JSON.stringify(req.body), signature);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async processRefund(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId, amount } = req.body;
      const result = await paymentService.processRefund(orderId, amount);
      sendSuccess(res, result, 'Refund initiated');
    } catch (error) {
      next(error);
    }
  },
};
