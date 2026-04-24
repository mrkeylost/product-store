import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUrl =
      process.env.NODE_ENV === "production"
        ? process.env.DB_URL
        : "mongodb://127.0.0.1:27017/ProductStoreDB";

    await mongoose.connect(dbUrl);

    console.log("DB Connection");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
