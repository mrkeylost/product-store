import express from "express";
import multer from "multer";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  getProductDetail,
} from "../controllers/productController.js";
import handleAsync from "../utils/catchAsync.js";
import { storage } from "../cloudinary/index.js";

const upload = multer({ storage });

const router = express.Router();

router
  .route("/")
  .get(handleAsync(getAllProduct, "Get All Product"))
  .post(upload.single("image"), handleAsync(createProduct, "Create Product"));

router
  .route("/:id")
  .get(handleAsync(getProductDetail, "Get Product Detail"))
  .patch(upload.single("image"), handleAsync(editProduct, "Edit Product"))
  .delete(handleAsync(deleteProduct, "Delete Product"));

export default router;
