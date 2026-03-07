import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const authRoutes = Router();

// TODO: Implement auth sendOtp
authRoutes.post('/send-otp', authController.sendOtp);

// TODO: Implement auth verifyOtp
authRoutes.post('/verify-otp', authController.verifyOtp);

// TODO: Implement auth refreshToken
authRoutes.post('/refresh', authController.refreshToken);

// TODO: Implement auth logout
authRoutes.post('/logout', authMiddleware, authController.logout);
