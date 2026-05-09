import { Router } from 'express';
import { addComment, createTask, deleteTask, getTasks, updateTask, updateTaskStatus } from '../controllers/taskController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { taskSchema, taskStatusSchema } from '../validators/taskValidators.js';

const router = Router();

router.use(protect);
router.get('/', asyncHandler(getTasks));
router.post('/', authorize('admin'), validateBody(taskSchema), asyncHandler(createTask));
router.patch('/:id', authorize('admin'), asyncHandler(updateTask));
router.delete('/:id', authorize('admin'), asyncHandler(deleteTask));
router.patch('/:id/status', validateBody(taskStatusSchema), asyncHandler(updateTaskStatus));
router.post('/:id/comments', asyncHandler(addComment));

export default router;
