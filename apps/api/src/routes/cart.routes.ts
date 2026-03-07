import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const cartRoutes = Router();

// TODO: Implement cart getAll
cartRoutes.get('/', authMiddleware, cartController.getAll);

// TODO: Implement cart create
cartRoutes.post('/items', authMiddleware, cartController.create);

// TODO: Implement cart update
cartRoutes.put('/items/:id', authMiddleware, cartController.update);

// TODO: Implement cart delete
cartRoutes.delete('/items/:id', authMiddleware, cartController.delete);
