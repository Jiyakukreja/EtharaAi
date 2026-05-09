import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { UserDocument } from '../models/User.js';

export function signToken(user: Pick<UserDocument, '_id' | 'role' | 'email'>) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}
