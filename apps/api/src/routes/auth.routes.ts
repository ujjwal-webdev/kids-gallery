import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { sendOtpSchema, verifyOtpSchema } from '../validators/auth.validator';

export const authRoutes = Router();

authRoutes.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);
authRoutes.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);
authRoutes.post('/refresh-token', authMiddleware, authController.refreshToken);
authRoutes.get('/profile', authMiddleware, authController.getProfile);
authRoutes.post('/logout', authMiddleware, authController.logout);

