"use server";

import { FormState } from "@/common.types";
import User from "../models/User";
import { connectDB } from "./connect";
import Project from "../models/Project";
import { isBase64DataURL } from "../constant";

export const getUser = async (email: string) => {
  try {
    connectDB();
    return await User.findOne({ email });
  } catch (error) {
    console.log("Error getUser: ", error);
  }
};

export const createUser = async (
  name: string,
  email: string,
  image: string
) => {
  try {
    connectDB();
    await User.create({
      email,
      name,
      avatarUrl: image,
    });
  } catch (error) {
    console.log("Error getUser: ", error);
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const createProject = async (data: FormState, creatorId: string) => {
  try {
    await connectDB();
    const imageUrl = await uploadImage(data.image);

    const project = await Project.create({
      ...data,
      image: imageUrl.url,
      createdBy: creatorId,
    });

    await User.findByIdAndUpdate(
      creatorId,
      {
        $push: {
          projects: project,
        },
      },
      { new: true, useFindAndModify: false }
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllProjects = async (category?: string) => {
  try {
    await connectDB();
    const cat = category ? { category } : {};
    return await Project.find(cat).populate("createdBy");
  } catch (error) {
    console.log(error);
  }
};

export const getProject = async (id: string) => {
  try {
    await connectDB();
    return await Project.findById(id).populate("createdBy").lean();
  } catch (error) {
    console.log(error);
  }
};

export const getUserProjects = async (id: string, last?: number) => {
  try {
    await connectDB();
    return await User.findById(id, { projects: { $slice: last } });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (projectId: string, userId: string) => {
  try {
    await connectDB();
    await User.findByIdAndUpdate(
      userId,
      { $pull: { projects: projectId } },
      { new: true }
    );
    await Project.findByIdAndDelete(projectId);
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = async (data: FormState, projectId: string) => {
  let updatedForm = { ...data };
  const isUploadingNewImage = isBase64DataURL(data.image);
  try {
    if (isUploadingNewImage) {
      const imageUrl = await uploadImage(data.image);
      if (imageUrl.url) {
        updatedForm = { ...updatedForm, image: imageUrl.url };
      }
    }

    await connectDB();
    await Project.updateOne({ _id: projectId }, updatedForm);
  } catch (error) {
    console.log("Update operation failed:", error);
  }
};
