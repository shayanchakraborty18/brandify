import Category from "./category.schema.js";
import ProductModel from "./product.schema.js";

export const addNewCategoryRepo = async (category) => {
  return await new Category(category).save();
}

export const getAllCategoriesRepo = async (query, limit, page) => {
  const total = await Category.countDocuments(query);
  limit = limit || total;
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;
  const data = await Category.find(query).skip(skip).limit(limit);

  return { data, totalPages, currentPage: page };
}
export const getProductsByCategorySlugRepo = async (catslug, limit, page) => {
  const category = await Category.findOne({ categorySlug: catslug });
  const products = await ProductModel.find({ categories: category._id })
    .populate("categories")
    .skip((page - 1) * limit)
    .limit(limit);
  return products;
}

export const getProductsByCategoryIdRepo = async (catid, limit, page) => {
  const products = await ProductModel.find({ categories: catid })
    .populate("categories")
    .skip((page - 1) * limit)
    .limit(limit);
  return products;
}

export const updateCategoryRepo = async (_id, updatedData) => {
  return await Category.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
}

export const deleteCategoryRepo = async (_id) => {
  return await Category.findByIdAndDelete(_id);
}

export const getCategoryDetailsRepo = async (_id) => {
  return await Category.findById(_id);
}

export const getTotalCountsOfCategoryRepo = async () => {
  return await Category.countDocuments();
}