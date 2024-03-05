import User from "../models/User";
import { connectDB } from "./connect";

export const getUser = async (email: string) => {
  try {
    connectDB();
    return await User.find({ email });
  } catch (error) {
    console.log("Error getUser: ", error);
  }
};

export const createUser = async (
  email: string,
  name: string,
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
