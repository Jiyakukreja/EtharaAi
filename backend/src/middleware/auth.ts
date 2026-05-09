import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import User from '../models/User.js';

export async function protect(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : req.cookies?.token;

  if (!token) {
    return next(new AppError('Not authorized', 401));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;
    const user = await User.findById(payload.sub);
    if (!user) {
      return next(new AppError('User not found', 401));
    }
    req.user = user;
    return next();
  } catch {
    return next(new AppError('Invalid token', 401));
  }
}

export function authorize(...roles: Array<'admin' | 'member'>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }
    return next();
  };
}
