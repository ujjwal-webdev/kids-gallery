import { Router } from 'express';
import { bannerController } from '../controllers/banner.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const bannerRoutes = Router();

// TODO: Implement banner getAll
bannerRoutes.get('/', bannerController.getAll);
