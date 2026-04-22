import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: imageSchema,
  },
  { timestamps: true },
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
