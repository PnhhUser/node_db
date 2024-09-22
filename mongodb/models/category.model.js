import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Categoies", CategorySchema);
