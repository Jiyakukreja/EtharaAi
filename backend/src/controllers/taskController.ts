import type { Request, Response } from 'express';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import Activity from '../models/Activity.js';
import { AppError } from '../utils/AppError.js';

export async function getTasks(req: Request, res: Response) {
  const filter: Record<string, unknown> = {};
  if (req.query.projectId) filter.projectId = req.query.projectId;
  if (req.query.status) filter.status = req.query.status;
  const tasks = await Task.find(filter).populate('assignedTo', 'name avatarUrl role').populate('projectId', 'title color');
  res.json({ tasks });
}

export async function createTask(req: Request, res: Response) {
  if (!req.user) throw new AppError('Not authorized', 401);
  const project = await Project.findById(req.body.projectId);
  if (!project) throw new AppError('Project not found', 404);
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  await Activity.create({
    type: 'task-created',
    message: `${req.user.name} created task ${task.title}`,
    projectId: project._id,
    taskId: task._id,
    userId: req.user._id
  });
  res.status(201).json({ task });
}

export async function updateTask(req: Request, res: Response) {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) throw new AppError('Task not found', 404);
  res.json({ task });
}

export async function deleteTask(req: Request, res: Response) {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw new AppError('Task not found', 404);
  res.json({ message: 'Task deleted' });
}

export async function updateTaskStatus(req: Request, res: Response) {
  const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!task) throw new AppError('Task not found', 404);
  res.json({ task });
}

export async function addComment(req: Request, res: Response) {
  if (!req.user) throw new AppError('Not authorized', 401);
  const task = await Task.findById(req.params.id);
  if (!task) throw new AppError('Task not found', 404);
  task.comments.push({ user: req.user._id, text: req.body.text, createdAt: new Date() } as any);
  await task.save();
  res.json({ task });
}
