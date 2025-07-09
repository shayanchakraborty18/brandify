// Please don't change the pre-written code
// Import the necessary modules here

import {
	createNewOrderRepo,
	getAllOrdersRepo,
	getMyAllOrdersRepo,
	getSingleOrderRepo,
	updateOrderRepo
} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
	// Write your code here for placing a new order
	try {
		const userId = req.user._id;
		const orderData = req.body;
		orderData.user = userId;
		orderData.paidAt = new Date().toISOString();
		const newOrder = await createNewOrderRepo(orderData);
		res.status(200).json({success: true, order: newOrder});
	} catch (error) {
		next(new ErrorHandler(400, error.message));
	}
};

export const getSingleOrder = async (req, res, next) => {
	try {
		const order = await getSingleOrderRepo(req.params.id, req.user._id);
		res.status(200).json({success: true, order});
	} catch (error) {
		next(new ErrorHandler(400, error.message));
	}
}

export const getMyAllOrders = async (req, res, next) => {
	try {
		const orders = await getMyAllOrdersRepo(req.user._id);
		res.status(200).json({success: true, orders});
	} catch (error) {
		next(new ErrorHandler(400, error.message));
	}
}

export const getAllOrders = async (req, res, next) => {
	try {
		const orders = await getAllOrdersRepo();
		res.status(200).json({success: true, orders});
	} catch (error) {
		next(new ErrorHandler(400, error.message));
	}
};

export const updateOrder = async (req, res, next) => {
	try {
		const { orderStatus } = req.body;
		const order = await updateOrderRepo(req.params.id, orderStatus);
		res.status(201).json({success: true, order: order});
	} catch (error) {
		next(new ErrorHandler(400, error.message));
	}
};