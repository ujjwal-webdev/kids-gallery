import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    phone: string;
    role: string;
  };
  rawBody?: Buffer;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface ProductQuery extends PaginationQuery {
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  featured?: string;
}
