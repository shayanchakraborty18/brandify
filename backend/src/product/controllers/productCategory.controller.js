import { ErrorHandler } from "../../../utils/errorHandler.js";
import { addNewCategoryRepo, deleteCategoryRepo, getAllCategoriesRepo, getCategoryDetailsRepo, getProductsByCategoryIdRepo, getProductsByCategorySlugRepo, getTotalCountsOfCategoryRepo, updateCategoryRepo } from "../model/category.repository.js";
import cloudinary from "../../../config/cloudinary.js";
import fs from "fs";

export const addNewCategory = async (req, res, next) => {
  try {
    let insertData;
    if(!req.file || req.file.length === 0) {
      insertData = req.body;
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, { 
        folder: "category", 
      });
      // Remove temp file
      fs.unlinkSync(req.file.path);
      const fileInfo = {
        public_id:result.public_id,
        url: result.secure_url
      };
      insertData = {...req.body, image: fileInfo};
    }

    const newCategory = await addNewCategoryRepo(insertData);

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    let updatedData;
    if(!req.file || req.file.length === 0) {
      updatedData = req.body;
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, { 
        folder: "category", 
      });
      // Remove temp file
      fs.unlinkSync(req.file.path);
      const fileInfo = {
        public_id:result.public_id,
        url: result.secure_url
      };
      updatedData = {...req.body, image: fileInfo};
    }

    const updatedCategory = await updateCategoryRepo(req.params.id, updatedData);

    if (!updatedCategory) {
      return next(new ErrorHandler(404, "Category not found"));
    }

    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await deleteCategoryRepo(req.params.id);
    if (deletedCategory) {
      res.status(200).json({ success: true, deletedCategory });
    } else {
      return next(new ErrorHandler(404, "Category not found"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const getAllCategories = async (req, res, next) => {
  try {
    const { query, limit = 10, page = 1 } = req;
    const categories = await getAllCategoriesRepo(query, limit, page);
    
    res.status(200).json({ success: true, categories });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const getCategoryDetails = async (req, res, next) => {
  try {
    const category = await getCategoryDetailsRepo(req.params.id);
    if (!category) {
      return next(new ErrorHandler(404, "Category not found"));
    }
    
    res.status(200).json({ success: true, category });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const getTotalCountsOfCategory = async (req, res, next) => {
  try {
    const totalCount = await getTotalCountsOfCategoryRepo();
    res.status(200).json({ success: true, totalCount });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const getProductByCategorySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const products = await getProductsByCategorySlugRepo(slug, 10, 1);
    
    if (!products || products.length === 0) {
      return next(new ErrorHandler(404, "No products found for this category"));
    }
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}

export const getProductByCategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await getProductsByCategoryIdRepo({ _id: id }, 10, 1);
    
    if (!products || products.length === 0) {
      return next(new ErrorHandler(404, "No products found for this category"));
    }
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
}