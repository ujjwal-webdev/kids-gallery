import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { paymentService } from '../services/payment.service';
import { ValidationError } from '../utils/apiError';

export const paymentController = {
  async createRazorpayOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.createRazorpayOrder(req.params.orderId);
      sendSuccess(res, result);
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
      const result = await paymentService.handleWebhook(req.body, signature);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async processRefund(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount } = req.body;
      const result = await paymentService.processRefund(req.params.orderId, amount);
      sendSuccess(res, result, 'Refund processed successfully');
    } catch (error) {
      next(error);
    }
  },

  // Generic alias used by /payment/create route — creates a Razorpay order for the given orderId in the request body
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.body;
      if (!orderId) throw new ValidationError('orderId is required');
      const result = await paymentService.createRazorpayOrder(orderId);
      sendSuccess(res, result, 'Payment order created successfully', 201);
    } catch (error) {
      next(error);
    }
  },
};
