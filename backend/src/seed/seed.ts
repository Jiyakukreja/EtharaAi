import bcrypt from 'bcryptjs';
import { connectDatabase } from '../config/db.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Activity from '../models/Activity.js';

async function seed() {
  await connectDatabase();
  await Promise.all([User.deleteMany({}), Project.deleteMany({}), Task.deleteMany({}), Activity.deleteMany({})]);

  const password = await bcrypt.hash('Password123!', 12);
  const admin = await User.create({ name: 'Ava Carter', email: 'ava@ethara.ai', password, role: 'admin', status: 'online' });
  const member = await User.create({ name: 'Noah Lee', email: 'noah@ethara.ai', password, role: 'member', status: 'away' });

  const project = await Project.create({
    title: 'Ethara Launch OS',
    description: 'Core product launch project with brand, engineering, and growth milestones.',
    members: [admin._id, member._id],
    createdBy: admin._id,
    progress: 68,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
  });

  await Task.create([
    { title: 'Design hero section', projectId: project._id, createdBy: admin._id, assignedTo: member._id, priority: 'high', status: 'in-progress', labels: ['ui', 'landing'] },
    { title: 'Set up auth flow', projectId: project._id, createdBy: admin._id, assignedTo: admin._id, priority: 'urgent', status: 'todo', labels: ['backend', 'auth'] },
    { title: 'Ship analytics cards', projectId: project._id, createdBy: admin._id, assignedTo: member._id, priority: 'medium', status: 'review', labels: ['dashboard'] }
  ]);

  await Activity.create([
    { type: 'seed', message: 'Demo workspace created', userId: admin._id },
    { type: 'seed', message: 'Launch OS project started', userId: admin._id, projectId: project._id }
  ]);

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
