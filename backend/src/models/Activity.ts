import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    message: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export type IActivity = InferSchemaType<typeof activitySchema>;
export type ActivityDocument = HydratedDocument<IActivity>;

const Activity = model<IActivity>('Activity', activitySchema);
export default Activity;
