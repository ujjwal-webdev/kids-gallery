import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement product service methods
export const productService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).product.findMany({ skip, take: limit }),
      (prisma as any).product.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).product.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Product not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).product.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).product.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).product.delete({ where: { id } });
  },
};
