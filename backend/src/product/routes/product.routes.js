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
import {uploadB} from "../../../middlewares/file-upload.middlware.js";

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

export default router;