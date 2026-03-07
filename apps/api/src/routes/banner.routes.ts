import { Router } from 'express';
import { bannerController } from '../controllers/banner.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

export const bannerRoutes = Router();

bannerRoutes.get('/', bannerController.getActiveBanners);
bannerRoutes.get('/all', authMiddleware, adminMiddleware, bannerController.getAllBanners);
bannerRoutes.post('/', authMiddleware, adminMiddleware, bannerController.createBanner);
bannerRoutes.put('/:id', authMiddleware, adminMiddleware, bannerController.updateBanner);
bannerRoutes.delete('/:id', authMiddleware, adminMiddleware, bannerController.deleteBanner);

