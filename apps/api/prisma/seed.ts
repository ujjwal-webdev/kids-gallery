import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // === CATEGORIES ===
  console.log('Creating categories...');

  const stationery = await prisma.category.upsert({
    where: { slug: 'stationery' },
    update: {},
    create: {
      name: 'Stationery',
      slug: 'stationery',
      description: 'Notebooks, pens, pencils, and all stationery essentials',
      sortOrder: 1,
    },
  });

  const giftKids = await prisma.category.upsert({
    where: { slug: 'gift-items-kids' },
    update: {},
    create: {
      name: 'Gift Items (Kids)',
      slug: 'gift-items-kids',
      description: 'Fun and thoughtful gifts for children',
      sortOrder: 2,
    },
  });

  const giftAdults = await prisma.category.upsert({
    where: { slug: 'gift-items-adults' },
    update: {},
    create: {
      name: 'Gift Items (Adults)',
      slug: 'gift-items-adults',
      description: 'Elegant and thoughtful gifts for adults',
      sortOrder: 3,
    },
  });

  const partySupplies = await prisma.category.upsert({
    where: { slug: 'party-supplies' },
    update: {},
    create: {
      name: 'Party Supplies',
      slug: 'party-supplies',
      description: 'Everything you need for a perfect party',
      sortOrder: 4,
    },
  });

  const schoolEssentials = await prisma.category.upsert({
    where: { slug: 'school-essentials' },
    update: {},
    create: {
      name: 'School Essentials',
      slug: 'school-essentials',
      description: 'School bags, lunch boxes, water bottles and more',
      sortOrder: 5,
    },
  });

  const artCraft = await prisma.category.upsert({
    where: { slug: 'art-craft' },
    update: {},
    create: {
      name: 'Art & Craft',
      slug: 'art-craft',
      description: 'Colours, brushes, clay, and craft supplies',
      sortOrder: 6,
    },
  });

  const occasionGifts = await prisma.category.upsert({
    where: { slug: 'occasion-gifts' },
    update: {},
    create: {
      name: 'Occasion Gifts',
      slug: 'occasion-gifts',
      description: 'Birthday, anniversary, and festive gifts',
      sortOrder: 7,
    },
  });

  // Subcategories
  await prisma.category.upsert({
    where: { slug: 'notebooks-diaries' },
    update: {},
    create: {
      name: 'Notebooks & Diaries',
      slug: 'notebooks-diaries',
      parentId: stationery.id,
      sortOrder: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'pens-pencils' },
    update: {},
    create: {
      name: 'Pens & Pencils',
      slug: 'pens-pencils',
      parentId: stationery.id,
      sortOrder: 2,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'toys-games' },
    update: {},
    create: {
      name: 'Toys & Games',
      slug: 'toys-games',
      parentId: giftKids.id,
      sortOrder: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'birthday-decorations' },
    update: {},
    create: {
      name: 'Birthday Decorations',
      slug: 'birthday-decorations',
      parentId: partySupplies.id,
      sortOrder: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'school-bags' },
    update: {},
    create: {
      name: 'School Bags',
      slug: 'school-bags',
      parentId: schoolEssentials.id,
      sortOrder: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'colours-paints' },
    update: {},
    create: {
      name: 'Colours & Paints',
      slug: 'colours-paints',
      parentId: artCraft.id,
      sortOrder: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'birthday-gifts' },
    update: {},
    create: {
      name: 'Birthday Gifts',
      slug: 'birthday-gifts',
      parentId: occasionGifts.id,
      sortOrder: 1,
    },
  });

  // === PRODUCTS ===
  console.log('Creating products...');

  const products = [
    {
      name: 'Premium A5 Ruled Notebook',
      slug: 'premium-a5-ruled-notebook',
      shortDesc: 'High-quality ruled notebook for students and professionals',
      mrp: 150,
      sellingPrice: 99,
      stock: 100,
      categoryId: stationery.id,
      brand: "Kid's Gallery",
      tags: ['notebook', 'stationery', 'ruled'],
      isFeatured: true,
      hsnCode: '4820',
      gstRate: 12,
    },
    {
      name: 'Camel Colour Set - 12 Shades',
      slug: 'camel-colour-set-12-shades',
      shortDesc: 'Vibrant water colours perfect for kids and artists',
      mrp: 250,
      sellingPrice: 199,
      stock: 75,
      categoryId: artCraft.id,
      brand: 'Camel',
      tags: ['colours', 'art', 'kids'],
      isFeatured: true,
      hsnCode: '3213',
      gstRate: 12,
    },
    {
      name: 'Birthday Balloon Decoration Kit',
      slug: 'birthday-balloon-decoration-kit',
      shortDesc: 'Complete birthday decoration kit with 50 balloons and accessories',
      mrp: 499,
      sellingPrice: 349,
      stock: 50,
      categoryId: partySupplies.id,
      brand: "Kid's Gallery",
      tags: ['birthday', 'decoration', 'balloons', 'party'],
      isFeatured: true,
      hsnCode: '9505',
      gstRate: 12,
    },
    {
      name: 'Ergonomic School Bag - Blue',
      slug: 'ergonomic-school-bag-blue',
      shortDesc: 'Lightweight ergonomic backpack ideal for school children',
      mrp: 1299,
      sellingPrice: 899,
      stock: 30,
      categoryId: schoolEssentials.id,
      brand: 'SkoolStar',
      tags: ['bag', 'school', 'backpack'],
      isFeatured: true,
      hsnCode: '4202',
      gstRate: 18,
    },
    {
      name: 'Unicorn Gift Hamper for Kids',
      slug: 'unicorn-gift-hamper-kids',
      shortDesc: 'Magical unicorn-themed gift set including stationery and accessories',
      mrp: 799,
      sellingPrice: 599,
      stock: 25,
      categoryId: giftKids.id,
      brand: "Kid's Gallery",
      tags: ['unicorn', 'gift', 'kids', 'hamper'],
      isFeatured: true,
      hsnCode: '9503',
      gstRate: 12,
    },
    {
      name: 'Gel Pen Set - 10 Colours',
      slug: 'gel-pen-set-10-colours',
      shortDesc: 'Smooth-writing gel pens in 10 vibrant colours',
      mrp: 199,
      sellingPrice: 149,
      stock: 150,
      categoryId: stationery.id,
      brand: 'Classmate',
      tags: ['pen', 'gel', 'stationery', 'writing'],
      hsnCode: '9608',
      gstRate: 12,
    },
    {
      name: 'Festive Gift Box - Premium',
      slug: 'festive-gift-box-premium',
      shortDesc: 'Beautifully curated festive gift box for Diwali and other occasions',
      mrp: 1499,
      sellingPrice: 1199,
      stock: 20,
      categoryId: occasionGifts.id,
      brand: "Kid's Gallery",
      tags: ['festive', 'diwali', 'gift', 'premium'],
      isFeatured: true,
      hsnCode: '4819',
      gstRate: 12,
    },
    {
      name: 'Clay Modelling Set',
      slug: 'clay-modelling-set',
      shortDesc: '12-colour non-toxic clay set for creative play',
      mrp: 299,
      sellingPrice: 229,
      stock: 60,
      categoryId: artCraft.id,
      brand: 'Fevicryl',
      tags: ['clay', 'craft', 'kids', 'art'],
      hsnCode: '3407',
      gstRate: 18,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        mrp: product.mrp,
        sellingPrice: product.sellingPrice,
        gstRate: product.gstRate,
      },
    });
  }

  // === BANNERS ===
  console.log('Creating banners...');

  await prisma.banner.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Back to School Sale',
        imageUrl: 'https://placehold.co/1200x400/FF6B9D/white?text=Back+to+School+Sale',
        linkType: 'category',
        linkValue: 'school-essentials',
        isActive: true,
        sortOrder: 1,
        platform: 'ALL',
      },
      {
        title: 'New Art & Craft Collection',
        imageUrl: 'https://placehold.co/1200x400/4ECDC4/white?text=Art+%26+Craft+Collection',
        linkType: 'category',
        linkValue: 'art-craft',
        isActive: true,
        sortOrder: 2,
        platform: 'ALL',
      },
      {
        title: 'Birthday Party Special Offers',
        imageUrl: 'https://placehold.co/1200x400/FFE66D/black?text=Birthday+Party+Specials',
        linkType: 'category',
        linkValue: 'party-supplies',
        isActive: true,
        sortOrder: 3,
        platform: 'WEB',
      },
    ],
  });

  // === DELIVERY ZONES ===
  console.log('Creating delivery zones...');

  const deliveryZones = [
    { pinCode: '400001', city: 'Mumbai', state: 'Maharashtra', deliveryCharge: 49, estimatedDays: 2 },
    { pinCode: '110001', city: 'New Delhi', state: 'Delhi', deliveryCharge: 49, estimatedDays: 3 },
    { pinCode: '560001', city: 'Bengaluru', state: 'Karnataka', deliveryCharge: 49, estimatedDays: 3 },
    { pinCode: '600001', city: 'Chennai', state: 'Tamil Nadu', deliveryCharge: 49, estimatedDays: 3 },
    { pinCode: '700001', city: 'Kolkata', state: 'West Bengal', deliveryCharge: 49, estimatedDays: 4 },
    { pinCode: '500001', city: 'Hyderabad', state: 'Telangana', deliveryCharge: 49, estimatedDays: 3 },
    { pinCode: '380001', city: 'Ahmedabad', state: 'Gujarat', deliveryCharge: 49, estimatedDays: 3 },
    { pinCode: '411001', city: 'Pune', state: 'Maharashtra', deliveryCharge: 49, estimatedDays: 2 },
    { pinCode: '302001', city: 'Jaipur', state: 'Rajasthan', deliveryCharge: 59, estimatedDays: 4 },
    { pinCode: '226001', city: 'Lucknow', state: 'Uttar Pradesh', deliveryCharge: 59, estimatedDays: 4 },
  ];

  for (const zone of deliveryZones) {
    await prisma.deliveryZone.upsert({
      where: { pinCode: zone.pinCode },
      update: {},
      create: zone,
    });
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
