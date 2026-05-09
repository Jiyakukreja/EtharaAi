import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    avatarUrl: { type: String, default: '' },
    team: { type: String, default: 'Core Team' },
    status: { type: String, enum: ['online', 'away', 'offline'], default: 'offline' },
    lastActiveAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<IUser>;

const User = model<IUser>('User', userSchema);
export default User;
