import { Prisma, NotificationType } from '@prisma/client';
import { prisma } from '../config/database';
import { NotFoundError, ForbiddenError } from '../utils/apiError';
import { parsePagination } from '../utils/helpers';

export const notificationService = {
  async createNotification(
    userId: string,
    title: string,
    body: string,
    type: string,
    data?: Record<string, unknown>,
  ) {
    return prisma.notification.create({
      data: {
        userId,
        title,
        body,
        type: type as NotificationType,
        data: data ? (data as Prisma.InputJsonValue) : undefined,
      },
    });
  },

  async getUserNotifications(userId: string, query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    const [data, total] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where: { userId } }),
    ]);
    return { data, total, page, limit };
  },

  async markAsRead(userId: string, notificationId: string) {
    const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
    if (!notification) throw new NotFoundError('Notification not found');
    if (notification.userId !== userId) throw new ForbiddenError('Not your notification');
    return prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } });
  },

  async markAllAsRead(userId: string) {
    await prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
  },

  async getUnreadCount(userId: string) {
    return prisma.notification.count({ where: { userId, isRead: false } });
  },
};
