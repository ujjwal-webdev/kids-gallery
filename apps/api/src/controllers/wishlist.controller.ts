import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';
import { wishlistService } from '../services/wishlist.service';
import { AuthRequest } from '../types';

export const wishlistController = {
  async getWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await wishlistService.getWishlist(userId, req.query as Record<string, string>);
      sendPaginated(res, result.data, result.total, result.page, result.limit);
    } catch (error) {
      next(error);
    }
  },

  async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await wishlistService.toggle(userId, req.params.productId);
      sendSuccess(res, result, result.wishlisted ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      await wishlistService.remove(userId, req.params.productId);
      sendSuccess(res, null, 'Removed from wishlist');
    } catch (error) {
      next(error);
    }
  },

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await wishlistService.check(userId, req.params.productId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
