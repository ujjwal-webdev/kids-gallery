import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? [{ emit: 'event', level: 'query' }, 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}

if (process.env.NODE_ENV === 'development') {
  (prisma as PrismaClient & { $on: Function }).$on('query', (e: { query: string; duration: number }) => {
    logger.debug(`Query: ${e.query} (${e.duration}ms)`);
  });
}
