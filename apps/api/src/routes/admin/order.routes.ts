import { Router } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

export const adminOrderRoutes = Router();

// TODO: Implement admin List
adminOrderRoutes.get('/', (req, res) => {
  sendSuccess(res, null, 'Admin List - TODO');
});

// TODO: Implement admin Get
adminOrderRoutes.get('/:id', (req, res) => {
  sendSuccess(res, null, 'Admin Get - TODO');
});

// TODO: Implement admin UpdateStatus
adminOrderRoutes.put('/:id/status', (req, res) => {
  sendSuccess(res, null, 'Admin UpdateStatus - TODO');
});
