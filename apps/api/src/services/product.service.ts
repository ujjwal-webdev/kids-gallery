import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { NotFoundError, ValidationError } from '../utils/apiError';
import { generateSlug, parsePagination } from '../utils/helpers';

export const productService = {
  async getAll(query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    const { category, search, minPrice, maxPrice, brand, isFeatured, isActive, sortBy } = query;

    const where: Prisma.ProductWhereInput = {
      isActive: isActive === 'false' ? false : true,
    };
    if (category) {
      where.category = { slug: category };
    }
    if (brand) where.brand = { contains: brand, mode: 'insensitive' };
    if (isFeatured === 'true') where.isFeatured = true;
    if (minPrice || maxPrice) {
      where.sellingPrice = {};
      if (minPrice) where.sellingPrice.gte = new Prisma.Decimal(minPrice);
      if (maxPrice) where.sellingPrice.lte = new Prisma.Decimal(maxPrice);
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sortBy === 'price_asc') orderBy = { sellingPrice: 'asc' };
    else if (sortBy === 'price_desc') orderBy = { sellingPrice: 'desc' };
    else if (sortBy === 'popular') orderBy = { reviews: { _count: 'desc' } };

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          images: { orderBy: { sortOrder: 'asc' } },
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);
    return { data, total, page, limit };
  },

  async getBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true } },
        category: true,
        reviews: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!product) throw new NotFoundError('Product not found');

    const avgRating =
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : 0;

    return { ...product, avgRating: Math.round(avgRating * 10) / 10 };
  },

  async getById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        category: true,
        reviews: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      },
    });
    if (!product) throw new NotFoundError('Product not found');
    return product;
  },

  async getFeatured() {
    return prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  },

  async getByCategory(categorySlug: string, query: Record<string, string>) {
    const { page, limit, skip } = parsePagination(query);
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) throw new NotFoundError('Category not found');

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where: { categoryId: category.id, isActive: true },
        skip,
        take: limit,
        include: { images: { orderBy: { sortOrder: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where: { categoryId: category.id, isActive: true } }),
    ]);
    return { data, total, page, limit };
  },

  async search(query: string, pagination: Record<string, string>) {
    const { page, limit, skip } = parsePagination(pagination);
    const where: Prisma.ProductWhereInput = {
      isActive: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ],
    };
    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { images: { where: { isPrimary: true }, take: 1 } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);
    return { data, total, page, limit };
  },

  async create(data: Record<string, unknown>) {
    const { name, categoryId, ...rest } = data as { name: string; categoryId: string; [key: string]: unknown };
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) throw new ValidationError('Category not found');
    const slug = generateSlug(name);
    return prisma.product.create({
      data: { name, categoryId, slug, ...rest } as unknown as Prisma.ProductCreateInput,
      include: { images: true, category: true },
    });
  },

  async update(id: string, data: Record<string, unknown>) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundError('Product not found');
    const updateData = { ...data } as Prisma.ProductUpdateInput;
    if (data.name && typeof data.name === 'string' && data.name !== product.name) {
      updateData.slug = generateSlug(data.name);
    }
    return prisma.product.update({
      where: { id },
      data: updateData,
      include: { images: true, category: true },
    });
  },

  async delete(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundError('Product not found');
    // Soft delete
    return prisma.product.update({ where: { id }, data: { isActive: false } });
  },
};
