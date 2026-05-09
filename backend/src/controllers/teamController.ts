import type { Request, Response } from 'express';
import User from '../models/User.js';
import Activity from '../models/Activity.js';

export async function getTeam(req: Request, res: Response) {
  const team = await User.find().select('name email role avatarUrl status team lastActiveAt').sort({ lastActiveAt: -1 });
  res.json({ team });
}

export async function inviteMember(req: Request, res: Response) {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role ?? 'member',
    team: req.body.team ?? 'Core Team'
  });
  await Activity.create({
    type: 'member-invited',
    message: `${user.name} joined the team`,
    userId: user._id
  });
  res.status(201).json({ user });
}

export async function getActivityFeed(_req: Request, res: Response) {
  const activities = await Activity.find().populate('userId', 'name avatarUrl role').sort({ createdAt: -1 }).limit(25);
  res.json({ activities });
}
