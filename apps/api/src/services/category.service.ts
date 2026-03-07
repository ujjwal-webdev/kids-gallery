import { prisma } from '../config/database';
import { NotFoundError } from '../utils/apiError';
import { generateSlug } from '../utils/helpers';

export const categoryService = {
  async getAll() {
    return prisma.category.findMany({
      where: { isActive: true, parentId: null },
      include: {
        children: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
        _count: { select: { products: { where: { isActive: true } } } },
      },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async getBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: { where: { isActive: true }, orderBy: { sortOrder: 'asc' } },
        products: {
          where: { isActive: true },
          include: { images: { where: { isPrimary: true }, take: 1 } },
          take: 20,
        },
      },
    });
    if (!category) throw new NotFoundError('Category not found');
    return category;
  },

  async getTree() {
    const all = await prisma.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { products: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    // Build tree
    type CategoryWithChildren = typeof all[0] & { children: typeof all };
    const map = new Map<string, CategoryWithChildren>();
    all.forEach((c) => map.set(c.id, { ...c, children: [] }));
    const roots: CategoryWithChildren[] = [];
    map.forEach((c) => {
      if (c.parentId && map.has(c.parentId)) {
        map.get(c.parentId)!.children.push(c);
      } else if (!c.parentId) {
        roots.push(c);
      }
    });
    return roots;
  },

  async getById(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundError('Category not found');
    return category;
  },

  async create(data: Record<string, unknown>) {
    const { name, ...rest } = data as { name: string; [key: string]: unknown };
    const slug = generateSlug(name);
    return prisma.category.create({ data: { name, slug, ...rest } as Parameters<typeof prisma.category.create>[0]['data'] });
  },

  async update(id: string, data: Record<string, unknown>) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundError('Category not found');
    const updateData = { ...data } as Parameters<typeof prisma.category.update>[0]['data'];
    if (data.name && typeof data.name === 'string' && data.name !== category.name) {
      (updateData as Record<string, unknown>).slug = generateSlug(data.name);
    }
    return prisma.category.update({ where: { id }, data: updateData });
  },

  async delete(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundError('Category not found');
    return prisma.category.update({ where: { id }, data: { isActive: false } });
  },
};
