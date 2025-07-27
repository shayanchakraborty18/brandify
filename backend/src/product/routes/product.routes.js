import express from "express";
import {
	addNewProduct,
	deleteProduct,
	deleteReview,
	getAllProducts,
	getAllReviewsOfAProduct,
	getProductDetails,
	rateProduct,
	updateProduct,
	getFeaturedProducts, getBestSellerProducts
} from "../controllers/product.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";
import {uploadB, uploadC} from "../../../middlewares/file-upload.middlware.js";
import { addNewCategory, deleteCategory, getAllCategories, getCategoryDetails, getProductByCategoryId, getProductByCategorySlug, updateCategory } from "../controllers/productCategory.controller.js";


const router = express.Router();

// GET Routes
router.route("/products").get(getAllProducts);
router.route("/details/:id").get(getProductDetails);
router.route("/reviews/:id").get(getAllReviewsOfAProduct);

router.route("/featured").get(getFeaturedProducts);
router.route("/best-seller").get(getBestSellerProducts);

// POST Routes
// admin-only
router.route("/add").post(auth, authByUserRole("admin"), uploadB.array('images', 5) ,addNewProduct);
router.route("/update/:id").put(auth, authByUserRole("admin"),uploadB.array('images', 5) ,updateProduct);

// DELETE ROUTE
// Admin only
router.route("/delete/:id").delete(auth, authByUserRole("admin"), deleteProduct);

// POST Routes User
router.route("/rate/:id").put(auth, rateProduct);

// DELETE Routes User
router.route("/review/delete").delete(auth, deleteReview);

// add Category Route - admin
router.route("/category/add").post(
	auth, authByUserRole("admin"), uploadC.single('image'), addNewCategory);

	// update Category Route - admin
router.route("/category/update/:id").put(
	auth, authByUserRole("admin"), uploadC.single('image'), updateCategory);

	// delete Category Route - admin
router.route("/category/delete/:id").delete(
	auth, authByUserRole("admin"), deleteCategory);

// Get all categories
router.route("/categories").get(getAllCategories);

router.route("/category/:id").get(getCategoryDetails);

//Get products by category slug
router.route("/category/slug/:slug").get(getProductByCategorySlug);

//Get products by category id
router.route("/category/catid/:id").get(getProductByCategoryId);

export default router;