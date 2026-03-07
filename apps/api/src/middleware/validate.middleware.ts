import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/apiResponse';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((e: ZodError['errors'][number]) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      sendError(res, `Validation failed: ${errors.map((e) => `${e.field} - ${e.message}`).join('; ')}`, 422);
      return;
    }
    req.body = result.data;
    next();
  };
}
