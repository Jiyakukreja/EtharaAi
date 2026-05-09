import { Router } from 'express';
import { addMembers, createProject, deleteProject, getProject, getProjects, updateProject } from '../controllers/projectController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { projectSchema } from '../validators/projectValidators.js';

const router = Router();

router.use(protect);
router.get('/', asyncHandler(getProjects));
router.get('/:id', asyncHandler(getProject));
router.post('/', authorize('admin'), validateBody(projectSchema), asyncHandler(createProject));
router.patch('/:id', authorize('admin'), asyncHandler(updateProject));
router.delete('/:id', authorize('admin'), asyncHandler(deleteProject));
router.post('/:id/members', authorize('admin'), asyncHandler(addMembers));

export default router;
