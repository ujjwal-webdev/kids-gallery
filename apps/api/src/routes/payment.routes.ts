import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

export const paymentRoutes = Router();

paymentRoutes.post('/create-order', authMiddleware, paymentController.createRazorpayOrder);
paymentRoutes.post('/verify', authMiddleware, paymentController.verifyPayment);
paymentRoutes.post('/webhook', paymentController.handleWebhook);
paymentRoutes.post('/refund', authMiddleware, adminMiddleware, paymentController.processRefund);

