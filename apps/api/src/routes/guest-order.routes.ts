import { Router } from 'express';
import { guestOrderController } from '../controllers/guest-order.controller';
import { validate } from '../middleware/validate.middleware';
import { createGuestOrderSchema } from '../validators/guest-order.validator';

export const guestOrderRoutes = Router();

guestOrderRoutes.post('/', validate(createGuestOrderSchema), guestOrderController.createGuestOrder);
