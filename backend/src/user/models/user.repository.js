import UserModel from "./user.schema.js";
import path from "path";
import cloudinary from "../../../config/cloudinary.js";
import fs from "fs";

export const createNewUserRepo = async (user) => {
	return await new UserModel(user).save();
};

export const findUserRepo = async (factor, withPassword = false) => {
	if (withPassword) return await UserModel.findOne(factor).select("+password");
	else return await UserModel.findOne(factor);
};

export const findUserForPasswordResetRepo = async (hashtoken) => {
	return await UserModel.findOne({
		resetPasswordToken: hashtoken,
		resetPasswordExpire: { $gt: Date.now() },
	});
};

export const updateUserProfileRepo = async (_id, data) => {
	let publicId,publicUrl;
	const {name, email, file} = data;

	// if (!file) {
	// 	const user = await UserModel.findById(_id);
	// 	publicId = user.profileImg.public_id;
	// 	publicUrl = user.profileImg.url;
	// } else {
	// 	publicUrl = `static/uploads/user/${file.filename}`;
	// 	publicId = path.parse(file.filename).name;
	// }

	if (!file) {
		const user = await UserModel.findById(_id);
		publicId = user.profileImg.public_id;
		publicUrl = user.profileImg.url;
	}
	else {
		const result = await cloudinary.uploader.upload(file.path, { 
			folder: "user"
		});
		// Remove temp file
		fs.unlinkSync(file.path);
		publicId = result.public_id;
		publicUrl = result.secure_url;
	}

	const update_data = {
		name: name,
		email: email,
		profileImg: {
			public_id: publicId,
			url: publicUrl,
		}
	}
	return await UserModel.findOneAndUpdate(_id, update_data, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
};

export const getAllUsersRepo = async () => {
	return UserModel.find({});
};

export const deleteUserRepo = async (_id) => {
	return await UserModel.findByIdAndDelete(_id);
};

export const updateUserRoleAndProfileRepo = async (_id, data) => {
	// Write your code here for updating the roles of other users by admin
	return await UserModel.findByIdAndUpdate(_id, data, {new:true, runValidators: true})
};