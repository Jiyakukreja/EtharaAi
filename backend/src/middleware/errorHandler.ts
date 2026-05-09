import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError('Route not found', 404));
}

export function errorHandler(err: Error | AppError, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
}
