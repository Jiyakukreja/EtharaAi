import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    color: { type: String, default: '#22c55e' },
    deadline: { type: Date }
  },
  { timestamps: true }
);

export type IProject = InferSchemaType<typeof projectSchema>;
export type ProjectDocument = HydratedDocument<IProject>;

const Project = model<IProject>('Project', projectSchema);
export default Project;
