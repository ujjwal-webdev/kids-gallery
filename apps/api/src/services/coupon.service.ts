import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement coupon service methods
export const couponService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).coupon.findMany({ skip, take: limit }),
      (prisma as any).coupon.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).coupon.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Coupon not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).coupon.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).coupon.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).coupon.delete({ where: { id } });
  },
};
