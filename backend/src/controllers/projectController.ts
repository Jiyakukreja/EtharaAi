import type { Request, Response } from 'express';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Activity from '../models/Activity.js';
import { AppError } from '../utils/AppError.js';

export async function getProjects(req: Request, res: Response) {
  const projects = await Project.find().populate('members', 'name email avatarUrl status role').sort({ createdAt: -1 });
  res.json({ projects });
}

export async function getProject(req: Request, res: Response) {
  const project = await Project.findById(req.params.id)
    .populate('members', 'name email avatarUrl status role')
    .populate('createdBy', 'name email role avatarUrl');
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  const tasks = await Task.find({ projectId: project._id }).populate('assignedTo', 'name avatarUrl role').sort({ position: 1 });
  res.json({ project, tasks });
}

export async function createProject(req: Request, res: Response) {
  if (!req.user) throw new AppError('Not authorized', 401);
  const project = await Project.create({ ...req.body, createdBy: req.user._id, members: req.body.members ?? [] });
  await Activity.create({
    type: 'project-created',
    message: `${req.user.name} created project ${project.title}`,
    projectId: project._id,
    userId: req.user._id
  });
  res.status(201).json({ project });
}

export async function updateProject(req: Request, res: Response) {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) throw new AppError('Project not found', 404);
  res.json({ project });
}

export async function deleteProject(req: Request, res: Response) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new AppError('Project not found', 404);
  await Task.deleteMany({ projectId: project._id });
  res.json({ message: 'Project deleted' });
}

export async function addMembers(req: Request, res: Response) {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);
  const memberIds = Array.isArray(req.body.members) ? req.body.members : [];
  project.members = Array.from(new Set([...(project.members ?? []).map(String), ...memberIds.map(String)])) as any;
  await project.save();
  res.json({ project });
}
