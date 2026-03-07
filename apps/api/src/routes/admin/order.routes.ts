import { Router, Request, Response, NextFunction } from 'express';
import { orderController } from '../../controllers/order.controller';
import { prisma } from '../../config/database';
import { sendSuccess } from '../../utils/apiResponse';
import { NotFoundError } from '../../utils/apiError';

export const adminOrderRoutes = Router();

adminOrderRoutes.get('/', orderController.getAllOrders);
adminOrderRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: true,
        address: true,
        payment: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
        user: { select: { id: true, name: true, phone: true } },
      },
    });
    if (!order) throw new NotFoundError('Order not found');
    sendSuccess(res, order);
  } catch (error) {
    next(error);
  }
});
adminOrderRoutes.put('/:id/status', orderController.updateOrderStatus);

