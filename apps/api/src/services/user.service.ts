import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement user service methods
export const userService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).user.findMany({ skip, take: limit }),
      (prisma as any).user.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).user.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('User not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).user.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).user.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).user.delete({ where: { id } });
  },
};
