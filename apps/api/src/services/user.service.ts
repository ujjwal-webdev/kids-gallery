import { prisma } from '../config/database';
import { NotFoundError, ForbiddenError } from '../utils/apiError';

export const userService = {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: { orderBy: { isDefault: 'desc' } } },
    });
    if (!user) throw new NotFoundError('User not found');
    return user;
  },

  async updateProfile(userId: string, data: { name?: string; email?: string; avatar?: string }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User not found');
    return prisma.user.update({ where: { id: userId }, data });
  },

  async getAddresses(userId: string) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });
  },

  async addAddress(userId: string, data: Record<string, unknown>) {
    const isDefault = data.isDefault as boolean | undefined;
    if (isDefault) {
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return prisma.address.create({ data: { ...data, userId } as Parameters<typeof prisma.address.create>[0]['data'] });
  },

  async updateAddress(userId: string, addressId: string, data: Record<string, unknown>) {
    const address = await prisma.address.findUnique({ where: { id: addressId } });
    if (!address) throw new NotFoundError('Address not found');
    if (address.userId !== userId) throw new ForbiddenError('Not your address');
    if (data.isDefault) {
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return prisma.address.update({
      where: { id: addressId },
      data: data as Parameters<typeof prisma.address.update>[0]['data'],
    });
  },

  async deleteAddress(userId: string, addressId: string) {
    const address = await prisma.address.findUnique({ where: { id: addressId } });
    if (!address) throw new NotFoundError('Address not found');
    if (address.userId !== userId) throw new ForbiddenError('Not your address');
    return prisma.address.delete({ where: { id: addressId } });
  },

  async setDefaultAddress(userId: string, addressId: string) {
    const address = await prisma.address.findUnique({ where: { id: addressId } });
    if (!address) throw new NotFoundError('Address not found');
    if (address.userId !== userId) throw new ForbiddenError('Not your address');
    await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    return prisma.address.update({ where: { id: addressId }, data: { isDefault: true } });
  },
};
