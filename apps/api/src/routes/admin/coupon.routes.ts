import { Router } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

export const adminCouponRoutes = Router();

// TODO: Implement admin List
adminCouponRoutes.get('/', (req, res) => {
  sendSuccess(res, null, 'Admin List - TODO');
});

// TODO: Implement admin Create
adminCouponRoutes.post('/', (req, res) => {
  sendSuccess(res, null, 'Admin Create - TODO');
});

// TODO: Implement admin Update
adminCouponRoutes.put('/:id', (req, res) => {
  sendSuccess(res, null, 'Admin Update - TODO');
});

// TODO: Implement admin Delete
adminCouponRoutes.delete('/:id', (req, res) => {
  sendSuccess(res, null, 'Admin Delete - TODO');
});
