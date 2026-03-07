import { prisma } from '../config/database';
import { NotFoundError, ValidationError } from '../utils/apiError';

export const cartService = {
  async getCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
        },
      },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: { include: { images: { where: { isPrimary: true }, take: 1 } } },
            },
          },
        },
      });
    }
    const subtotal = cart.items.reduce(
      (sum: number, item) => sum + Number(item.product.sellingPrice) * item.quantity,
      0,
    );
    return { ...cart, subtotal, itemCount: cart.items.length };
  },

  async addItem(userId: string, productId: string, quantity: number, variantId?: string) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundError('Product not found');
    if (!product.isActive) throw new ValidationError('Product is not available');
    if (product.trackInventory && product.stock < quantity) {
      throw new ValidationError('Insufficient stock');
    }

    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // Use findFirst to handle nullable variantId in the composite unique index
    const existing = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId: variantId ?? null,
      },
    });

    if (existing) {
      const newQty = existing.quantity + quantity;
      if (product.trackInventory && product.stock < newQty) {
        throw new ValidationError('Insufficient stock');
      }
      await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: newQty } });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity, variantId: variantId ?? null },
      });
    }

    return this.getCart(userId);
  },

  async updateItemQuantity(userId: string, cartItemId: string, quantity: number) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundError('Cart not found');

    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item || item.cartId !== cart.id) throw new NotFoundError('Cart item not found');

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (product && product.trackInventory && product.stock < quantity) {
        throw new ValidationError('Insufficient stock');
      }
      await prisma.cartItem.update({ where: { id: cartItemId }, data: { quantity } });
    }

    return this.getCart(userId);
  },

  async removeItem(userId: string, cartItemId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundError('Cart not found');
    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!item || item.cartId !== cart.id) throw new NotFoundError('Cart item not found');
    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return this.getCart(userId);
  },

  async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return;
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  },
};
