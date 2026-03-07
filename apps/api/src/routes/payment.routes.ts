import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const paymentRoutes = Router();

// TODO: Implement create Razorpay order
paymentRoutes.post('/create', authMiddleware, paymentController.create);

// TODO: Implement payment verification (validate Razorpay signature)
paymentRoutes.post('/verify', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Verify Razorpay payment signature and update order payment status
    res.json({ success: true, message: 'Payment verification - TODO' });
  } catch (error) {
    next(error);
  }
});

// TODO: Implement Razorpay webhook handler (no auth - verified via HMAC signature)
paymentRoutes.post('/webhook', async (req, res, next) => {
  try {
    // TODO: Verify webhook signature and handle payment events (payment.captured, etc.)
    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});
