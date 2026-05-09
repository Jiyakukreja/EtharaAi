# Ethara AI Task Manager

A production-style full-stack Team Task Manager SaaS built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, ShadCN-inspired UI, Express, MongoDB, JWT auth, and role-based access control.

## Features

- Modern landing page and responsive dashboard experience
- Signup/login with persistent JWT sessions
- Admin/member role-based authorization
- Projects, tasks, team, analytics, and profile flows
- Kanban board, table view, and calendar view task management
- Dashboard analytics with Recharts
- Dark/light mode persistence
- Mobile-first responsive layouts
- Backend API architecture with validation and error handling
- Seed data and deployment-ready config

## Structure

- `frontend/` - Vite React app
- `backend/` - Express + MongoDB API

## Setup

1. Install dependencies at the repo root so workspaces are linked.
2. Copy `.env.example` to `.env` and update `MONGODB_URI` and `JWT_SECRET`.
3. Start MongoDB locally or point the backend at MongoDB Atlas.
4. Run `npm run dev` from the root to launch both apps.

## Local Accounts

Run the seed script in the backend workspace to create demo data.

- Admin: `ava@ethara.ai` / `Password123!`
- Member: `noah@ethara.ai` / `Password123!`

## API

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/projects`
- `GET /api/tasks`
- `GET /api/team`
- `GET /api/dashboard/metrics`
- `GET /api/dashboard/analytics`

## Deployment

- Frontend: Vercel, Netlify, or Railway static service
- Backend: Railway
- Database: MongoDB Atlas

### Railway Notes

- Set the backend root to `backend/`
- Add `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, and `NODE_ENV=production`
- Use `npm start` as the backend start command

## Notes

The app is structured to be extended into a real SaaS product. The frontend ships with polished UI patterns, reusable components, and mocked API wiring that can be connected to a live backend immediately.
