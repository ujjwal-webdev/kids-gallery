import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement banner service methods
export const bannerService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).banner.findMany({ skip, take: limit }),
      (prisma as any).banner.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).banner.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Banner not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).banner.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).banner.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).banner.delete({ where: { id } });
  },
};
