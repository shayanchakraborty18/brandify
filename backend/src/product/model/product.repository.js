import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
	return await new ProductModel(product).save();
};

export const getAllProductsRepo = async (query, limit, page) => {
	const total = await ProductModel.countDocuments(query);
	limit = limit || total;
	const totalPages = Math.ceil(total / limit);
	const skip = (page -  1) * limit;
	const data = await ProductModel.find(query).skip(skip).limit(limit);

	return {data, totalPages, currentPage: page};
};

export const updateProductRepo = async (_id, updatedData) => {
	return await ProductModel.findByIdAndUpdate(_id, updatedData, {
		new: true,
		runValidators: true,
		useFindAndModify: true,
	});
};

export const deleteProductRepo = async (_id) => {
	return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
	return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
	return await ProductModel.countDocuments();
};

export const findProductRepo = async (productId) => {
	return await ProductModel.findById(productId);
};