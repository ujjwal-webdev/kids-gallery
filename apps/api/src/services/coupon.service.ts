import { Prisma, CouponType } from '@prisma/client';
import { prisma } from '../config/database';
import { NotFoundError, ValidationError } from '../utils/apiError';

export const couponService = {
  async validateCoupon(code: string, cartTotal: number, userId: string) {
    const coupon = await prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.isActive) throw new ValidationError('Invalid or inactive coupon');

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) throw new ValidationError('Coupon has expired');
    if (coupon.minOrderAmount && new Prisma.Decimal(cartTotal).lt(coupon.minOrderAmount)) {
      throw new ValidationError(`Minimum order amount is ₹${coupon.minOrderAmount}`);
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new ValidationError('Coupon usage limit reached');
    }
    const userUsage = await prisma.order.count({ where: { userId, couponId: coupon.id } });
    if (userUsage >= coupon.perUserLimit) throw new ValidationError('Coupon usage limit per user reached');

    const discount = this.calculateDiscount(coupon, cartTotal);
    return { coupon, discount };
  },

  calculateDiscount(
    coupon: { type: CouponType; value: Prisma.Decimal; maxDiscount: Prisma.Decimal | null },
    cartTotal: number,
  ): number {
    if (coupon.type === CouponType.PERCENTAGE) {
      let d = (cartTotal * Number(coupon.value)) / 100;
      if (coupon.maxDiscount && d > Number(coupon.maxDiscount)) d = Number(coupon.maxDiscount);
      return Math.round(d * 100) / 100;
    }
    return Math.min(Number(coupon.value), cartTotal);
  },

  async getAllCoupons() {
    return prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  },

  async getCouponById(id: string) {
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundError('Coupon not found');
    return coupon;
  },

  async createCoupon(data: Record<string, unknown>) {
    return prisma.coupon.create({ data: data as Parameters<typeof prisma.coupon.create>[0]['data'] });
  },

  async updateCoupon(id: string, data: Record<string, unknown>) {
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundError('Coupon not found');
    return prisma.coupon.update({
      where: { id },
      data: data as Parameters<typeof prisma.coupon.update>[0]['data'],
    });
  },

  async deleteCoupon(id: string) {
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundError('Coupon not found');
    return prisma.coupon.update({ where: { id }, data: { isActive: false } });
  },
};
