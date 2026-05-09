import { Router } from 'express';
import { getActivityFeed, getTeam, inviteMember } from '../controllers/teamController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/', asyncHandler(getTeam));
router.get('/activity', asyncHandler(getActivityFeed));
router.post('/invite', authorize('admin'), asyncHandler(inviteMember));

export default router;
