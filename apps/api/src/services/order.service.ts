import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement order service methods
export const orderService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).order.findMany({ skip, take: limit }),
      (prisma as any).order.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).order.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Order not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).order.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).order.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).order.delete({ where: { id } });
  },
};
