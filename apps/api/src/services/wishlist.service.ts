import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

export const wishlistService = {
  async getWishlist(userId: string, query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);

    const [data, total] = await Promise.all([
      prisma.wishlistItem.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          product: {
            include: {
              images: { where: { isPrimary: true }, take: 1 },
              category: { select: { id: true, name: true, slug: true } },
            },
          },
        },
      }),
      prisma.wishlistItem.count({ where: { userId } }),
    ]);

    return { data, total, page, limit };
  },

  async toggle(userId: string, productId: string) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundError('Product not found');

    const existing = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return { wishlisted: false };
    }

    await prisma.wishlistItem.create({ data: { userId, productId } });
    return { wishlisted: true };
  },

  async remove(userId: string, productId: string) {
    const item = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (!item) throw new NotFoundError('Item not in wishlist');
    await prisma.wishlistItem.delete({ where: { id: item.id } });
  },

  async check(userId: string, productId: string) {
    const item = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    return { wishlisted: !!item };
  },
};
