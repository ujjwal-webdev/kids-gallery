import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { ValidationError } from '../utils/apiError';
import { generateOrderNumber } from '../utils/helpers';
import { CreateGuestOrderInput } from '../validators/guest-order.validator';

const DEFAULT_DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 499;

export const guestOrderService = {
  async createGuestOrder(data: CreateGuestOrderInput) {
    const { name, phone, email, address, items, paymentMethod, deliveryNotes } = data;

    // 1. Find-or-create user by phone
    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          email,
          name,
          role: 'CUSTOMER',
        },
      });
    }

    // 2. Create address
    const shippingAddress = await prisma.address.create({
      data: {
        userId: user.id,
        name,
        phone,
        addressLine1: address.line1,
        addressLine2: address.line2,
        city: address.city,
        state: address.state,
        pinCode: address.pincode,
        isDefault: true,
        type: 'HOME',
      },
    });

    // 3. Validate products and compute totals
    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
      include: { images: { where: { isPrimary: true }, take: 1 } },
    });

    if (products.length !== productIds.length) {
      const found = new Set(products.map((p) => p.id));
      const missing = productIds.filter((id) => !found.has(id));
      throw new ValidationError(`Products not found or inactive: ${missing.join(', ')}`);
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    // Check stock
    for (const item of items) {
      const product = productMap.get(item.productId)!;
      if (product.trackInventory && product.stock < item.quantity) {
        throw new ValidationError(`Insufficient stock for "${product.name}". Available: ${product.stock}`);
      }
    }

    // Compute amounts
    let subtotal = new Prisma.Decimal(0);
    let taxAmount = new Prisma.Decimal(0);

    for (const item of items) {
      const product = productMap.get(item.productId)!;
      const lineTotal = new Prisma.Decimal(product.sellingPrice).mul(item.quantity);
      subtotal = subtotal.add(lineTotal);
      const gst = lineTotal.mul(product.gstRate).div(100);
      taxAmount = taxAmount.add(gst);
    }

    // Delivery charge
    const deliveryCharge = subtotal.gte(FREE_DELIVERY_THRESHOLD)
      ? new Prisma.Decimal(0)
      : new Prisma.Decimal(DEFAULT_DELIVERY_CHARGE);

    const totalAmount = subtotal.add(deliveryCharge).add(taxAmount);
    const orderNumber = generateOrderNumber();

    // 4. Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          addressId: shippingAddress.id,
          subtotal,
          deliveryCharge,
          taxAmount,
          discount: 0,
          totalAmount,
          paymentMethod: paymentMethod as 'COD',
          deliveryNotes,
          items: {
            create: items.map((item) => {
              const product = productMap.get(item.productId)!;
              const lineTotal = new Prisma.Decimal(product.sellingPrice).mul(item.quantity);
              const gstAmount = lineTotal.mul(product.gstRate).div(100);
              return {
                productId: product.id,
                productName: product.name,
                productImage: product.images?.[0]?.url || null,
                quantity: item.quantity,
                unitPrice: product.sellingPrice,
                totalPrice: lineTotal,
                gstRate: product.gstRate,
                gstAmount,
              };
            }),
          },
          statusHistory: {
            create: { status: 'PENDING', note: 'Guest order placed' },
          },
        },
        include: { items: true, address: true },
      });

      // Decrement stock
      for (const item of items) {
        const product = productMap.get(item.productId)!;
        if (product.trackInventory) {
          const updated = await tx.product.updateMany({
            where: { id: item.productId, stock: { gte: item.quantity } },
            data: { stock: { decrement: item.quantity } },
          });
          if (updated.count === 0) {
            throw new ValidationError(`Insufficient stock for "${product.name}"`);
          }
        }
      }

      // Create payment record
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          amount: totalAmount,
          status: 'COD_PENDING',
        },
      });

      return newOrder;
    });

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      itemCount: order.items.length,
      estimatedDelivery: '3-5 business days',
    };
  },
};
