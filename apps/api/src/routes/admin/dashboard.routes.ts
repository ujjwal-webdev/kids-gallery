import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { sendSuccess } from '../../utils/apiResponse';

export const dashboardRoutes = Router();

dashboardRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      totalOrders,
      totalProducts,
      totalCustomers,
      recentOrders,
      ordersByStatus,
      revenue,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true, phone: true } } },
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'PAID' },
      }),
    ]);

    // Fetch products with stock at or below their individual lowStockThreshold
    // Using $queryRaw is necessary here since Prisma cannot compare two columns in a where clause
    const lowStockProducts = await prisma.$queryRaw<
      Array<{ id: string; name: string; stock: number; lowStockThreshold: number }>
    >`
      SELECT id, name, stock, "lowStockThreshold"
      FROM "Product"
      WHERE "isActive" = true
        AND "trackInventory" = true
        AND stock <= "lowStockThreshold"
      ORDER BY stock ASC
      LIMIT 10
    `;

    sendSuccess(res, {
      totalOrders,
      totalProducts,
      totalCustomers,
      totalRevenue: revenue._sum.totalAmount ?? 0,
      recentOrders,
      lowStockProducts,
      ordersByStatus: ordersByStatus.map((s) => ({ status: s.status, count: s._count.id })),
    });
  } catch (error) {
    next(error);
  }
});


