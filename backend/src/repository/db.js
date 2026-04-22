import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUrl =
      process.env.DB_URL || "mongodb://127.0.0.1:27017/ProductStoreDB";

    await mongoose.connect(dbUrl);

    console.log("DB Connection");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
