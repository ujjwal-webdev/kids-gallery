import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/apiError';
import { AuthRequest } from '../types';
import { USER_ROLES } from '../utils/constants';

const ADMIN_ROLES = [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.STAFF];

export function adminMiddleware(req: Request, res: Response, next: NextFunction): void {
  const user = (req as AuthRequest).user;

  if (!user) {
    return next(new UnauthorizedError('Authentication required'));
  }

  if (!ADMIN_ROLES.includes(user.role as (typeof ADMIN_ROLES)[number])) {
    return next(new ForbiddenError('Insufficient permissions'));
  }

  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthRequest).user;

    if (!user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!roles.includes(user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
}
