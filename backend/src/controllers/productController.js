import { cloudinary } from "../cloudinary/index.js";
import ProductModel from "../models/Product.js";

export const getAllProduct = async (req, res) => {
  const products = await ProductModel.find({}).sort({ updatedAt: -1 });

  res.json({ message: "Get All Product Successfully", data: products });
};

export const getProductDetail = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id).exec();

  res.json({ message: "Get Product Detail Successfully", data: product });
};

export const createProduct = async (req, res) => {
  const newProduct = new ProductModel(req.body);

  newProduct.image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  await newProduct.save();
  res.json({ message: "Create Product Successfully", data: newProduct });
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const oldProduct = await ProductModel.findById(id);

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    {
      ...req.body,
      image: { url: req.file.path, filename: req.file.filename },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  const oldImage = oldProduct.image;
  if (req.file && oldImage?.filename) {
    const imageCheck = await ProductModel.findOne({
      _id: { $ne: id },
      "image.filename": oldImage.filename,
    });

    if (!imageCheck) {
      await cloudinary.uploader.destroy(oldImage.filename);
    }
  }

  res.json({ message: "Update Product Successfully", data: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleteProduct = await ProductModel.findByIdAndDelete(id);
  res.json({ message: "Delete Product Successfully", data: deleteProduct });
};
