import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { env } from './config/env.js';

export function createApp() {
  const app = express();
  const allowedOrigins = new Set(
    (process.env.FRONTEND_URLS ?? env.frontendUrl)
      .split(',')
      .map(origin => origin.trim())
      .filter(Boolean)
  );

  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }

        const isLocalhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
        const isAllowed = allowedOrigins.has(origin) || isLocalhostOrigin;

        if (isAllowed) {
          callback(null, true);
          return;
        }

        callback(new Error(`CORS blocked origin: ${origin}`));
      },
      credentials: true
    })
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(rateLimit({ windowMs: 60 * 1000, limit: 120 }));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/tasks', taskRoutes);
  app.use('/api/team', teamRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
