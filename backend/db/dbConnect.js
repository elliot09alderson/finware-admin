import mongoose from "mongoose";

export const DbConnect = async () => {
  return await mongoose.connect(process.env.MONGO_URI, { dbName: "Test" });
};
