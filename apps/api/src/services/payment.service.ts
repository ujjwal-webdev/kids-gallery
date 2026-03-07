import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

// TODO: Implement payment service methods
export const paymentService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    // TODO: Add filters based on query params
    const [data, total] = await Promise.all([
      (prisma as any).payment.findMany({ skip, take: limit }),
      (prisma as any).payment.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await (prisma as any).payment.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundError('Payment not found');
    return item;
  },

  async create(data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).payment.create({ data });
  },

  async update(id: string, data: Record<string, unknown>) {
    // TODO: Add business logic
    return (prisma as any).payment.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return (prisma as any).payment.delete({ where: { id } });
  },
};
