import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected!");
    return true;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://inwordsDB:0m4tJk3buMxPpRfR@in-words.l980mql.mongodb.net/flowforge?retryWrites=true&w=majority"
      //   { dbName: "flowforge" }
      //   "mongodb+srv://inwordsDB:0m4tJk3buMxPpRfR@in-words.l980mql.mongodb.net/flowforge"
    );

    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
