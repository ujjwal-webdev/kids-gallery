import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { cartService } from '../services/cart.service';
import { AuthRequest } from '../types';

export const cartController = {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await cartService.getCart(userId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const { productId, quantity, variantId } = req.body;
      const result = await cartService.addItem(userId, productId, quantity ?? 1, variantId);
      sendSuccess(res, result, 'Item added to cart');
    } catch (error) {
      next(error);
    }
  },

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const { quantity } = req.body;
      const result = await cartService.updateItemQuantity(userId, req.params.itemId, quantity);
      sendSuccess(res, result, 'Cart updated');
    } catch (error) {
      next(error);
    }
  },

  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      const result = await cartService.removeItem(userId, req.params.itemId);
      sendSuccess(res, result, 'Item removed from cart');
    } catch (error) {
      next(error);
    }
  },

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).user!.id;
      await cartService.clearCart(userId);
      sendSuccess(res, null, 'Cart cleared');
    } catch (error) {
      next(error);
    }
  },
};
