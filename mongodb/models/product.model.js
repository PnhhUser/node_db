import mongoose from "mongoose";
import { Category } from "./category.model.js";

const ProductSchema = mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    categoryId: {
      type: string,
      required: true,
    },
    category: [Category],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Products", ProductSchema);
