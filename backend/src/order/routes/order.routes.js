import express from "express";
import {
	createNewOrder,
	getAllOrders,
	getMyAllOrders,
	getSingleOrder,
	updateOrder
} from "../controllers/order.controller.js";
import { auth, authByUserRole } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);

//get
router.route("/:id").get(auth, getSingleOrder);
router.route("/my/orders").get(auth, getMyAllOrders);

//Admin
router.route("/orders/placed").get(auth, authByUserRole("admin"), getAllOrders);

//put admin
router.route("/update/:id").put(auth, authByUserRole("admin"), updateOrder);

export default router;