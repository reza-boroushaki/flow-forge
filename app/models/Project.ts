import { ProjectInterface } from "@/common.types";
import { Schema, model, models } from "mongoose";

export const projectSchema = new Schema<ProjectInterface>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  liveSiteUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Project =
  models?.Project || model<ProjectInterface>("Project", projectSchema);

export default Project;
