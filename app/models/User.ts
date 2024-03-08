import { Schema, model, models } from "mongoose";
import { projectSchema } from "./Project";
import { UserProfile } from "@/common.types";

export const userSchema = new Schema<UserProfile>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        try {
          new URL(v);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: "Invalid URL format",
    },
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 1000,
  },
  githubUrl: {
    type: String,
    validate: {
      validator: function (v: string | null) {
        if (!v) return true; // If not provided, it's okay
        try {
          new URL(v);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: "Invalid URL format",
    },
  },
  linkedinUrl: {
    type: String,
    validate: {
      validator: function (v: string | null) {
        if (!v) return true; // If not provided, it's okay
        try {
          new URL(v);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: "Invalid URL format",
    },
  },
  // projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  projects: [projectSchema],
});

const User = models?.User || model<UserProfile>("User", userSchema);

export default User;
