import { Router } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

export const dashboardRoutes = Router();

// TODO: Implement admin Stats
dashboardRoutes.get('/', (req, res) => {
  sendSuccess(res, null, 'Admin Stats - TODO');
});

// TODO: Implement admin RecentOrders
dashboardRoutes.get('/recent-orders', (req, res) => {
  sendSuccess(res, null, 'Admin RecentOrders - TODO');
});

// TODO: Implement admin TopProducts
dashboardRoutes.get('/top-products', (req, res) => {
  sendSuccess(res, null, 'Admin TopProducts - TODO');
});
