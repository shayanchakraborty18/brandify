import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
  },
  categorySlug: {
    type: String,
    required: [true, "Category slug is required"],
    unique: true,
    trim: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: [true, "Category description is required"],
    minLength: [
      10,
      "Category description should be at least 10 characters long",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
