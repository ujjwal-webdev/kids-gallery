import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { cartService } from '../services/cart.service';

export const cartController = {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const result = await cartService.getCart(userId);
      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const { productId, quantity, variantId } = req.body as {
        productId: string;
        quantity: number;
        variantId?: string;
      };
      const result = await cartService.addItem(userId, productId, quantity, variantId);
      sendSuccess(res, result, 'Item added to cart');
    } catch (error) {
      next(error);
    }
  },

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const { quantity } = req.body as { quantity: number };
      const result = await cartService.updateItemQuantity(userId, req.params.itemId, quantity);
      sendSuccess(res, result, 'Cart item updated');
    } catch (error) {
      next(error);
    }
  },

  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      const result = await cartService.removeItem(userId, req.params.itemId);
      sendSuccess(res, result, 'Item removed from cart');
    } catch (error) {
      next(error);
    }
  },

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user!.id;
      await cartService.clearCart(userId);
      sendSuccess(res, null, 'Cart cleared');
    } catch (error) {
      next(error);
    }
  },
};
