import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { authService } from '../services/auth.service';

export const authController = {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.body;
      // TODO: Implement OTP sending via SMS provider
      await authService.sendOtp(phone);
      sendSuccess(res, null, 'OTP sent successfully');
    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, otp } = req.body;
      // TODO: Verify OTP and return JWT token
      const result = await authService.verifyOtp(phone, otp);
      sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Implement token refresh
      sendSuccess(res, null, 'Token refreshed');
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Invalidate token
      sendSuccess(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  },
};
