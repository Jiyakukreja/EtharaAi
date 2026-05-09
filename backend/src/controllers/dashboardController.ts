import type { Request, Response } from 'express';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import Activity from '../models/Activity.js';

export async function getDashboardMetrics(_req: Request, res: Response) {
  const [totalTasks, completedTasks, pendingTasks, overdueTasks, totalProjects] = await Promise.all([
    Task.countDocuments(),
    Task.countDocuments({ status: 'completed' }),
    Task.countDocuments({ status: { $in: ['todo', 'in-progress', 'review'] } }),
    Task.countDocuments({ dueDate: { $lt: new Date() }, status: { $ne: 'completed' } }),
    Project.countDocuments()
  ]);

  const activities = await Activity.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'name avatarUrl role');
  const projects = await Project.find().sort({ createdAt: -1 }).limit(4).populate('members', 'name avatarUrl role');

  const statusCounts = await Task.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  res.json({
    summary: { totalTasks, completedTasks, pendingTasks, overdueTasks, totalProjects },
    activity: activities,
    projects,
    statusCounts
  });
}

export async function getAnalytics(_req: Request, res: Response) {
  const weekly = await Task.aggregate([
    {
      $project: {
        week: { $isoWeek: '$createdAt' },
        status: 1,
        createdAt: 1
      }
    },
    {
      $group: {
        _id: '$week',
        created: { $sum: 1 },
        completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json({ weekly });
}
