import { Schema, model, models } from "mongoose";

interface UserDoc {
  name: string;
  email: string;
  avatarUrl: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  projects?: Schema.Types.ObjectId[];
}

const userSchema = new Schema<UserDoc>({
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
      validator: function (v: string | undefined) {
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
      validator: function (v: string | undefined) {
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
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

const User = models.User || model<UserDoc>("User", userSchema);

export default User;
