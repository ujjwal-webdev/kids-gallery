import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const orderRoutes = Router();

orderRoutes.get('/', authMiddleware, orderController.getOrders);
orderRoutes.get('/:id', authMiddleware, orderController.getOrderById);
orderRoutes.post('/', authMiddleware, orderController.createOrder);
orderRoutes.put('/:id/cancel', authMiddleware, orderController.cancelOrder);
