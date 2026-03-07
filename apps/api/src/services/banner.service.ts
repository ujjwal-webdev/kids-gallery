import { Platform } from '@prisma/client';
import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';

export const bannerService = {
  async getActiveBanners(platform?: string) {
    const now = new Date();
    return prisma.banner.findMany({
      where: {
        isActive: true,
        OR: [
          { platform: Platform.ALL },
          ...(platform ? [{ platform: platform as Platform }] : []),
        ],
        AND: [
          { OR: [{ startDate: null }, { startDate: { lte: now } }] },
          { OR: [{ endDate: null }, { endDate: { gte: now } }] },
        ],
      },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async getAllBanners() {
    return prisma.banner.findMany({ orderBy: { sortOrder: 'asc' } });
  },

  async getBannerById(id: string) {
    const banner = await prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundError('Banner not found');
    return banner;
  },

  async createBanner(data: Record<string, unknown>) {
    return prisma.banner.create({ data: data as Parameters<typeof prisma.banner.create>[0]['data'] });
  },

  async updateBanner(id: string, data: Record<string, unknown>) {
    const banner = await prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundError('Banner not found');
    return prisma.banner.update({
      where: { id },
      data: data as Parameters<typeof prisma.banner.update>[0]['data'],
    });
  },

  async deleteBanner(id: string) {
    const banner = await prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundError('Banner not found');
    return prisma.banner.delete({ where: { id } });
  },
};
