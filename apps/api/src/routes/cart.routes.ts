import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const cartRoutes = Router();

cartRoutes.get('/', authMiddleware, cartController.getCart);
cartRoutes.post('/items', authMiddleware, cartController.addItem);
cartRoutes.put('/items/:itemId', authMiddleware, cartController.updateItem);
cartRoutes.delete('/items/:itemId', authMiddleware, cartController.removeItem);
cartRoutes.delete('/clear', authMiddleware, cartController.clearCart);

