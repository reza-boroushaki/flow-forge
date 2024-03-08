"use server";

import { FormState } from "@/common.types";
import User from "../models/User";
import { connectDB } from "./connect";
import Project from "../models/Project";

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
    // const imageUrl = await uploadImage(data.image);

    console.log("********CCreatorId", creatorId);

    await Project.create({
      ...data,
      image: "imageUrl.url",
      createdBy: creatorId,
    });

    // console.log("User updated with new project:", newProject);
  } catch (error) {
    console.log(error);
  }
};
