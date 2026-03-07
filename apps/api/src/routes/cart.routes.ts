import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { addToCartSchema, updateCartItemSchema } from '../validators/cart.validator';

export const cartRoutes = Router();

cartRoutes.get('/', authMiddleware, cartController.getCart);
cartRoutes.post('/items', authMiddleware, validate(addToCartSchema), cartController.addItem);
cartRoutes.put('/items/:itemId', authMiddleware, validate(updateCartItemSchema), cartController.updateItem);
cartRoutes.delete('/items/:itemId', authMiddleware, cartController.removeItem);
cartRoutes.delete('/clear', authMiddleware, cartController.clearCart);

