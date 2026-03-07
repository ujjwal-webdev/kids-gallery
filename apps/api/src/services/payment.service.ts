import crypto from 'crypto';
import { Prisma, PaymentStatus, OrderStatus } from '@prisma/client';
import { prisma } from '../config/database';
import { config } from '../config';
import { ApiError, NotFoundError, ValidationError } from '../utils/apiError';
import { logger } from '../utils/logger';

export const paymentService = {
  async createRazorpayOrder(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    });
    if (!order) throw new NotFoundError('Order not found');

    // TODO (production): Use Razorpay SDK
    // const Razorpay = require('razorpay');
    // const instance = new Razorpay({ key_id: config.razorpay.keyId, key_secret: config.razorpay.keySecret });
    // const rpOrder = await instance.orders.create({ amount: Math.round(Number(order.totalAmount) * 100), currency: 'INR', receipt: order.orderNumber });

    if (!config.razorpay.keyId || !config.razorpay.keySecret) {
      // Dev mode: return mock Razorpay order
      const mockRazorpayOrderId = `order_mock_${Date.now()}`;
      await prisma.payment.update({
        where: { orderId },
        data: { razorpayOrderId: mockRazorpayOrderId },
      });
      return { razorpayOrderId: mockRazorpayOrderId, amount: order.totalAmount, currency: 'INR', keyId: 'mock_key' };
    }

    throw new ValidationError('Razorpay not configured');
  },

  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
  ) {
    if (!config.razorpay.keySecret) {
      if (config.nodeEnv === 'development') {
        logger.warn('Razorpay keySecret not configured — using dev mock verification');
        const payment = await prisma.payment.findFirst({ where: { razorpayOrderId } });
        if (!payment) throw new NotFoundError('Payment not found');
        await prisma.payment.update({
          where: { id: payment.id },
          data: { razorpayPaymentId, razorpaySignature, status: PaymentStatus.PAID },
        });
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { paymentStatus: PaymentStatus.PAID, status: OrderStatus.CONFIRMED },
        });
        return { success: true, paymentId: razorpayPaymentId };
      }
      throw new ApiError('Razorpay is not configured', 500);
    }

    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      throw new ValidationError('Invalid payment signature');
    }

    const payment = await prisma.payment.findFirst({ where: { razorpayOrderId } });
    if (!payment) throw new NotFoundError('Payment not found');

    await prisma.payment.update({
      where: { id: payment.id },
      data: { razorpayPaymentId, razorpaySignature, status: PaymentStatus.PAID },
    });
    await prisma.order.update({
      where: { id: payment.orderId },
      data: { paymentStatus: PaymentStatus.PAID, status: OrderStatus.CONFIRMED },
    });

    return { success: true, paymentId: razorpayPaymentId };
  },

  async handleWebhook(rawBody: Buffer | string, signature: string) {
    if (!config.razorpay.keySecret) {
      throw new ApiError('Razorpay is not configured', 500);
    }

    const bodyStr = Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(bodyStr)
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new ValidationError('Invalid webhook signature');
    }

    const payload = JSON.parse(bodyStr) as Record<string, unknown>;

    // Razorpay webhook payload shape: { event, payload: { payment: { entity: { id, ... } } } }
    const event = typeof payload.event === 'string' ? payload.event : '';
    const webhookPayload = payload.payload as Record<string, unknown> | undefined;
    const paymentData = webhookPayload?.payment as Record<string, unknown> | undefined;
    const paymentEntityData = paymentData?.entity as Record<string, unknown> | undefined;
    const razorpayPaymentId = typeof paymentEntityData?.id === 'string' ? paymentEntityData.id : undefined;
    const razorpayOrderId = typeof paymentEntityData?.order_id === 'string' ? paymentEntityData.order_id : undefined;

    if (event === 'payment.captured' && razorpayPaymentId && razorpayOrderId) {
      const payment = await prisma.payment.findFirst({ where: { razorpayOrderId } });
      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.PAID, razorpayPaymentId },
        });
        await prisma.order.update({ where: { id: payment.orderId }, data: { paymentStatus: PaymentStatus.PAID, status: OrderStatus.CONFIRMED } });
      }
    } else if (event === 'payment.failed' && razorpayPaymentId && razorpayOrderId) {
      const payment = await prisma.payment.findFirst({ where: { razorpayOrderId } });
      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.FAILED, razorpayPaymentId },
        });
        await prisma.order.update({ where: { id: payment.orderId }, data: { paymentStatus: PaymentStatus.FAILED } });
      }
    }

    return { received: true };
  },

  async processRefund(orderId: string, amount?: number) {
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
    if (!order) throw new NotFoundError('Order not found');
    if (!order.payment) throw new ValidationError('No payment found for order');

    // TODO (production): Use Razorpay SDK to initiate refund
    // const refundAmount = amount ? amount * 100 : Math.round(Number(order.totalAmount) * 100);
    // const refund = await razorpay.payments.refund(order.payment.razorpayPaymentId, { amount: refundAmount });

    await prisma.payment.update({
      where: { id: order.payment.id },
      data: {
        status: PaymentStatus.REFUNDED,
        refundAmount: amount ? new Prisma.Decimal(amount) : order.totalAmount,
      },
    });
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: PaymentStatus.REFUNDED, status: OrderStatus.REFUNDED },
    });

    return { success: true };
  },
};
