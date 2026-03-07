import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createOrderSchema } from '../validators/order.validator';

export const orderRoutes = Router();

orderRoutes.post('/', authMiddleware, validate(createOrderSchema), orderController.createOrder);
orderRoutes.get('/', authMiddleware, orderController.getOrders);
orderRoutes.get('/:id', authMiddleware, orderController.getOrderById);
orderRoutes.put('/:id/cancel', authMiddleware, orderController.cancelOrder);

