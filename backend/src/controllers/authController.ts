import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { signToken } from '../utils/jwt.js';

function sanitizeUser(user: any) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    team: user.team,
    status: user.status,
    lastActiveAt: user.lastActiveAt
  };
}

export async function signup(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('Email already in use', 409);
  }
  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, role });
  const token = signToken(user);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  res.status(201).json({ token, user: sanitizeUser(user) });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new AppError('Invalid credentials', 401);
  }
  user.lastActiveAt = new Date();
  await user.save();
  const token = signToken(user);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  res.json({ token, user: sanitizeUser(user) });
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError('Not authorized', 401);
  }
  res.json({ user: sanitizeUser(req.user) });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  res.json({ message: 'Logged out' });
}
