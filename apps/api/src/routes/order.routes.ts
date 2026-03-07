import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const orderRoutes = Router();

// TODO: Implement order getAll
orderRoutes.get('/', authMiddleware, orderController.getAll);

// TODO: Implement order getById
orderRoutes.get('/:id', authMiddleware, orderController.getById);

// TODO: Implement order create
orderRoutes.post('/', authMiddleware, orderController.create);

// TODO: Implement order update
orderRoutes.put('/:id/cancel', authMiddleware, orderController.update);
