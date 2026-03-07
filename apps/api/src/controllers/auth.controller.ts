import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { authService } from '../services/auth.service';
import { AuthRequest } from '../types';

export const authController = {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.body;
      await authService.sendOtp(phone);
      sendSuccess(res, null, 'OTP sent successfully');
    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, otp } = req.body;
      const result = await authService.verifyOtp(phone, otp);
      sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await authService.refreshToken(userId);
      sendSuccess(res, result, 'Token refreshed');
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await authService.getProfile(userId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccess(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  },
};
