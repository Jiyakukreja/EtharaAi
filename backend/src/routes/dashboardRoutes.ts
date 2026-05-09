import { Router } from 'express';
import { getAnalytics, getDashboardMetrics } from '../controllers/dashboardController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/metrics', asyncHandler(getDashboardMetrics));
router.get('/analytics', asyncHandler(getAnalytics));

export default router;
