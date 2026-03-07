import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement category service methods
export const categoryService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).category.findMany({ skip, take: limit }),
      (prisma as any).category.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).category.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Category not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).category.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).category.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).category.delete({ where: { id } });
  },
};
