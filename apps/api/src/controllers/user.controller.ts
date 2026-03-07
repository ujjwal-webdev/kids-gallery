import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { userService } from '../services/user.service';
import { AuthRequest } from '../types';

export const userController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await userService.getProfile(userId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await userService.updateProfile(userId, req.body);
      sendSuccess(res, result, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await userService.getAddresses(userId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async addAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await userService.addAddress(userId, req.body);
      sendSuccess(res, result, 'Address added successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await userService.updateAddress(userId, req.params.id, req.body);
      sendSuccess(res, result, 'Address updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      await userService.deleteAddress(userId, req.params.id);
      sendSuccess(res, null, 'Address deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  async setDefaultAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await userService.setDefaultAddress(userId, req.params.id);
      sendSuccess(res, result, 'Default address set');
    } catch (error) {
      next(error);
    }
  },
};
