import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
	// Write your code here for placing a new order
	try {
		return await OrderModel.create(data);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getSingleOrderRepo = async (orderId, userId) => {
	try {
		return await OrderModel.find({_id: orderId, user: userId})
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export const getMyAllOrdersRepo = async (userId) => {
	try {
		return await OrderModel.find({ user: userId} )
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export const getAllOrdersRepo = async () => {
	try {
		return await OrderModel.find({});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export const updateOrderRepo = async (orderId, orderStatus) => {
	try {
		const order = await OrderModel.findOne({_id: orderId});
		order.orderStatus = orderStatus;
		return await order.save();
	} catch (error) {
		console.log(error);
		throw error;
	}
}