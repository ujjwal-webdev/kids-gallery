import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement review service methods
export const reviewService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).review.findMany({ skip, take: limit }),
      (prisma as any).review.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).review.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Review not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).review.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).review.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).review.delete({ where: { id } });
  },
};
