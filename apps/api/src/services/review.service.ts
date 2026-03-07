import { Prisma, OrderStatus } from '@prisma/client';
import { prisma } from '../config/database';
import { NotFoundError, ValidationError, ForbiddenError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

export const reviewService = {
  async getProductReviews(productId: string, query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    const sortBy = query.sortBy;
    let orderBy: Prisma.ReviewOrderByWithRelationInput = { createdAt: 'desc' };
    if (sortBy === 'rating_asc') orderBy = { rating: 'asc' };
    else if (sortBy === 'rating_desc') orderBy = { rating: 'desc' };

    const [data, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId },
        skip,
        take: limit,
        orderBy,
        include: { user: { select: { id: true, name: true, avatar: true } } },
      }),
      prisma.review.count({ where: { productId } }),
    ]);
    return { data, total, page, limit };
  },

  async createReview(
    userId: string,
    productId: string,
    data: { rating: number; title?: string; comment?: string; images?: string[] },
  ) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundError('Product not found');

    const existing = await prisma.review.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    if (existing) throw new ValidationError('You have already reviewed this product');

    // Check verified purchase
    const purchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: { userId, status: OrderStatus.DELIVERED },
      },
    });

    return prisma.review.create({
      data: {
        userId,
        productId,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
        images: data.images ?? [],
        isVerified: !!purchased,
      },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  },

  async updateReview(
    userId: string,
    reviewId: string,
    data: { rating?: number; title?: string; comment?: string },
  ) {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundError('Review not found');
    if (review.userId !== userId) throw new ForbiddenError('Not your review');
    return prisma.review.update({ where: { id: reviewId }, data });
  },

  async deleteReview(userId: string, reviewId: string) {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundError('Review not found');
    if (review.userId !== userId) throw new ForbiddenError('Not your review');
    return prisma.review.delete({ where: { id: reviewId } });
  },

  async getReviewById(reviewId: string) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
    if (!review) throw new NotFoundError('Review not found');
    return review;
  },
};
