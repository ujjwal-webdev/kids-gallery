import { OrderStatus, PaymentMethod, Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { NotFoundError, ValidationError } from '../utils/apiError';
import { generateOrderNumber, parsePagination } from '../utils/helpers';

export const orderService = {
  async createOrder(
    userId: string,
    data: {
      addressId: string;
      paymentMethod: string;
      couponCode?: string;
      deliveryNotes?: string;
    },
  ) {
    const { addressId, paymentMethod, couponCode, deliveryNotes } = data;

    // Validate address belongs to user
    const address = await prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!address) throw new ValidationError('Invalid address');

    // Get cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
    });
    if (!cart || cart.items.length === 0) throw new ValidationError('Cart is empty');

    // Check delivery zone
    const zone = await prisma.deliveryZone.findUnique({ where: { pinCode: address.pinCode } });
    const deliveryCharge = zone?.isServiceable
      ? new Prisma.Decimal(zone.deliveryCharge)
      : new Prisma.Decimal(0);

    // Calculate subtotal & GST
    let subtotal = new Prisma.Decimal(0);
    let taxAmount = new Prisma.Decimal(0);
    for (const item of cart.items) {
      const lineTotal = new Prisma.Decimal(item.product.sellingPrice).mul(item.quantity);
      subtotal = subtotal.add(lineTotal);
      const gst = lineTotal.mul(item.product.gstRate).div(100);
      taxAmount = taxAmount.add(gst);
    }

    // Apply coupon
    let discount = new Prisma.Decimal(0);
    let couponId: string | undefined;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (!coupon || !coupon.isActive) throw new ValidationError('Invalid coupon');
      const now = new Date();
      if (now < coupon.validFrom || now > coupon.validUntil) throw new ValidationError('Coupon has expired');
      if (coupon.minOrderAmount && subtotal.lt(coupon.minOrderAmount)) {
        throw new ValidationError(`Minimum order amount is ₹${coupon.minOrderAmount}`);
      }
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        throw new ValidationError('Coupon usage limit reached');
      }
      const userUsage = await prisma.order.count({ where: { userId, couponId: coupon.id } });
      if (userUsage >= coupon.perUserLimit) throw new ValidationError('Coupon already used');

      if (coupon.type === 'PERCENTAGE') {
        discount = subtotal.mul(coupon.value).div(100);
        if (coupon.maxDiscount && discount.gt(coupon.maxDiscount)) discount = new Prisma.Decimal(coupon.maxDiscount);
      } else {
        discount = new Prisma.Decimal(coupon.value);
      }
      couponId = coupon.id;
    }

    const totalAmount = subtotal.add(deliveryCharge).add(taxAmount).sub(discount);
    const orderNumber = generateOrderNumber();

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId,
          subtotal,
          deliveryCharge,
          taxAmount,
          discount,
          totalAmount,
          paymentMethod: paymentMethod as PaymentMethod,
          couponId,
          couponCode,
          couponDiscount: discount.gt(0) ? discount : undefined,
          deliveryNotes,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              productName: item.product.name,
              variantName: item.variantId ?? undefined,
              quantity: item.quantity,
              unitPrice: item.product.sellingPrice,
              totalPrice: new Prisma.Decimal(item.product.sellingPrice).mul(item.quantity),
              gstRate: item.product.gstRate,
              gstAmount: new Prisma.Decimal(item.product.sellingPrice).mul(item.quantity).mul(item.product.gstRate).div(100),
            })),
          },
          statusHistory: {
            create: { status: 'PENDING' as OrderStatus, note: 'Order placed' },
          },
        },
        include: { items: true, address: true },
      });

      // Decrement stock
      for (const item of cart.items) {
        if (item.product.trackInventory) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      // Increment coupon usage
      if (couponId) {
        await tx.coupon.update({ where: { id: couponId }, data: { usedCount: { increment: 1 } } });
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      // Create payment record
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          amount: totalAmount,
          status: paymentMethod === 'COD' ? 'COD_PENDING' : 'PENDING',
        },
      });

      return newOrder;
    });

    return order;
  },

  async getOrders(userId: string, query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { take: 3, include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } } }, // preview only
        },
      }),
      prisma.order.count({ where: { userId } }),
    ]);
    return { data, total, page, limit };
  },

  async getOrderById(userId: string, orderId: string) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: { include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } } },
        address: true,
        payment: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!order) throw new NotFoundError('Order not found');
    return order;
  },

  async cancelOrder(userId: string, orderId: string) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: { include: { product: true } } },
    });
    if (!order) throw new NotFoundError('Order not found');
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      throw new ValidationError('Order cannot be cancelled at this stage');
    }

    return prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' },
      });
      await tx.orderStatusHistory.create({
        data: { orderId, status: 'CANCELLED', note: 'Cancelled by customer' },
      });
      // Restore stock
      for (const item of order.items) {
        if (item.product.trackInventory) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }
      return updated;
    });
  },

  async updateOrderStatus(orderId: string, status: string, note?: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundError('Order not found');
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus },
    });
    await prisma.orderStatusHistory.create({
      data: { orderId, status: status as OrderStatus, note },
    });
    return updated;
  },

  async getAllOrders(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    const { status, search } = query;

    const where: Prisma.OrderWhereInput = {};
    if (status) where.status = status as OrderStatus;
    if (search) where.orderNumber = { contains: search, mode: 'insensitive' };

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true, phone: true } }, items: true },
      }),
      prisma.order.count({ where }),
    ]);
    return { data, total, page, limit };
  },
};
