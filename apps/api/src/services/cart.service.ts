import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement cart service methods
export const cartService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).cart.findMany({ skip, take: limit }),
      (prisma as any).cart.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).cart.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Cart not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).cart.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).cart.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).cart.delete({ where: { id } });
  },
};
