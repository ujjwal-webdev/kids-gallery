import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement notification service methods
export const notificationService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).notification.findMany({ skip, take: limit }),
      (prisma as any).notification.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).notification.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Notification not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).notification.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).notification.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).notification.delete({ where: { id } });
  },
};
