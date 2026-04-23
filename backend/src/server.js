import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./repository/db.js";
import ProductRouter from "./routes/productRouter.js";
import AppError from "./utils/appError.js";
import multer from "multer";
import { storage } from "./cloudinary/index.js";

const PORT = process.env.PORT || 5001;
const app = express();
const upload = multer({ storage });

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env" });

  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", ProductRouter);

app.use("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;

  res.status(status).json({ message });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("Listening Port"));
  })
  .catch((e) => {
    console.error("DB Failed", e);
  });
