import { prisma } from '../config/database';
import { NotFoundError, ValidationError } from '../utils/apiError';

export const deliveryService = {
  async checkServiceability(pinCode: string) {
    const zone = await prisma.deliveryZone.findUnique({ where: { pinCode } });
    if (!zone) {
      return { isServiceable: false, pinCode };
    }
    return {
      isServiceable: zone.isServiceable,
      pinCode: zone.pinCode,
      city: zone.city,
      state: zone.state,
      deliveryCharge: zone.deliveryCharge,
      estimatedDays: zone.estimatedDays,
      codAvailable: zone.codAvailable,
    };
  },

  async getAllZones() {
    return prisma.deliveryZone.findMany({ orderBy: { pinCode: 'asc' } });
  },

  async createZone(data: Record<string, unknown>) {
    const existing = await prisma.deliveryZone.findUnique({ where: { pinCode: data.pinCode as string } });
    if (existing) throw new ValidationError('Delivery zone for this PIN code already exists');
    return prisma.deliveryZone.create({ data: data as Parameters<typeof prisma.deliveryZone.create>[0]['data'] });
  },

  async updateZone(id: string, data: Record<string, unknown>) {
    const zone = await prisma.deliveryZone.findUnique({ where: { id } });
    if (!zone) throw new NotFoundError('Delivery zone not found');
    return prisma.deliveryZone.update({
      where: { id },
      data: data as Parameters<typeof prisma.deliveryZone.update>[0]['data'],
    });
  },

  async deleteZone(id: string) {
    const zone = await prisma.deliveryZone.findUnique({ where: { id } });
    if (!zone) throw new NotFoundError('Delivery zone not found');
    return prisma.deliveryZone.delete({ where: { id } });
  },
};
