import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    dueDate: { type: Date },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['todo', 'in-progress', 'review', 'completed'], default: 'todo' },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    labels: [{ type: String }],
    comments: [commentSchema],
    position: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

taskSchema.index({ projectId: 1, status: 1 });

export type ITask = InferSchemaType<typeof taskSchema>;
export type TaskDocument = HydratedDocument<ITask>;

const Task = model<ITask>('Task', taskSchema);
export default Task;
